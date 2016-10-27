import React from 'react';
import reqwest from 'reqwest';
import _ from 'lodash';

// Import child blocks
// import Project from '../Project/Project';
// import Nav from '../Nav/Nav';

// Import block styles
import './PageHome.styl';

export default class PageHome extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: []
        }
        this.getMovies = this.getMovies.bind(this);
    }
    getMovies() {
        let that = this
        reqwest({
            url: '/api/movies',
            method: 'GET',
            type: 'json',
            success: function (result) {
                console.log(result);
                that.setState({ movies: result })
            }
        })
    }
    componentDidMount() {
        this.getMovies()
    }
    render() {
        if (this.state.movies.length < 1) {
            return (
                <div className="Page">
                    <div className="Loading">Asking movie theaters...</div>
                </div>
            );
        }

        let movies = new Array();
        for (let i = 0; i < this.state.movies.length; i++) {
            let background = { backgroundImage: 'url(' + this.state.movies[i].poster.image + ')' };
            movies.push(
                <div key={this.state.movies[i].id}  className="Movie">
                    <div className="Movie__poster" style={background} ></div>
                </div>
            );
        }

        return (
            <div className="Page">
                <div className="MovieList">{movies}</div>
            </div>
        );
    }
}
