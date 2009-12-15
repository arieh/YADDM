/*
---
description: A Keyboard Accessible Drop-Down Menu Plugin for Mootools

license: MIT-style

authors:
- Arieh Glazer

requires:
- core: 1.2.4/Class
- core: 1.2.4/Class.Extras
- core: 1.2.4/Element
- core: 1.2.4/Element.Event
- core: 1.2.4/Element.Style
- core: 1.2.4/Selectors

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
var YADDM = new Class({
	Implements : [Options, Events],
	options:{
		'className' : '.submenu', //a class-name to identify sub-menus
		openFunction : $empty, //a function to use for opening the menu
		closeFunction : $empty //a function to use for closing the menu
	},
	menues:$empty,
	/**
	 * a constructor
	 *   @param {Object} options an options array
	 */
	initialize: function(options){
		this.setOptions(options);
	
		if (this.options.openFunction === $empty) this.options.openFunction = this.openMenu;
		if (this.options.closeFunction === $empty) this.options.closeFunction = this.closeMenu;
		
		this.menues = $$(this.options.className);
		var fn = this.setEvents.bind(this);
		this.menues.each(fn);
	},
	/**
	 * sets the events on a given menu
	 *  @param {Element} menu a menu element
	 */
	setEvents : function (menu){
		var parent = menu.getParent(),
			onParent = false,
			onMenu = false,
			anchors = parent.getElements('a'),
			self = this,
			hideFn = this.hideElement.bind(this),
			showFn = this.showElement.bind(this),
			perv;
	
		hideFn(menu);
		
		/* --Mouse Events	*/
		
		parent.addEvent('mouseover',function(){
			if (menu.hasClass('menu-closed')){
				showFn(menu);
			}
			onParent = true;
		});
				  
		parent.addEvent('mouseout',function(){
			if (!menu.hasClass('menu-closed') && !onMenu){
				hideFn(menu);
			} 
			onParent = false;
		});
				  
		menu.addEvent('mouover',function(){
			onMenu = true;
		});     
			
		menu.addEvent('mouseout',(function(){
			onMenu = false; 
		}));
		
		/* --Keyboard Events */
		anchors[0].addEvent('focus',function(e){
			showFn(menu);
		})
		
		anchors[anchors.length-1].addEvent('blur',function(e){
			hideFn(menu);
		})
		
		prev = parent.getPrevious();
		if (prev){
			prev.getElement('a').addEvent('focus',function(){
				hideFn(menu);
			});
		}
	},
	/**
	 * hides an element
	 *	@param {Element} el an element to hide
	 */
	hideElement : function(el){
		el.removeClass('menu-opened');
		el.addClass('menu-closed');
		this.options.closeFunction(el);
		this.fireEvent('close',el);
	},
	/**
	 * shows an element
	 *	@param {Element} el an element to show
	 */
	showElement : function(el){
		el.removeClass('menu-closed');
		el.addClass('menu-opened');
		this.options.openFunction(el);
		this.fireEvent('open',el);
	},
	/**
	 * Default Opening effect
	 *	@param {Element} el an element to open
	 */
	openMenu : function(el){},
	/**
	 * Default Closing effect
	 *	@param {Element} el an element to close
	 */
	closeMenu : function(el){}
});

/**
 * an accessor to menu genaration
 *	@param {String} className a class-name identfier for the sub-menus
 * @return {YADDM} a YADDM instance
 */
function setDropDownMenus(className){
	var name = (className == 'undefined') ? 'submenu' : className;
	return new YADDM({'className':className});
}