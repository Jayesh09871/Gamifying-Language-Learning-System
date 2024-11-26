import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Languages, Trophy, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const languages = [
  { id: 'spanish', name: 'Spanish', flag: '🇪🇸', progress: 0 },
  { id: 'french', name: 'French', flag: '🇫🇷', progress: 0 },
  { id: 'german', name: 'German', flag: '🇩🇪', progress: 0 },
  { id: 'italian', name: 'Italian', flag: '🇮🇹', progress: 0 },
  { id: 'portuguese', name: 'Portuguese', flag: '🇵🇹', progress: 0 },
  { id: 'japanese', name: 'Japanese', flag: '🇯🇵', progress: 0 },
];

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLanguageSelect = (languageId) => {
    navigate(`/quiz/${languageId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Languages className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LinguaQuest</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/leaderboard')}
                className="flex items-center text-gray-700 hover:text-purple-600"
              >
                <Trophy className="h-5 w-5 mr-1" />
                Leaderboard
              </button>
              <button
                onClick={logout}
                className="flex items-center text-gray-700 hover:text-purple-600"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome, {user?.name}! 👋
          </h1>
          
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose your language</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => handleLanguageSelect(language.id)}
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                >
                  <span className="text-4xl mr-4">{language.flag}</span>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{language.name}</h3>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full"
                        style={{ width: `${language.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
