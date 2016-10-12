import React from 'react';
import reqwest from 'reqwest';
import _ from 'lodash';

// Import child blocks
import ProjectList from '../ProjectList/ProjectList';

// Import block styles
import './PageHome.styl';

export default class PageHome extends React.Component {
    render() {
        return (
            <div className="PageHome">
                <section className="Intro">
                    <h1>Designing things for people to enjoy</h1>
                </section>
            </div>
        );
    }
}
