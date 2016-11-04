import express from 'express';
import bodyParser from 'body-parser';
import rp from 'request-promise';
import fs from 'fs';
import _ from 'lodash';
let router = express.Router();

router.get('/movies', function (req, res) {
    fs.stat('db.json', function fsStat(err, stats) {
        if (err) {
            console.log('Updating database...');
            updateDB((db) => {
                console.log('Data base succesefully updated on ' + db.updatedOn);
                sendResults(db)
            });
        } else {
            fs.readFile('db.json', 'utf8', function (err, data) {
                //   let now = new Date();
                //   console.log(now - Date.parse(data.updatedOn));
                data = JSON.parse(data);
                sendResults(data);
            });
        }

        function sendResults (data) {
            let result = _.sortBy(data.movies, 'movie.imdb_rating');
            result = result.reverse();
            res.status(200).send(result);
        }

    });
});

function updateDB(next) {
    let now = new Date();

    getOriginalMoviesShowings(now, (data) => {
        let moviesIds = _.map(data, (item) => {
            return item.movie.id;
        });
        getData({
            uri: 'https://kudago.com/public-api/v1.3/movies/',
            json: true,
            qs: {
                page_size: '100',
                lang: 'en',
                ids: moviesIds.join(','),
                fields: 'id,title,original_title,body_text,genres,director,trailer,images,poster,imdb_url,imdb_rating,running_time,year,country',
                text_format: 'text'
            }
        }, function (movies) {
            _.each(data, (item, index) => {
                item.movie = movies[index]
            });

            let result = {
                updatedOn: now.toISOString(),
                movies: data
            }
            saveDataToFile(result, function () {
                next(result);
            });
        });
    });
}

// Функция получает списки всех показов
// и оставляет только те, которые идут
// на языке оригинала

function getOriginalMoviesShowings(now, next) {
    getData({
        uri: 'https://kudago.com/public-api/v1.3/movie-showings/',
        json: true,
        qs: {
            actual_since: now.toISOString(),
            page_size: '100',
            order_by: 'movie,place,original_language',
            location: 'msk'
        }
    }, function (data) {
        data = _.filter(data, 'original_language');
        data = _.chain(data).groupBy('movie.id').toPairs()
                .map(function(currentItem) {
                    return _.zipObject(["movie", "shows"], currentItem);
                }).value();
        _.each(data, function (row) {
            row.movie = row.shows[0].movie
            _.each(row.shows, function (show) {
                delete show["movie"];
                delete show["original_language"];
            })
        });
        next(data);
    });
}

// Функция делает повторные запросы,
// так как данные могут быть разбросаны
// по нескольки страницам

function getData(options, next, data = []) {
    rp(options).then((result) => {
        if (result.next) {
            let page = parseInt(result.next.match(/page=\d*/g)[0].match(/\d*\d/g)[0]);
            let total = Math.ceil(result.count / parseInt(options.qs.page_size));
            process.stdout.write('### Receiving data... (' + page + " of " + total + ')\r' );
            data = _.concat(data, result.results);
            options.uri = result.next;
            getData(options, next, data);
        } else {
            data.length < 1 ? next(result.results) : next(data)
        }
    })
}

// Функция сохраняет данные в json
function saveDataToFile(data, next) {
    console.log('Saving data to file...');
    let json = JSON.stringify(data)
    fs.writeFile('db.json', json, 'utf8', function () {
        next(data);
    });
}

module.exports = router;
