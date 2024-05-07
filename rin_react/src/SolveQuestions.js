import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
// import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const SolveQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 20;

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        fetch('http://localhost:5000/api/questions')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching questions:', error));
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setCorrectAnswer(null); // Reset correct answer when new question is selected
    };

    const handleAnswerClick = (answer) => {
        if (answer.correct) {
            setCorrectAnswer(answer.text);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const theme = createTheme({
        palette: {
          ochre: {
            main: '#E3D026',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
          },
        },
      });

    const renderQuestionButtons = () => {
        const startIndex = (currentPage - 1) * questionsPerPage;
        const endIndex = Math.min(startIndex + questionsPerPage, questions.length);

        return questions.slice(startIndex, endIndex).map((question, index) => (
            <button key={question.id} className='rin_btn' onClick={() => handleQuestionClick(question)}>
                Câu {startIndex + index + 1}
            </button>
        ));
    };

    return (
        <div className="app">
            <div className="rin_header">

                <div className='logohead'>
                    <img src={logo} className='rin_logo' alt='logo' />
                    <div className='logohead2'>

                        <h1>Thi Trắc Nghiệm Bậc .... </h1>
                        <div className="rin_questionlist">
                            <div className="question_body">
                                <div className="button-container">
                                    <div className="button-row">

                                        {renderQuestionButtons()}
                                        <Button variant="string" size="small" onClick={handlePrevPage} disabled={currentPage === 1}>Back</Button>
                                        <Button variant="string" size="small" className='rin_btn1' onClick={handleNextPage} disabled={currentPage * questionsPerPage >= questions.length}>Next</Button>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

    
    
                
          

            <div className="rin_row">
                <div className="rin_column">
                    <h2>Câu hỏi</h2>

                    {selectedQuestion && (
                        <div >
                            <strong>  {selectedQuestion.question}</strong>
                            <ul>

                                <ButtonGroup  orientation="vertical" variant='text' aria-label="Vertical button group">
                                    {selectedQuestion.answers.map((answer, index) => (
                                        <Button   key={index} onClick={() => handleAnswerClick(answer)}>{answer.text}</Button>
                                    ))}
                                </ButtonGroup>

                            </ul>
                        </div>
                    )}

                </div>
                <div className="rin_column.side">
                    <div  >
                        <h2>đáp án</h2>
                        <p>{correctAnswer ? `Đáp án đúng: ${correctAnswer}` : ""}</p>
                    </div>
                </div>
            </div>
            <div className="rin_footer">
                <p>GDPT CAM RANH</p>
            </div>

        </div>
    );
};

export default SolveQuestions;
