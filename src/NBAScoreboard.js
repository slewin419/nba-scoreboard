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
            games: games            
        };
    }
    
    componentWillMount(){
        console.log('....going to mount');        
        
    }
    
    componentDidMount(){
        console.log('....mounted!');
    }
    
    render(){
        return(
            <div id="nba-scoreboard">
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

