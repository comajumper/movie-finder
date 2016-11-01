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

require('./MovieList.styl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Import child blocks
// import Movie from '../Movie/Movie';

// Import block styles


var MovieList = function (_React$Component) {
    _inherits(MovieList, _React$Component);

    function MovieList() {
        _classCallCheck(this, MovieList);

        var _this = _possibleConstructorReturn(this, (MovieList.__proto__ || Object.getPrototypeOf(MovieList)).call(this));

        _this.state = { data: [] };
        _this.getMovies = _this.getMovies.bind(_this);
        return _this;
    }

    _createClass(MovieList, [{
        key: 'getMovies',
        value: function getMovies() {
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
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getMovies();
        }
    }, {
        key: 'render',
        value: function render() {
            var data = this.state.data;

            if (data.length < 1) {
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

            var items = new Array();
            _lodash2.default.forEach(data, function (item, i) {
                items.push(_react2.default.createElement(
                    'div',
                    { key: i, className: 'Movie' },
                    _react2.default.createElement('div', { className: 'Movie__poster', style: { backgroundImage: 'url(' + item.movie.poster.image + ')' } })
                ));
            });

            return _react2.default.createElement(
                'div',
                { className: 'Page' },
                _react2.default.createElement(
                    'div',
                    { className: 'MovieList' },
                    items
                )
            );
        }
    }]);

    return MovieList;
}(_react2.default.Component);

exports.default = MovieList;