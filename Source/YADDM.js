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
	Implements : [Options],
	options:{
		'className' : '.submenu'
	},
	menues:$empty,
	initialize: function(options){
		
		this.setOptions(options);
		
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
			self = this;
			
		self.hideElement(menu,true);
			  
		parent.addEvent('mouseover',function(){
			if (self.hidden(menu)){
				self.show(menu,true);
				parent.getFirst().setStyle('height',listHeight - ( menu.getStyle('border').toInt()*2 ) );
			}
			onParent = true;
		});
				  
		parent.addEvent('mouseout',function(){
			if (!self.hidden(menu) && !onMenu){
				self.hideElement(menu,true);
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
			self.show(menu,true);
		})
		
		anchors[anchors.length-1].addEvent('blur',function(e){
			self.hideElement(menu,true);
		})
		
		parent.getPrevious().getElements('a').addEvent('focus',function(){
			self.hideElement(menu,true);
		});
	},
	hideElement : function(el,vis){
	    if (typeof vis == 'undefiend'){
			el.store('lastDisplay' , el.getStyle('display'));
	    	el.setStyle('display','none');	
		}else if (vis){
			el.setStyle('visibility','hidden');
		}
	},
	show : function(el,vis){
		if (typeof vis == 'undefiend'){
			var lastDisplay = el.retrieve('lastDisplay');
			if (typeof lastDisplay =='undefined') 
		        el.setStyle('display','block');
		    else el.setStyle('display',lastDisplay);	
		}else if (vis){
			el.setStyle('visibility','visible');
		}
	},
	hidden : function(el){
		return ((el.getStyle('display')=='none') || (el.getStyle('visibility')=='hidden'));
	}
});

function setDropDownMenus(className){
	return new YADDM({'className':className});
}