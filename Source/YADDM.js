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
- core: 1.2.4/Element.Dimensions
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
		'className' : '.submenu',
		openFunction : $empty,
		closeFunction : $empty
	},
	menues:$empty,
	initialize: function(options){
		
		this.setOptions(options);
	
		if (this.options.openFunction === $empty) this.options.openFunction = this.openMenu;
		if (this.options.closeFunction === $empty) this.options.closeFunction = this.closeMenu;
		
		this.menues = $$(this.options.className);
		var fn = this.setEvents.bind(this);
		this.menues.each(fn);
	},
	setEvents : function (menu){
		var parent = menu.getParent(),
			height = menu.getSize().y,
			onParent = false,
			onMenu = false,
			listHeight = parent.getFirst().getSize().y,
			anchors = parent.getElements('a'),
			self = this,
			hideFn = this.hideElement.bind(this),
			showFn = this.show.bind(this);
	
		hideFn(menu);
			  
		parent.addEvent('mouseover',function(){
			if (self.hidden(menu)){
				showFn(menu);
				parent.getFirst().setStyle('height',listHeight - ( menu.getStyle('border').toInt()*2 ) );
			}
			onParent = true;
		});
				  
		parent.addEvent('mouseout',function(){
			if (!self.hidden(menu) && !onMenu){
				hideFn(menu);
				parent.getFirst().setStyle('height',listHeight+'px');
			} 
			onParent = false;
		});
				  
		menu.addEvent('mouover',function(){
			onMenu = true;
		});     
			
		menu.addEvent('mouseout',(function(){
			onMenu = false; 
		}));
			  
		anchors[0].addEvent('focus',function(e){
			showFn(menu);
		})
		
		anchors[anchors.length-1].addEvent('blur',function(e){
			hideFn(menu);
		})
		
		parent.getPrevious().getElements('a').addEvent('focus',function(){
			hideFn(menu);
		});
	},
	hideElement : function(el,vis){
		el.removeClass('menu-opened');
		el.addClass('menu-closed');
		this.options.closeFunction(el);
		this.fireEvent('close',el);
	},
	show : function(el,vis){
		el.removeClass('menu-closed');
		el.addClass('menu-opened');
		this.options.openFunction(el);
		this.fireEvent('open',el);
	},
	hidden : function(el){
		return ((el.getStyle('display')=='none') || (el.getStyle('visibility')=='hidden'));
	},
	openMenu : function(el){
		el.setStyle('visibility','visible');
	},
	closeMenu : function(el){
		el.setStyle('visibility','hidden');
	}
});

function setDropDownMenus(className){
	return new YADDM({'className':className});
}