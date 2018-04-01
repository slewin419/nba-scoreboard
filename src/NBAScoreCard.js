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

class NBAScoreCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game
        };
    }
    
    componentWillMount() {
        console.log('....going to mount');

    }

    componentDidMount() {
        console.log('....mounted!');
    }

    render() {        
        let { 
            hTeam: homeTeam,
            vTeam: awayTeam, 
            arena, 
            nugget: headLine,
            startTimeEastern: startTime
        } = this.state.game;
        return(
                <div className="scoreCard"> 
                    <span className="headline">{headLine.text}</span>
                    <span className="time">{startTime}</span>
                    <div className="awayTeam">
                        <span>{awayTeam.triCode}</span>
                        {
                            awayTeam.linescore.map((line,i) => (
                                <span key={i}>{line.score}</span>
                            ))
                        }
                        <span>{awayTeam.score}</span>
                    </div>
                    <div className="homeTeam">
                        <span>{homeTeam.triCode}</span>
                        {
                            homeTeam.linescore.map((line,i) => (
                                <span key={i}>{line.score}</span>
                            ))
                        }
                        <span>{homeTeam.score}</span>
                    </div>
                    <div className="venue">
                        {arena.name} - {arena.city}, {arena.stateAbbr}
                    </div>
                </div>
                )
    }
}

export default NBAScoreCard;

