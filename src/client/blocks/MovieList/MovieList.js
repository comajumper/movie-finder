import React from 'react';
import reqwest from 'reqwest';
import _ from 'lodash';

// Import child blocks
// import Block from '../Block/Block';

// Import block styles
import './MovieList.styl';

export default class MovieList extends React.Component {
    constructor() {
        super();
        this.state = { data: [] }
        this.getMovies = this.getMovies.bind(this)
    }
    getMovies() {
        let that = this
        reqwest({
            url: '/api/movies',
            method: 'GET',
            type: 'json',
            success: function (result) {
                that.setState({ data: result })
            }
        });
    }
    componentDidMount() {
        this.getMovies()
    }
    render() {
        let data = this.state.data;

        if (data.length < 1) {
            return (
                <div className="Page">
                    <div className="Loading">Searching movies...</div>
                </div>
            );
        }

        let items = new Array();
        _.forEach(data, (item, i) => {
            items.push(
                <div key={i} className="Movie">
                  <div className="Movie__poster" style={{ backgroundImage: 'url(' + item.movie.poster.image + ')' }}/>
                </div>
            );
        });

        return (
            <div className="Page">
                <h1 className="Page__title">Movies in theaters</h1>
                <div className="MovieList">{items}</div>
            </div>
        );
    }
}
