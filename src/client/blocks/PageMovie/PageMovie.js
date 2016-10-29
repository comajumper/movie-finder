import React from 'react';
import reqwest from 'reqwest';
import _ from 'lodash';

// Import child blocks

// Import block styles
import './PageMovie.styl';

export default class PageMovie extends React.Component {
    constructor() {
        super();
        this.state = {
            title: ""
        }
        this.getShowings = this.getShowings.bind(this);
        this.getMovieInfo = this.getMovieInfo.bind(this);
    }
    componentWillMount() {
        this.getMovieInfo()
    }
    getMovieInfo() {
        let that = this
        reqwest({
            url: '/api/movie/' + this.props.params.id,
            method: 'GET',
            type: 'json',
            success: function (data) {
                document.title = data.movie.title + ' / ' + document.title;
                that.setState({ title: data.movie.original_title, showings: data.showings })
            }
        })
    }
    getShowings() {

    }
    render() {
        let content = new Array();

        content.push(
            <div className="Movie">
                <div className="Movie__title">{this.state.title}</div>
            </div>
        );

        if(!!this.state.showings) {
            let showings = new Array();
            for (let i = 0; i < this.state.showings.length; i++) {
                if(this.state.showings[i].original_language) {
                    showings.push(
                        <div key={this.state.showings[i].id} className="Show">
                            {this.state.showings[i].place.id}
                        </div>
                    );
                }
            }
            content.push(
                <div className="Showings">
                    {showings}
                </div>
            );
        }

        return (
            <div className="Page">
                {content}
            </div>
        );
    }
}
