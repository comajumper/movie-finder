import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import MovieList from './blocks/MovieList/MovieList';
import Movie from './blocks/Movie/Movie';

function App(props) {
    return <Router history={browserHistory}>
        <Route path='/' component={MovieList} />
        <Route path='/movie/:id' component={Movie} />
    </Router>;
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.querySelector('#app'));
});
