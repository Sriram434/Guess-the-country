import React, {Component} from 'react';
import shuffle from 'shuffle-array';
import './CountryGame.css';
import FlagQuestion, {QuestionStates} from './FlagQuestion.js'

class CountryGame extends Component {
	constructor(props){
		super(props);
		this.state={
			countries:[],
			options:[],
			correctOption: undefined,
			questionState: undefined,
		}
		this.onGuess = this.onGuess.bind(this);
    	this.nextQuestion = this.nextQuestion.bind(this);
	}


	componentDidMount(){
		 fetch('https://restcountries.eu/rest/v2/all')
		.then(resp => resp.json())
		.then(countries => {
			const correctOption = Math.floor(Math.random() * countries.length)
			const options = this._getOptions(correctOption, countries)
			this.setState({
				countries,
				options,
				correctOption,
				questionState: QuestionStates.QUESTION
			})
		})
		.catch(console.warn)
	}

	onGuess(answer){
		const {correctOption} = this.state;
		let questionState = answer === correctOption ?
							QuestionStates.ANSWER_CORRECT:
							QuestionStates.ANSWER_WRONG;
		this.setState({questionState})
	}

	nextQuestion(){
		const {countries} = this.state;
		const correctOption = Math.floor(Math.random() * countries.length)
		const options = this._getOptions(correctOption, countries)
		this.setState({
			correctOption,
			options,
			questionState: QuestionStates.QUESTION
		})
	}

	_getOptions(correctOption, countries){
		let options = [correctOption]
		while(options.length < 4){
			let option = Math.floor(Math.random() * countries.length)
			//To get the (4)options other than correct one and push to the options array
			if(options.indexOf(option) === -1){
				options.push(option)
			}
		}
		return shuffle(options)
	}

	render(){
		let {countries, correctOption, options, questionState} = this.state;
		let output = <div>Loading....!</div>;
		if(correctOption !== undefined){
			const {flag, name} = countries[correctOption]
			//Getting the country names from countries array formt the options index
			let opts = options.map(opt => {
				return{
					id: opt,
					name: countries[opt].name
				}
			})
			output = (
				<FlagQuestion
					answerText={name}
					onGuess={this.onGuess}
					onNext = {this.nextQuestion}
					options={opts}
					questionState={questionState}
					flag={flag}
				/>
			)
		}	
		return(
			<div style={{marginTop:'15px'}}>{output} </div>
		)
	}
}

export default CountryGame;