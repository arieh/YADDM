YADDM - Yet Another Drop-Down Menu
=============
YADDM stands for "Yet Another Drop-Down Menu". 
It supplies a keyboard accessible dropdown menu. With it, you can navigate the menus, either by mouse or by using the tab/shift+tab keys.

![Screenshot](http://img691.imageshack.us/img691/4562/screenshotsw.png)

Tested and found working on FF 3.5, IE6-8, Safari 4 (read notes) and Chrome 3

How to use
----------
The class is very simple. you simply need to call it and it will generate a dropdown functionality on all marked `UL`s
it assumes each li has exactly one anchor in it. sub-menues are neted `UL`s with specified class (default to `submenu`).
_NOTE: you can use whatever structure you would like, but you should note that the keyboard accessiblility assumes each menu item has an anchor in it. 
i haven't tested it, but a missing anchor might break the class_

You can either use the contructor:

	#JS
	var menu = new YADDM();
	
Or use the supplied function:
	
	#JS
	setDropDownMenus('alternative-classname');

Knows Issues
-------------
  * The library assumes standart keyboard support using Tag / Shift+Tab to navigate between anchors for it's keyboard support. This means 2 things: 1. If a browser has different shortcuts, they should work almost completetly. 2. if the browser does not have these the keyboard functionality will not work.
  * Using Shit+Tab on last Subemenu item will result in unfocused menu (behaviour changes between different browser
  * Safari requiers that you enable tab browsing through 'Prefrences' > 'Advanced' > 'Press Tab to highlight each item on a web page'
  * For browser with different shortcuts, there will be an issue if you try to unfocus a menu who's handle is the first anchor on the menu-bar using the Shift+Tab alternative.   

Options
---------

  * className : an alternative class-name to identify the submenus with
  * openFunction : an alternative function to use for opening effect. recieves one paramater- the menu to be opened
  * closeFunction : same as above but for close
  
Events
-------
  * `open` : fires when a menu was opened. passes the menu element
  * `close` : same as above but for close
  
CSS Classes
------------
the Class assigns 2 css classes to it's element:

  * `menu-opened` : an opened menu
  * `menu-closed` : a closed menu
