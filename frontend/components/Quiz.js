import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators'
export function Quiz(props) {
  useEffect(() => {
    !props.quiz && props.fetchQuiz()
  }, [])
  console.log(props);
  
  const submit = () => {
    if(props.selected) {
      const answer = {
        quiz_id: props.quiz.quiz_id,
        answer_id: props.selected.answer_id
      }
      props.postAnswer(answer)
    }
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
          <h2>What is a closure</h2>
          
          <div id="quizAnswers">
            {props.quiz.answers.map((answer,idx) => {
              return(
                <div className-{...props.selected === answer ? 'answer selected' : 'answer'} key={idx}>
                  {answer.text}
                  <button onClick={() => {props.selectAnswer(answer)}}>
                    {props.selected === answer ? 'SELECTED' : 'select'}
                  </button>
                  </div>
              )
            })}
            </div>
            <div className="answer selected">
              A function 
              <button>
                SELECTED
              </button>
            </div>

            <div className="answer">
              An elephant
              <button>
                select 
              </button>
            </div>

          <button id="submitAnswerBtn" onClick={() => submit()} disabled={props.selected ? false : true}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selected: state.selectedAnswer
  }
}

export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer})(Quiz)