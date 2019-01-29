import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Feed from "./containers/feedPage/feed";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Feed/>
                </header>
            </div>
        );
    }
}

export default App;
