import './sass/sine.scss';
import 'core-js/fn/object/assign';
import 'core-js/fn/object/keys';
import 'core-js/fn/array/is-array';
import 'core-js/fn/array/includes';
import 'core-js/fn/array/find-index';
import 'core-js/fn/string/includes';
import './libs/define';
import './components/sidebar/sidebar';
import './components/form/form';
import './components/form/former';

import Sine from './components/sine';
import _ from './libs/util';

window.sine = new Sine();
window.si = window.sine;
window._si = _;