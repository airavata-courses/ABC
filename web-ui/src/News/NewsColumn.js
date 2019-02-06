import React, { Component } from 'react';
import { NewsComp } from './NewsComp'
import './styles.css';

class NewsColumn extends Component {
    render() {
        console.log(this.props); 
        // const { user, users } = this.props; 
        return (

            <div className="card border-dark mb-3">
                <div className="card-header UserProfile">
                    <h1>News</h1>

                </div>

                <div className="card-body">
                    <NewsComp/>
                </div>

            </div>
        );
    }
}

export default NewsColumn;
