import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Quiz() {
  const { language } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching quiz for language:', language);
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${language}`);
        console.log('Quiz questions:', response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error.response || error.message);
        alert('Failed to load quiz questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [language]);
  
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;
    setScore((prev) => (isCorrect ? prev + 1 : prev));
    setAnswers((prev) => [...prev, { questionId: questions[currentQuestion].id, answer: selectedAnswer, isCorrect }]);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer('');
    } else {
      try {
        await axios.post(`http://localhost:3000/${language}/submit`, {
          userId: user?.id,
          answers,
        });
      } catch (error) {
        console.error('Error submitting score:', error);
        alert('Failed to submit quiz results. Please check your network connection.');
      }
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading questions...</div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
            <p className="text-xl text-gray-600 mb-8">
              You scored {score} out of {questions.length}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <span className="text-purple-600 font-semibold">
                Score: {score}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl text-gray-800 mb-4">
              {questions[currentQuestion]?.question}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full p-4 text-left rounded-lg transition-colors ${
                    selectedAnswer === option
                      ? 'bg-purple-100 border-purple-500 border-2'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
              selectedAnswer
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
