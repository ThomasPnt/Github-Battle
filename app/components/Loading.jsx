import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Loading extends Component {
    constructor(props){
        super(props);
        this.originalText = props.text
        this.state = {
            text: this.originalText
        }
    }

    componentDidMount(){
        var stopper = this.props.text + '...'
        this.interval = setInterval(function(){
            if(this.state.text === stopper){
                this.setState(function () {
                    return {
                        text: this.originalText
                    }
                })
            } else {
                this.setState(function(prevState) {
                    return {
                        text : prevState.text + '.'
                    }
                })
            }
        }.bind(this), this.props.speed)
    }

    componentWillUnmount(){
        window.clearInterval(this.interval)
    }
    
    render(){
        return(
            <p style={{textAlign: 'center', fontWeight: 'bold' , fontSize: '32px' }}>
                {this.state.text}
            </p>
        )
    }
}

Loading.defaultProps= {
    text: 'Loading',
    speed: 300
}

Loading.propTypes= {
    text: PropTypes.string,
    speed: PropTypes.number
}

export default Loading