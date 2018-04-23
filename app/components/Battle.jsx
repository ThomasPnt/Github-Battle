import React, {Component} from 'react'
import PlayerInput from './PlayerInput.jsx'
import PlayerPreview from './PlayerPreview.jsx';
import {Link} from 'react-router-dom';

class Battle extends Component {
    constructor(props){
        super(props);
        this.state = {
            playerOneName: "",
            playerTwoName: "",
            playerOneImage: null,
            playerTwoImage: null        
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleSubmit(id, username){
        this.setState(() => {
            var newState = {}
            newState[id + 'Name'] = username
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
            return newState
        })
    }

    handleReset(id){
        this.setState(() => {
            var newState = {}
            newState[id + 'Name'] = ''
            newState[id + 'Image'] = null
            return newState  
        })
    }

    render(){
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;

        return(
            <div>
                <div className="row">
                    {!playerOneName && <PlayerInput id='playerOne' label="Player One" onSubmit={this.handleSubmit}/>}
                    {playerOneImage !== null && <PlayerPreview avatar={playerOneImage} username={playerOneName}  id='playerOne'>
                    <button className='reset' onClick={this.handleReset.bind(null,'playerOne')}>Reset</button>
                    </PlayerPreview>}
                    {!playerTwoName && <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit}/>}
                    {playerTwoImage !== null && <PlayerPreview avatar={playerTwoImage} username={playerTwoName}  id='playerTwo'>
                    <button className='reset' onClick={this.handleReset.bind(null,'playerTwo')}>Reset</button>
                    </PlayerPreview>}                    
                </div>
                {playerOneImage && playerTwoImage && 
                    <Link className="button" to={{pathname: match.url + '/results', 
                    search: `?playerOneName=`+ playerOneName + '&playerTwoName=' + playerTwoName   
                    }}>Battle</Link>
                }
            </div>
        )
    }
}

export default Battle