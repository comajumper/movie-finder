import React from 'react';
import { Link } from 'react-router';
import reqwest from 'reqwest';
import _ from 'lodash';


// Import child blocks
// import Block from '../Block/Block';

// Import block styles
import './MovieList.styl';

export default class MovieList extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
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
    scrollDown() {
        console.log(11);
    }
    componentDidMount() {
        this.getMovies();
    }
    render() {
        let data = this.state.data;
        if (data.length < 1) {
            return (
                <div className="Page">
                    <div className="MovieList__loading">Searching movies...</div>
                </div>
            );
        }

        let items = new Array();

        _.forEach(data, (item, i) => {

            let link = '/movie/' + item.movie.id;
            let path = this.props.location.pathname;
            let className = 'MovieList__item';

            if (path === link) {
                className += ' ' + className + '_selected';
            } else if (path !== '/') {
                className += ' ' + className + '_unselected';
            }

            items.push(
                <li key={i} className={className}>
                    <Link to={ path === link ? '/' : link } onClick={this.scrollDown.bind(this)}>
                        <div className="MovieList__poster" style={{ backgroundImage: 'url(' + item.movie.poster.image + ')' }}/>
                    </Link>
                </li>
            );
        });

        return (
            <div className="Page">
                <div className="MovieList">
                    <div className="MovieList__header">
                        <h1 className="MovieList__title">Now playing</h1>
                        <div className="MovieList__info">{data.length + ' movies in Moscow'}</div>
                    </div>
                    <div className="MovieList__items">{items}</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
