import React from 'react'
import './FlagAnswer.css'

//FlagAnswer component displaying the correct answer
const FlagAnswer = ({correct, answer, onNext}) =>(
	<div className='flag-answer'>
		{correct ?
			<h2 style={{color:'Green'}}> Correct ! : {answer} </h2> :
			<h2 style={{color:'red'}}> Incorrect ! Correct answer is :  {answer} </h2>
		}
		<button text='NEXT' onClick={onNext}>NEXT </button>
	</div>
)

export default FlagAnswer;