YADDM - Yet Another Drop-Down Menu
=============
YADDM stands for "Yet Another Drop-Down Menu". 
It supplies a keyboard accessible dropdown menu. With it, you can navigate the menus, either by mouse or by using the tab/shift+tab keys.

![Screenshot](http://img691.imageshack.us/img691/4562/screenshotsw.png)

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
