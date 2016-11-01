'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _MovieList = require('./blocks/MovieList/MovieList');

var _MovieList2 = _interopRequireDefault(_MovieList);

var _Movie = require('./blocks/Movie/Movie');

var _Movie2 = _interopRequireDefault(_Movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App(props) {
    return _react2.default.createElement(
        _reactRouter.Router,
        { history: _reactRouter.browserHistory },
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: _MovieList2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/movie/:id', component: _Movie2.default })
    );
}

document.addEventListener('DOMContentLoaded', function () {
    _reactDom2.default.render(_react2.default.createElement(App, null), document.querySelector('#app'));
});