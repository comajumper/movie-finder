import React from 'react';
import reqwest from 'reqwest';
import _ from 'lodash';

// Import child blocks

// Import block styles
import './PageHome.styl';

export default class PageHome extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
        // this.getMovies.bind(this)
    }
    getMovies() {
        // this.props
        // let that = this
        // reqwest({
        //     url: '/api/movies',
        //     method: 'GET',
        //     type: 'json',
        //     success: function (result) {
        //         that.setState({ data: result })
        //     }
        // });
    }
    componentDidMount() {
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
    render() {
        if (this.state.data.length < 1) {
            return (
                <div className="Page">
                    <div className="Loading">Searching movies...</div>
                </div>
            );
        }

        let movies = new Array();
        for (let i = 0; i < this.state.data.length; i++) {
            let background = { backgroundImage: 'url(' + this.state.data[i].movie.poster.image + ')' };
            movies.push(
                <div key={this.state.data[i].movie.id}  className="Movie">
                    <a href={ '/movie/' + this.state.data[i].movie.id}>
                        <div className="Movie__poster" style={background} ></div>
                    </a>
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
