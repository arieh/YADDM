/*
---
description: A Keyboard Accessible Drop-Down Menu Plugin for Mootools

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.3: [Class,Class.Extras, Element, Element.Event, Element.Style, Selectors]

provides: YADDM

...
*/
/*!
Copyright (c) 2009 Arieh Glazer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE 
*/
(function($,$empty,undef){

YADDM = new Class({
	Implements : [Options, Events]
	,options:{
		'className' : 'submenu', //a class-name to identify sub-menus
		openFunction : $empty, //a function to use for opening the menu
		closeFunction : $empty //a function to use for closing the menu
		,rtl : false
	}
	, menues:$empty
	, lastMenu : null
	, timeout : null
	, parents : []
	, current : -1
	/**
	 * a constructor
	 *   @param {Object} options an options array
	 */
	,initialize: function(options){
		this.setOptions(options);
	
		if (this.options.openFunction === $empty) this.options.openFunction = this.openMenu;
		if (this.options.closeFunction === $empty) this.options.closeFunction = this.closeMenu;
		
		this.menues = $$('.'+this.options.className);
		var fn = this.setEvents.bind(this);
		this.menues.each(fn);
	}
	/**
	 * sets the events on a given menu
	 *  @param {Element} menu a menu element
	 */
	,setEvents : function (menu){
		var $this = this
		  , parent = menu.getParent()
	      , onParent = false
		  , onMenu = false
		  , anchors = parent.getElements('a')
		  , hideFn = this.hideElement.bind(this)
		  , showFn = this.showElement.bind(this);
		
		this.parents.push(parent);
		
		if (!menu.hasClass('menu-opened')) hideFn(menu);
		else this.lastMenu = menu;
		/* --Mouse Events	*/
		
		parent.addEvent('mouseover',function(){
			if (menu.hasClass('menu-closed')){
				showFn(menu);
			}
			onParent = true;
		});
				  
		parent.addEvent('mouseout',function(evt){
			if (!menu.hasClass('menu-closed') && !onMenu){
				menu.getElements('menu-opened').each(function(m){hideFn(m);});
				hideFn(menu);
			} 
			onParent = false;
		});
				  
		menu.addEvent('mouseover',function(){
			onMenu = true;
		});     
			
		menu.addEvent('mouseout',(function(){
			onMenu = false;
		}));
		
		/* --Keyboard Events */
		
		/*
		 * Focus on first sub-menu element
		 */
		anchors[0].addEvent('focus',function(e){
			showFn(menu);
		});
		
		/*
		 * Tab on last menu element
		 */
		if (anchors.length>1) (function(){
			var shift = false
				, tab = false;
			
			anchors[anchors.length-1].addEvents({
				'keydown' : function(e){
					if (e.code == 9) tab = true;
					if (e.code == 16 || e.key == 'shift') shift = true;
					if (!shift && tab){
						hideFn(menu);
					}
				}
				,'keyup': function(e){
					if (e.code == 9) tab = false;
					if (e.code == 16 || e.key == 'shift') shift = false;
				}
			});
		})();
		
		/*
		 * Shift+Tab on first sub-menu element
		 */
		prev = parent.getPrevious();
		if (prev && prev.getElement('a')){
			prev.getElement('a').addEvent('focus',function(){
				hideFn(menu);
			});
		}else{
			(function(){
				var tab = false, shift = false;
				anchors[0].addEvent('keydown',function(e){
					if (e.code == 9) tab = true;
					if (e.code == 16 || e.key == 'shift') shift = true;
					if (tab && shift) hideFn(menu);
				});
				anchors[0].addEvent('keyup',function(e){
					if (e.code == 9) tab = false;
					if (e.code == 16 || e.key == 'shift') shift = false;
				});
			})();
		}
		
		document.addEvent('click',function(){
			hideFn(menu);
		});
		
		menu.addEvent('click',function(e){e.stopPropagation();});
		
		menu.addEvent('keyup',function(e){
			if (e.code == 39){
				if ($this.options.rtl) $this.prevParent();
				else $this.nextParent();
                e.stopPropagation();
			}else if (e.code == 37){
                if ($this.options.rtl) $this.nextParent();
                else $this.prevParent();
                e.stopPropagation();
			}
		});

		parent.getElement('a').addEvent('keyup',function(e){
			if (e.code == 39){
                if ($this.options.rtl) $this.prevParent($this.parents.indexOf(parent));
                else{
					$this.nextParent($this.parents.indexOf(parent));
				} 
                e.stopPropagation($this.parents.indexOf(parent));
            }else if (e.code == 37){
                
				if ($this.options.rtl) $this.nextParent($this.parents.indexOf(parent));
                else $this.prevParent($this.parents.indexOf(parent));
                e.stopPropagation();
            }
        });
	}
	/**
	 * hides an element
	 *	@param {Element} el an element to hide
	 */
	,hideElement : function(el){
		var hideFn = this.hideElement.bind(this);
		el.getElements('.'+this.options.className).each(hideFn);
		el.removeClass('menu-opened');
		el.addClass('menu-closed');
		this.options.closeFunction(el);
		this.fireEvent('close',el);
		if (this.current = this.menues.indexOf(el)) this.current = -1;
	}
	/**
	 * shows an element
	 *	@param {Element} el an element to show
	 */
	,showElement : function(el){
		var hideFn = this.hideElement.bind(this);
		
		if (this.lastMenu && this.lastMenu!=el){			
			hideFn(this.lastMenu);
			this.lastMenu = el;
		}else if (!this.lastMenu) this.lastMenu = el;
		
		el.removeClass('menu-closed');
		el.addClass('menu-opened');
		this.options.openFunction(el);
		this.fireEvent('open',el);
		this.current = this.menues.indexOf(el);
	}
	/**
	 * Default Opening effect
	 *	@param {Element} el an element to open
	 */
	,openMenu : function(el){}
	/**
	 * Default Closing effect
	 *	@param {Element} el an element to close
	 */
	,closeMenu : function(el){}
	,nextParent : function(cur){
		var $this = this
          , hideFn = this.hideElement.bind(this)
          , showFn = this.showElement.bind(this);
		  
	    if (cur >-1 && cur < this.menues.length){
			hideFn(this.menues[cur++]);
			showFn(this.menues[cur]);
			this.menues[cur].getElement('a').focus();
			this.current = cur;
		} 
	}
	,prevParent : function(cur){
        var $this = this
          , hideFn = this.hideElement.bind(this)
          , showFn = this.showElement.bind(this);
        if (cur <this.menues.length && cur > -1 ){
            hideFn(this.menues[cur--]);
            showFn(this.menues[cur]);
            this.menues[cur].getElement('a').focus();
			this.current = cur;
        } 
    }
});

})(document.id,Function.create());

/**
 * an accessor to menu genaration
 *	@param {String} className a class-name identfier for the sub-menus
 * @return {YADDM} a YADDM instance
 */
function setDropDownMenus(className){
	var name = (className == 'undefined') ? 'submenu' : className;
	return new YADDM({'className':name});
}