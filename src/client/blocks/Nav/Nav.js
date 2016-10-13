import React from 'react';
import reqwest from 'reqwest';
import _ from 'lodash';

// Import child blocks
// import Block from '../Block/Block';

// Import block styles
import './Nav.styl';

export default class Nav extends React.Component {
    render() {
        return (
            <div className="Nav">
                <a className="Nav__item">work</a>
                <a className="Nav__item">about</a>
            </div>
        );
    }
}
