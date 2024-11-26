const express = require('express');
const Quiz = require('../models/Quiz');
const User = require('../models/User');

const router = express.Router();

// Get quiz questions for a specific language
router.get('/:language', async (req, res) => {
  try {
    const { language } = req.params;
    const quiz = await Quiz.findOne({ language });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this language' });
    }

    res.json(quiz.questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz' });
  }
});

// Submit quiz answers and update user score
router.post('/:language/submit', async (req, res) => {
  try {
    const { language } = req.params;
    const { userId, answers } = req.body;

    const quiz = await Quiz.findOne({ language });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        score += 1;
      }
    });

    // Update user's score
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentScore = user.scores.get(language) || 0;
    if (score > currentScore) {
      user.scores.set(language, score);
      await user.save();
    }

    res.json({ score, totalQuestions: quiz.questions.length });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz' });
  }
});

module.exports = router;
