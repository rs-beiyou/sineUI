import './sass/sine.scss';
import 'core-js/fn/object/assign';
import 'core-js/fn/array/is-array';
import './components/sidebar/sidebar';
import './components/form/form';

import Sine from './components/sine';

window.sine = new Sine();
window.si = window.sine;