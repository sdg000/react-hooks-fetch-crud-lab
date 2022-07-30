import React from "react";

function QuestionItem({ question, onDelete, OnAswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  //Deliverable 3 extension: function to handle delete
  //"id" passed as parameter to cb function prop
  //Onclick, call cb function (onDelete) pass id of question clicked
    function deleteitem(){
      onDelete(id)
    }

    //DELIVERABLE 4 EXT.: function to handle change of answer
    // onChange, pass "id" and "correctIndex" of the target question as parameter to cb function prop 
    function changeAnswer(event){
      OnAswerChange(id, parseInt(event.target.value))
    }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswer}>{options}</select>
      </label>
      <button onClick={deleteitem}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
