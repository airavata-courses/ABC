import React, { Component } from 'react';
import { NewsComp } from './NewsComp'
import './styles.css';

class NewsColumn extends Component {
    render() {
        if(this.props.data === undefined) {
            return (
                <div></div>
            )
        }
        // const { user, users } = this.props; 
        const newsItems = this.props.data.map(
            news => (
                <NewsComp key={news.author}
                    data={news}
                />
            )
        )
        return (

            <div className="card border-dark mb-3">
                <div className="card-header UserProfile">
                    <h1>News</h1>

                </div>

                <div className="card-body">
                    {newsItems}
                </div>

            </div>
        );
    }
}

export default NewsColumn;
