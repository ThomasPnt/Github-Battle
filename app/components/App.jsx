import React, {Component} from 'react'
import Popular from './Popular.jsx'
import {BrowserRouter, Route ,Switch} from 'react-router-dom'
import Nav from './Nav.jsx'
import Home from './Home.jsx';
import Battle from './Battle.jsx';
import Results from './Results.jsx';

class App extends Component {
    render(){
         return(
            <BrowserRouter>
                <div className='container'>
                    <Nav/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/popular' component={Popular}/>
                        <Route exact path='/battle' component={Battle}/>
                        <Route path='/battle/results' component={Results}/>
                        <Route render={() => <p>Not Found</p>}/>
                    </Switch>
                </div>
            </BrowserRouter>
            
         )
    }
}

export default App