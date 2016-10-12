import 'babel-polyfill';

import Path from 'path';
import http from 'http';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const server = http.Server(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/assets', express.static(Path.join(__dirname, '..', '..', 'build', 'assets')));

app.get('/*', (req, res) => res.sendFile(Path.join(__dirname, '../client/index.html')));

const port = 7357;

server.listen(port, () => {
    console.log('Server listening at port ' + port);
});