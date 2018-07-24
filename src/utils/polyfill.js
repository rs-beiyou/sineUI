import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import 'core-js/fn/object/assign';
import 'core-js/fn/object/keys';
import 'core-js/fn/array/is-array';
import 'core-js/fn/array/includes';
import 'core-js/fn/array/find-index';
import 'core-js/fn/string/includes';
import 'core-js/fn/string/starts-with';

//ie不支持 Number.parseFloat
Number.parseFloat = parseFloat;
