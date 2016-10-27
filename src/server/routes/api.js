import express from 'express';
import bodyParser from 'body-parser';
import reqwest from 'reqwest';
let router = express.Router();

router.get('/movies', getMovies);

function getMovies (req, res, next) {

    let results = new Array();

    function makeRequest (url, callback) {
        reqwest({
            url: url,
            method: 'GET',
            type: 'json',
            success: function (data) {
                results = results.concat(data.results)
                if(!data.next) {
                    callback(results)
                } else {
                    makeRequest(data.next, callback);
                }
            }
        });
    }

    makeRequest("https://kudago.com/public-api/v1.3/movies/?premiering_in_location=msk", function (data) {
        res.status(200).json(data);
    })

};

module.exports = router;
