import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Medal } from 'lucide-react';
import axios from 'axios';

// Define the structure of a leaderboard entry
const Leaderboard = () => {
  const navigate = useNavigate();

  // Define the type of data for leaderboard state
  const [leaderboard, setLeaderboard] = useState([
    // Initially, an empty array, but after data is fetched, it will hold objects with this structure.
    {
      userId: '',
      name: '',
      totalScore: 0,
      languageScores: {},
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:3000/leaderboard');
        setLeaderboard(response.data); // Update state with the data from the API
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Function to get the color of the medal based on the leaderboard position
  const getMedalColor = (index) => {
    switch (index) {
      case 0:
        return 'text-yellow-400';
      case 1:
        return 'text-gray-400';
      case 2:
        return 'text-amber-600';
      default:
        return 'text-gray-300';
    }
  };

  // While loading, show a loading message
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-center mb-8">
            <Trophy className="h-10 w-10 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Global Leaderboard</h1>
          </div>

          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.userId}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-center w-12">
                  {index < 3 ? (
                    <Medal className={`h-6 w-6 ${getMedalColor(index)}`} />
                  ) : (
                    <span className="text-lg font-semibold text-gray-500">
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {entry.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Object.entries(entry.languageScores).map(([lang, score]) => (
                      <span
                        key={lang}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {lang}: {score}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {entry.totalScore}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
