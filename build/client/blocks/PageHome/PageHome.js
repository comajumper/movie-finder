'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ProjectList = require('../ProjectList/ProjectList');

var _ProjectList2 = _interopRequireDefault(_ProjectList);

require('./PageHome.styl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import child blocks


// Import block styles


var PageHome = function (_React$Component) {
    _inherits(PageHome, _React$Component);

    function PageHome() {
        _classCallCheck(this, PageHome);

        return _possibleConstructorReturn(this, (PageHome.__proto__ || Object.getPrototypeOf(PageHome)).apply(this, arguments));
    }

    _createClass(PageHome, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'PageHome' },
                _react2.default.createElement(
                    'section',
                    { className: 'Intro' },
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Designing things for people to enjoy'
                    )
                )
            );
        }
    }]);

    return PageHome;
}(_react2.default.Component);

exports.default = PageHome;