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
        
        //Didn't need to add the props to state, unless this was a live data feed.
        //Then the state is needed to update the UI when the state is updated.
        this.state = {
            game: this.props.game,
            winner: ''
        };
    }
    
    componentWillMount(){
        let winner = this.getWinner();
        this.setState({
            winner: winner
        });        
    }
    
    /**
     * Return csv of broadcasters [national, home, away]
     * @param {object} broadcast
     * @returns {String}
     */
    getBroadcasters(broadcast){        
        let {broadcast: {broadcasters: {national, hTeam, vTeam}}} = broadcast;        
        
        let stations = [national[0], hTeam[0], vTeam[0]].filter(station => {
            if(!station){
                return false;
            }
            return true;
        }).map(station => (station.shortName)).join(', ');
        
        return stations;
    }
    
    /**
     * Return the winner of the game
     * @returns {vTeam.triCode|hTeam.triCode}
     */
    getWinner() {       
        let {hTeam, vTeam} = this.state.game;
        let homeTeamScore = parseInt(hTeam.score, 10);
        let awayTeamScore = parseInt(vTeam.score, 10);        
        let winner = (homeTeamScore > awayTeamScore) ? hTeam.triCode : vTeam.triCode;
        return winner;
    }

    render() {        
        let { 
            hTeam: homeTeam,
            vTeam: awayTeam,
            arena,
            watch: broadcast,
            nugget: headLine,
            startTimeEastern: startTime,
        } = this.state.game;
        
        return(
                <div className="scoreCard">
                    <div className="header">
                        <span className="broadcast">{this.getBroadcasters(broadcast)}</span>
                        {startTime}
                    </div>
                    <table className="body">
                        <tbody>
                            <tr className={"awayTeam team " + (this.state.winner === awayTeam.triCode ? 'won' : 'lost')}>
                                <td>{awayTeam.triCode}</td>
                                {
                                    awayTeam.linescore.map((line,i) => (
                                        <td className="score" key={i}>{line.score}</td>
                                    ))
                                }
                                <td className="score">{awayTeam.score}</td>
                            </tr>
                            <tr className={"homeTeam team " + (this.state.winner === homeTeam.triCode ? 'won' : 'lost')}>
                                <td>{homeTeam.triCode}</td>
                                {
                                    homeTeam.linescore.map((line,i) => (
                                        <td className="score" key={i}>{line.score}</td>
                                    ))
                                }
                                <td className="score">{homeTeam.score}</td>
                            </tr>
                        </tbody>
                    </table>                    
                    <div className="footer">
                        <span className="headline">{headLine.text}</span>
                        <div className="venue">
                            {arena.name} - {arena.city}, {arena.stateAbbr}
                            <span className="attendance">{}</span>
                        </div>                        
                    </div>                    
                </div>
        )
    }
}

export default NBAScoreCard;

