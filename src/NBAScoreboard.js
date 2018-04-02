/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * @date Apr 1, 2018
 * @name Shaun
 * @file NBAScoreboard.js
 */

import React, {Component} from 'react';
import './nba-scoreboard.css';
import NBAScoreCard from './NBAScoreCard';
import {games} from './scoreboard';

class NBAScoreboard extends Component{
    constructor(props){
        super(props);        
        this.state = {
            open: true,
            games: games            
        };
        
        this.toggle = this.toggle.bind(this);
    }
    
    toggle(){
        this.setState({
           open: !this.state.open 
        });
    }
    
    render(){
        let open = (!this.state.open && 'closed') || '';        
        return(            
            <div id="nba-scoreboard" className={open}>
                <div id="handle" onClick={this.toggle}>
                <span> &lt; </span>
                </div>     
                <h1>NBA Scoreboard</h1>
                {
                    this.state.games.map((game, i) => (
                        <NBAScoreCard key={i} game={game}/>
                    ))
                }
            </div>
        )
    }
}

export default NBAScoreboard;

