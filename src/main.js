import 'src/sass/sine.scss';
import 'src/utils/polyfill';
import 'src/components/component/tag';
import 'src/components/sidebar';
import 'src/components/parser';
import 'src/components/form';
import 'src/components/former';
import 'src/components/modal';
import 'src/components/table';
import 'src/components/editor';
import 'src/components/fullscreen';
import 'src/components/component/componentLinker';
import './theme';

import Router from 'src/components/router';
import _ from 'src/utils/util';
import Sine from 'src/components/sine/index';

Sine.use(Router);

window.Sine = Sine;
window._sine = _;