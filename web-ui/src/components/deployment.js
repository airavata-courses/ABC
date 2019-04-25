import React, { Component } from 'react';
import NEWS_URL from '../_constants'

class Deployment extends Component {
    constructor() {
        super();
        this.state = {
            color: 'Getting color...'
        }
    }

    componentWillMount() {
        fetch(`${NEWS_URL}/color`)
            .then(color => {
                this.setState({ color: color });
            });
    }

    render() {
        <div>
            {this.state.color}
        </div>
    }
}

export default Deployment;