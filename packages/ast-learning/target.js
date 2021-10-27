"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _repeat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/repeat"));

require("@babel/polyfill");

var _context, _context2;

(0, _includes["default"])(_context = (0, _isArray["default"])(params)[1]).call(_context, 1);
''.charAt(1);
(0, _repeat["default"])(_context2 = '').call(_context2, 2);

var exampleFunc = function exampleFunc() {
  console.log(a(1, 2));
};

var exampleClass = function exampleClass(a, b) {
  (0, _classCallCheck2["default"])(this, exampleClass);
  this.a = a;
  this.b = b;
};

var asyncFunc = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return 1;

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee);
  }));

  return function asyncFunc() {
    return _ref.apply(this, arguments);
  };
}();
