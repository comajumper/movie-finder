import express from 'express';
import bodyParser from 'body-parser';
import rp from 'request-promise';
import fs from 'fs';
import _ from 'lodash';
let router = express.Router();

router.get('/movies', function (req, res) {

    fs.stat('data.json', function fsStat(err, stats) {

      if (err) {
          console.log('Fetching data...');
          let today = new Date();

          let options = {
              uri: 'https://kudago.com/public-api/v1.3/movie-showings/',
              json: true,
              qs: {
                  actual_since: today.toISOString(),
                  page_size: '100',
                  order_by: 'movie,place,original_language',
                  location: 'msk',
                  expand: 'movie,place'
              }
          }

          getData(options, function (data) {
              console.log('Filtering data...');
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
              saveDataToFile(data, function (data) {
                  res.status(200).send(data);
              });
          });
      } else {
          fs.readFile('data.json', 'utf8', function (err, data) {
              data = JSON.parse(data);
              res.status(200).send(data);
          });
      }

    });




});

function getData(options, parseData, data = [], maxpages ) {
    rp(options).then((result) => {
        if (result.next) {
            let page = result.next.match(/page=\d*/g)[0];
            page = parseInt(page.match(/\d*\d/g)[0]) - 1;

            if (page === maxpages) {
                parseData(data)
            } else {
                process.stdout.write(' Page ' + page + " of " + Math.ceil(result.count / parseInt(options.qs.page_size)) + '\r' );
                data = _.concat(data, result.results)
                options.uri = result.next
                getData(options, parseData, data)
            }

        } else {
            data.length < 1 ? parseData(result.results) : parseData(data)
        }
    })
}

function saveDataToFile(data, next) {
    console.log('Saving data to file...');
    let json = JSON.stringify(data)
    fs.writeFile('data.json', json, 'utf8', function () {
        next(data);
    });
}

module.exports = router;
