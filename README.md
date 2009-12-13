YADDM - Yet Another Drop-Down Menu
=============

This class enables a keyboard accessible dropdown menu
![Screenshot](http://github.com/arieh/YADDM/raw/master/screenshot.png)
How to use
----------
The class is very simple. you simply need to call it and it will generate a dropdown functionality on all marked 'UL's
it assumes each li has exactly one anchor in it. sub-menues are neted 'UL's with specified class (default to 'submenu').
You can either use the contructor:

	#JS
	var menu = new YADDM();
	
Or use the supplied function:
	
	#JS
	setDropDownMenus('alternative-classname');

Options
---------

  * className : an alternative class-name to identify the submenus with
