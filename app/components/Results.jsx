import React, {Component} from 'react'
import queryString from 'query-string'
import api from '../utils/api'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import PlayerPreview from './PlayerPreview.jsx';

class Results extends Component {
    constructor(props){
        super(props);
        this.state = {
            winner: null,
            looser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount(){
        var players = queryString.parse(this.props.location.search)        
        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then((results) => {
            if(results === null){
                return this.setState({
                    error: "Looks like they have at least one users on Github who doesn't exist",
                    loading: false
                })
            }

            this.setState({
                winner: results[0],
                looser: results[1],
                error: null,
                loading: false
            })
        })
    }
    render(){
        var error = this.state.error
        var winner = this.state.winner
        var looser = this.state.looser
        var loading = this.state.loading        
        
        if(loading === true){
            return <loading speed={250} text='Fight'/>
        } 
        
        if(error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }

        return(
            <div>
                <div className='row'>
                    <Player 
                        label='Winner'
                        score={winner.score}
                        profile={winner.profile}/>
                    <Player 
                        label='Looser'
                        score={looser.score}
                        profile={looser.profile}/>
                </div>
                <Link className="relaunch" to='/battle'> New Battle </Link>
            </div>
        )
    }
}

const Player = (props) => {
    return(
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{textAlign:'center'}}>Score: {props.score}</h3>
            <Profile info={props.profile}/>
        </div>
    )
}

const Profile = (props) => {
    var info = props.info
    return(
        <PlayerPreview avatar={info.avatar_url} username={info.login}>
            <ul className='space-list-item'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired
}

export default Results