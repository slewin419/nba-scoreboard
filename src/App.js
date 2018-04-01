import React, { Component } from 'react';
import HotKey from './HotKey';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.handleClick.bind(this);
    }

    componentDidMount(){
        console.log('....App mounted!');
    }   
    
    handleClick(e){
        console.log(e);
    }
    
    render() {
    return (
        <HotKey>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
              </p>
              <button hot-key="A" onClick={this.handleClick}>Button #1</button>
              <button hot-key="B" onClick={this.handleClick}>Button #2</button>
              <button hot-key="C" onClick={this.handleClick}>Button #3</button>
        </div>
            <div className="footer"></div>
        </HotKey>
    );
  }
}

export default App;
