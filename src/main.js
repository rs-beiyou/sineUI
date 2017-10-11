import './sass/sine.scss';
import Sine from './js/sine';
import {Sidebar,SidebarPlugin} from './js/sidebar';
import {Textbox,TextboxPlugin} from './js/form/textbox';
import {Form,FormPlugin} from './js/form/form';
import './js/table';

import Util from './libs/util';

const plugins = [{
  name:'sidebar',
  plugin:SidebarPlugin,
  constructor:Sidebar
},{
  name:'form',
  plugin:FormPlugin,
  constructor:Form
}]

Util.use($,plugins);

window.sine = new Sine();
window.si = sine;
