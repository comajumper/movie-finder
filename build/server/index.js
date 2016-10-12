'use strict';

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use('/assets', _express2.default.static(_path2.default.join(__dirname, '..', '..', 'build', 'assets')));

app.get('/*', function (req, res) {
    return res.sendFile(_path2.default.join(__dirname, '../client/index.html'));
});

var port = 7357;

server.listen(port, function () {
    console.log('Server listening at port ' + port);
});