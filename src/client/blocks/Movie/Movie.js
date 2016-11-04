import React from 'react';
import reqwest from 'reqwest';
import _ from 'lodash';

// Import block styles
import './Movie.styl';

export default class Movie extends React.Component {
    constructor() {
        super();
        this.state = { data: [] }
        this.getInfo = this.getInfo.bind(this)
    }
    getInfo() {
        let that = this
        reqwest({
            url: '/api/movies',
            method: 'GET',
            type: 'json',
            success: function (result) {
                result.map((item) => {
                    if (item.movie.id === parseInt(that.props.params.id)) {
                        that.setState({ data: item })
                    }
                });
            }
        });
    }
    render() {

        this.getInfo()

        if(this.state.data.length < 1) {
            return <div className="Movie"></div>;
        }

        let movie = this.state.data.movie;
        let shows = this.state.data.shows;

        return (
            <div className="Movie">
                <h1 className="Movie__title">{movie.original_title || movie.title }</h1>
                <div className="Movie__description">{movie.body_text}</div>
            </div>
        );
    }
}
