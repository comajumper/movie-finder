import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import PageHome from './blocks/PageHome/PageHome';
import PageMovie from './blocks/PageMovie/PageMovie';

function App(props) {
    return <Router history={browserHistory}>
        <Route path='/' component={PageHome} />
        <Route path='/movie/:id' component={PageMovie} />
    </Router>;
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.querySelector('#app'));
});
