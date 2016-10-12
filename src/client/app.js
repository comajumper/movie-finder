import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import PageHome from './blocks/PageHome/PageHome';

function App(props) {
    return <Router history={browserHistory}>
        <Route path='/' component={PageHome} />
    </Router>;
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.querySelector('#app'));
});
