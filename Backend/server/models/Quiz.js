const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
      difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
      },
    },
  ],
});

module.exports = mongoose.model('Quiz', quizSchema);
