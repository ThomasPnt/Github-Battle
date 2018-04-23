import React, {Component} from 'react'
import SelectedLanguages from './SelectedLanguages.jsx';
import RepoGrid from './RepoGrid.jsx';

import api from '../utils/api';

class Popular extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage : 'All',       
            repos: null 
        }
        this.UpdateLanguage = this.UpdateLanguage.bind(this);
    }

    componentDidMount(){
        this.UpdateLanguage(this.state.selectedLanguage)   
    }

    UpdateLanguage(lang){
        this.setState({ 
            selectedLanguage : lang,
            repos: null
        });
        api.fetchPopularRepos(lang)
            .then((repos) => this.setState({repos: repos}))
    }

    render(){
        console.log(this.state.repos);
        
        return(
            <div>
                <SelectedLanguages 
                    select={this.state.selectedLanguage} 
                    UpdateLanguage={this.UpdateLanguage}/>
                {!this.state.repos ? <p>Loading ...</p> : 
                    <RepoGrid repos={this.state.repos}/>}
            </div>
        )
    }
}

export default Popular
