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

        var _this = _possibleConstructorReturn(this, (PageHome.__proto__ || Object.getPrototypeOf(PageHome)).call(this));

        _this.state = {
            data: []
        };
        // this.getMovies.bind(this)
        return _this;
    }

    _createClass(PageHome, [{
        key: 'getMovies',
        value: function getMovies() {
            // this.props
            // let that = this
            // reqwest({
            //     url: '/api/movies',
            //     method: 'GET',
            //     type: 'json',
            //     success: function (result) {
            //         that.setState({ data: result })
            //     }
            // });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var that = this;
            (0, _reqwest2.default)({
                url: '/api/movies',
                method: 'GET',
                type: 'json',
                success: function success(result) {
                    that.setState({ data: result });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.data.length < 1) {
                return _react2.default.createElement(
                    'div',
                    { className: 'Page' },
                    _react2.default.createElement(
                        'div',
                        { className: 'Loading' },
                        'Searching movies...'
                    )
                );
            }

            var movies = new Array();
            for (var i = 0; i < this.state.data.length; i++) {
                var background = { backgroundImage: 'url(' + this.state.data[i].movie.poster.image + ')' };
                movies.push(_react2.default.createElement(
                    'div',
                    { key: this.state.data[i].movie.id, className: 'Movie' },
                    _react2.default.createElement(
                        'a',
                        { href: '/movie/' + this.state.data[i].movie.id },
                        _react2.default.createElement('div', { className: 'Movie__poster', style: background })
                    )
                ));
            }

            return _react2.default.createElement(
                'div',
                { className: 'Page' },
                _react2.default.createElement(
                    'div',
                    { className: 'MovieList' },
                    movies
                )
            );
        }
    }]);

    return PageHome;
}(_react2.default.Component);

exports.default = PageHome;