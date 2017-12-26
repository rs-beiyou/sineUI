import 'src/sass/sine.scss';
import 'core-js/es6/promise';
import 'core-js/fn/object/assign';
import 'core-js/fn/object/keys';
import 'core-js/fn/array/is-array';
import 'core-js/fn/array/includes';
import 'core-js/fn/array/find-index';
import 'core-js/fn/string/includes';
import 'core-js/fn/string/starts-with';
import 'src/utils/define';
import 'src/components/component/tag';
import 'src/components/sidebar/sidebar';
import 'src/components/form/form';
import 'src/components/form/former';

import Sine from 'src/components/sine';
import _ from 'src/utils/util';

window.sine = new Sine();
window.si = window.sine;
window._si = _;