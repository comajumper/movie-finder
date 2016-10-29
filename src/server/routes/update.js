import express from 'express';
import bodyParser from 'body-parser';
import rp from 'request-promise';
import _ from 'lodash';
let router = express.Router();

router.get('/', function (req, res) {

    let today = new Date(); today = today.toISOString();

    let options = {
        uri: 'https://kudago.com/public-api/v1.3/movie-showings/',
        json: true,
        qs: {
            actual_since: today,
            page_size: '100',
            order_by: 'movie,place,original_language',
            location: 'msk',
            expand: 'movie,place'
        }
    }

    getData(options, function (data) {

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

        res.status(200).send(data);
    })

});

function getData(options, parseData, data = [], maxpages = 2 ) {
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

module.exports = router;
