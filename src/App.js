import React, { Component } from 'react';
import NBAScoreboard from './NBAScoreboard';
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
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <NBAScoreboard/>
        </div>
    );
  }
}

export default App;
