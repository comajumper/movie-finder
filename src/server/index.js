import 'babel-polyfill';
import Path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import api from './routes/api';
import update from './routes/update';
// import reqwest from 'reqwest';

const app = express();
const server = http.Server(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/assets', express.static(Path.join(__dirname, '..', '..', 'build', 'assets')));
app.use('/api',api);
app.use('/update',update);

app.get('/*', (req, res) => res.sendFile(Path.join(__dirname, '../client/index.html')));

const port = 7357;

server.listen(port, () => {
    console.log('Server listening at port ' + port);
});
