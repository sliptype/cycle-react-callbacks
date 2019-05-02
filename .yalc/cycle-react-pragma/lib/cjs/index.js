'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var react_1 = require('react');
var react_2 = require('@cycle/react');
function createIncorporatedElement(type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    if (!props || !props.sel) {
        return react_1.createElement.apply(
            void 0,
            [type, props].concat(children)
        );
    } else {
        return react_1.createElement.apply(
            void 0,
            [react_2.incorporate(type), props].concat(children)
        );
    }
}
exports.default = createIncorporatedElement;
//# sourceMappingURL=index.js.map
