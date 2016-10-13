import React from 'react';
import reqwest from 'reqwest';
import _ from 'lodash';

// Import child blocks
import Project from '../Project/Project';
import Nav from '../Nav/Nav';

// Import block styles
import './PageHome.styl';

export default class PageHome extends React.Component {
    render() {
        return (
            <div className="PageHome">
                <Nav />
                <section className="Intro">
                    <h1 className="Intro__heading">Designing things for people to enjoy</h1>
                </section>
                <section className="Featured">
                    <h1 className="Featured__heading">Featured projects</h1>
                    <Project
                        title="Project"
                        subtitle="The power of magic"
                        thumb="/assets/projects/project/thumb.png"
                    />
                </section>
            </div>
        );
    }
}
