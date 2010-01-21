Class: YADDM {#YADDM}
=======================
YADDM stands for "Yet Another Drop-Down Menu". 
It supplies a keyboard accessible dropdown menu. With it, you can navigate the menus, either by mouse or by using the tab/shift+tab keys.

![Screenshot](http://img691.imageshack.us/img691/4562/screenshotsw.png)

### Demo
[Demo @ gh-pages](http://arieh.github.com/YADDM/)

YADDM Method: constructor {#YADDM:constructor}
----------------------------------------------

### Syntax
	var menu = new YADDM([options]);

### Arguments
1. options (see options)

### Options
1. className (`string` default to `submenu`) : an alternative class-name to identify the submenus with
2. openFunction (`function`): an alternative function to use for opening effect. recieves one paramater- the menu to be opened
3. closeFunction (`function`): same as above but for close

YADDM Events {#YADDM:events}
-----------------------------
1. open : Fires when a menu is opened. Passes the opened menu.
2. close : Fires when a menu is closed. Passes the closed menu.

YADDM CSS Classes 
------------------
The class assigns 2 CSS classes to it's elements as means to identify them:
1. `menu-opened` : an opened menu
2. `menu-closed` : a closed menu

setDropDownMenus
-----------------
This is an alternative way to generate the menu.

### Syntax
	setDropDownMenus(className)

### Arguments
1. className (`string`) : a class name to identify subemenus with

### Returns 
YADDM instance