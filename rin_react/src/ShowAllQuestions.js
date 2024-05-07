import React from 'react';

const ShowAllQuestions = ({ questions, fetchQuestions }) => {
  
  return (
    <div>
      <h1>Questions</h1>
      <button onClick={fetchQuestions}>Fetch Questions</button>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <strong>{question.question}</strong>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer.text} - {answer.correct ? 'Correct' : 'Incorrect'}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowAllQuestions;
