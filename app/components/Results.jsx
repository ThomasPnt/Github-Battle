import React, {Component} from 'react'
import queryString from 'query-string'
import api from '../utils/api'

class Results extends Component {
    componentDidMount(){
        var players = queryString.parse(this.props.location.search)        
        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then((results) => {
            console.log(results);
        })
    }
    render(){        
        return(
            <div>
                Result
                
            </div>
        )
    }
}

export default Results