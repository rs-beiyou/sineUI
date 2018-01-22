import 'src/sass/sine.scss';
import 'src/utils/polyfill';
import 'src/components/component/tag';
import 'src/components/sidebar/sidebar';
import 'src/components/form/form';
import 'src/components/form/former';

import Sine from 'src/components/sine';
import _ from 'src/utils/util';

window.sine = new Sine();
window.si = window.sine;
window._si = _;