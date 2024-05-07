import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

const AddQuestions = () => {
    const [questions, setQuestions] = useState([]);
    // const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
    // const [correctAnswer, setCorrectAnswer] = useState('');
    const [newQuestionText, setNewQuestionText] = useState('');
    const [newQuestionExplanation, setNewQuestionExplanation] = useState('Chưa có lời giải thích');
    const [newQuestionCategory, setNewQuestionCategory] = useState('bacluc3');
    const [newOptions, setNewOptions] = useState([
        { id: 1, text: '', correct: false },
        { id: 2, text: '', correct: false },
        { id: 3, text: '', correct: false },
        { id: 4, text: '', correct: false }
    ]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        fetch('http://localhost:5000/api/getquestions')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching questions:', error));
    };

    const handleQuestionClick = (id, question) => {
        // setSelectedQuestionIndex(id);
        setNewQuestionText(question.question);
        setNewQuestionExplanation(question.explanation);
        setNewQuestionCategory(question.categoryname);
        setNewOptions(question.answers.map(answer => ({
            id: answer.id,
            text: answer.text,
            correct: answer.correct
        })));
        // setCorrectAnswer(''); // Reset correct answer when new question is selected
    };

    const handleOptionChange = (id, e) => {
        const newOptionsCopy = newOptions.map(option => {
            if (option.id === id) {
                return { ...option, text: e.target.value };
            }
            return option;
        });
        setNewOptions(newOptionsCopy);
    };

    const handleCheckboxChange = (id) => {
        const newOptionsCopy = newOptions.map(option => {
            if (option.id === id) {
                return { ...option, correct: !option.correct };
            }
            return option;
        });
        setNewOptions(newOptionsCopy);
    };

    const handleNewQuestion = () => {
        console.log('Add new question');
        // Reset form
        setNewQuestionText('');
        setNewQuestionExplanation('Chưa có lời giải thích');
        setNewQuestionCategory('bacluc3');
        setNewOptions([{ id: 1, text: '', correct: false },
        { id: 2, text: '', correct: false },
        { id: 3, text: '', correct: false },
        { id: 4, text: '', correct: false }]);
        // setSelectedQuestionIndex(null);
        fetchQuestions(); // Fetch updated questions

    };

    const handleInsert = () => {
        const data = {
            questionText: newQuestionText,
            questionExplanation: newQuestionExplanation,
            questionCategory: newQuestionCategory,
            options: newOptions
        };
        // console.log(JSON.stringify(data))

        fetch('http://localhost:8081/api/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    // Handle success, maybe show a success message or reset the form
                    console.log('Question inserted successfully');
                    // Reset form
                    setNewQuestionText('');
                    setNewQuestionExplanation('Chưa có lời giải thích');
                    setNewQuestionCategory('bacluc3');
                    setNewOptions([{ id: 1, text: '', correct: false },
                    { id: 2, text: '', correct: false },
                    { id: 3, text: '', correct: false },
                    { id: 4, text: '', correct: false }]);
                    // setSelectedQuestionIndex(null);
                    fetchQuestions(); // Fetch updated questions
                } else {
                    // Handle error, maybe show an error message
                    console.error('Error:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="app">
            <div className="rin_row">
                <div className="rin_column side">
                    <div className="rin_questionlist">
                        <div className="rin_question_head">
                            <h3>Danh sách câu hỏi</h3>
                        </div>
                        <div className="question_body">
                            {questions.slice(-20).map((question) => (
                                <div key={question.id}>
                                    <Button variant="contained"
                                        onClick={() => handleQuestionClick(question.id, question)}
                                    >
                                        Câu {question.id}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rin_column middle">
                    <div>
                        <h2>Thêm câu hỏi mới</h2>
                        <button onClick={handleNewQuestion}>Reset</button>
                        <br /> {/* Add line break */}
                        <label htmlFor="newQuestionCategory">Bậc:</label>
                        <input type="text" id="newQuestionCategory" value={newQuestionCategory} onChange={(e) => setNewQuestionCategory(e.target.value)} />
                        <br /> {/* Add line break */}
                        <div style={{ display: 'flex', width: '100%' }}>
                            <label htmlFor="newQuestionText" style={{ flex: '1' }}>Câu hỏi:</label>
                            <input type="text" id="newQuestionText" value={newQuestionText} onChange={(e) => setNewQuestionText(e.target.value)} style={{ flex: '9' }} />
                        </div>

                        {newOptions.slice(0, 4).map((option, index) => (
                            <div key={option.id} style={{ display: 'flex', width: '100%' }}>
                                <label htmlFor={`newOption${option.id}`} style={{ flex: '2' }}>{`Tùy chọn ${String.fromCharCode(65 + index)}:`}</label>
                                <input type="checkbox" checked={option.correct} onChange={() => handleCheckboxChange(option.id)} style={{ flex: '1' }} />
                                <input type="text" id={`newOption${option.id}`} value={option.text} onChange={(e) => handleOptionChange(option.id, e)} style={{ flex: '7' }} />
                            </div>
                        ))}

                        <label htmlFor="newQuestionExplanation">Dẫn giải:</label>
                        <input type="text" id="newQuestionExplanation" value={newQuestionExplanation} onChange={(e) => setNewQuestionExplanation(e.target.value)} />
                        <br /> {/* Add line break */}
                        <button onClick={handleInsert}>Insert/Update Question</button>
                    </div>
                </div>
            </div>

            <div className="rin_footer">
                <p>GDPT CAM RANH</p>
            </div>
        </div>
    );
};

export default AddQuestions;
