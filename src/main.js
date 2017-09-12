import './sass/sine.scss';
import Sine from './js/sine';
import {Sidebar,SidebarPlugin} from './js/sidebar';

import Util from './libs/util';

const plugins = [{
  name:'sidebar',
  plugin:SidebarPlugin,
  constructor:Sidebar
}]

Util.use($.fn,plugins);

window.sine = new Sine();
window.si = sine;
