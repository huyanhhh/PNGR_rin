
import React, { useState, useEffect } from 'react';
import './sovle.css';





interface Question {
    id: number;
    question: string;
    answers: Answer[];
}

interface Answer {
    id: number;
    text: string;
    correct: boolean;
}

const Posts: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const questionsPerPage: number = 20;

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        fetch('http://localhost:5000/api/questions')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                return response.json();
            })
            .then((data: Question[]) => setQuestions(data))
            .catch(error => console.error('Error fetching questions:', error.message));
    };

    const handleQuestionClick = (question: Question) => {
        setSelectedQuestion(question);
        setCorrectAnswer(null); // Reset correct answer when new question is selected
    };

    const handleAnswerClick = (answer: Answer) => {
        if (answer.correct) {
            setCorrectAnswer(answer.text);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const renderQuestionButtons = () => {
        const startIndex: number = (currentPage - 1) * questionsPerPage;
        const endIndex: number = Math.min(startIndex + questionsPerPage, questions.length);

        return questions.slice(startIndex, endIndex).map(question => (
            <button key={question.id} className='rin_btn' onClick={() => handleQuestionClick(question)}>
                Câu {question.id}
            </button>
        ));
    };

    return (
        <div className="app">
            <div className="rin_header">
                <div className='logohead'>
                    {/* <img src={logo} className='rin_logo' alt='logo' /> */}
                    <div className='logohead2'>
                        <h1>Thi Trắc Nghiệm Bậc .... </h1>
                        <div className="rin_questionlist">
                            <div className="question_body">
                                <div className="button-container">
                                    <div className="button-row">
                                        {renderQuestionButtons()}
                                        <button className='rin_btn1' onClick={handlePrevPage} disabled={currentPage === 1}>Back</button>
                                        <button className='rin_btn1' onClick={handleNextPage} disabled={currentPage * questionsPerPage >= questions.length}>Next</button>
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
                        <div>
                            <strong>{selectedQuestion.question}</strong>
                            <ul>
                                {selectedQuestion.answers.map(answer => (
                                    <button key={answer.id} onClick={() => handleAnswerClick(answer)}>{answer.text}</button>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="rin_column.side">
                    <div>
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

export default Posts;
