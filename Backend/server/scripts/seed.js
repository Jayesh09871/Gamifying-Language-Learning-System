const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('../models/Quiz');
const questions = require('../data/questions');

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Clear existing quizzes
    await Quiz.deleteMany({});

    // Insert quiz questions for each language
    for (const [language, questionSet] of Object.entries(questions)) {
      await Quiz.create({
        language,
        questions: questionSet
      });
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
