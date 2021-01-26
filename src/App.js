import React,{Component} from 'react';
import './App.css';
import CountryGame from './CountryGame'
import Nav from  './nav'

class App extends Component{
	render(){	
		return(
			<div className="App">
				<Nav/>
				<CountryGame />
			</div>
		)
	}
}

export default App;
