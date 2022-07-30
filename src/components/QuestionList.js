import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  
  const [questions, setQuestions] = useState([])

  //DELIVERABE 1. GET/QUESTIONS
  //1.1 on Load fetch questions fron API, and display
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      setQuestions(data)
    })
    
  }, [])

  //DELIVERABLE 3: DELETE/QUESTION/ID
  /**
   * Create cb function to be passed to "QuestionItem Component" to handle delete
   */
   function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(function(response){
      return response.json()
    })
    //return all questions except question whose id is not equal to "deleted id"
    .then(function(){
      const minusDeletedQuestions = questions.filter((i) => i.id !== id)
      setQuestions(minusDeletedQuestions)
    })
  }

  /**
   * DELIVERABLE 4. PERSIST ANSWER CHANGE TO SERVER AND STATE
   * Create callback function to PATCH Server with "correct index"., pass cb function to "QuestionItem Component
   * This patch function will take "id", "new correct selection" of the question involved
   * as paratmeter and send them over to the server , replace new correctIndex with old correctIndex
   */
function answerChange(id, correctIndex){
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({correctIndex})
  })
  .then(function(response){
    return response.json()
  })
  .then(function(minusDeletedQuestions){
    const allUpdatedQuestionAnswer = questions.map((item) =>{
      if(item.id === minusDeletedQuestions.id){
        return minusDeletedQuestions
      }else{
        return item
      }
    })
    setQuestions(allUpdatedQuestionAnswer)
  })

}

  //1.2 MAPPING "through questions" and for each item, call "questionItem COmponent" to display it
  const questionDisplay = questions.map((item) => {
     return <QuestionItem key={item.id} question={item} onDelete={handleDelete} OnAswerChange={answerChange}/>
  })

  



  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionDisplay}</ul>
    </section>
  );
}

export default QuestionList;

/**
 * EXTRA EXTRA CHALLENGE:
 * UPDATING THE STATE WHEN RIGHT AFTER SUBMITING NEW QUESTION:
 * you would normally pass a cb function from where state lives,
 * to where Component responsible for adding new question.
 * this would help export the newquestion to "component responsible"
 * for updating questions.
 * ALSO: "questions in state" is updated when user clicks "view questions"
 */