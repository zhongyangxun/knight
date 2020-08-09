import Menu from './menu';
import Submenu from './subMenu';
import MenuItem from './menuItem';
var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.Submenu = Submenu;
export default TransMenu;
