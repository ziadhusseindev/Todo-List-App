"use client"
import React, { useState, useEffect } from 'react';
import Todo from './Todo';

const TodoPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isArabic, setIsArabic] = useState(false);

  // Translations object for page-level content
  const translations = {
    english: {
      title: 'Todo App',
      subtitle: 'A simple todo app to help you stay organized and productive.',
      designedBy: 'Designed & Developed by',
      translateBtn: 'العربية',
    },
    arabic: {
      title: 'تطبيق المهام',
      subtitle: 'تطبيق بسيط للمهام لمساعدتك على البقاء منظمًا ومنتجًا.',
      designedBy: 'تم التصميم والتطوير بواسطة',
      translateBtn: 'English',
    }
  };

  // Get current language translations
  const t = isArabic ? translations.arabic : translations.english;

  // Toggle language
  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme) {
      setIsDarkMode(JSON.parse(storedTheme));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }

    // Load language preference
    const storedLanguage = localStorage.getItem('isArabic');
    if (storedLanguage) {
      setIsArabic(JSON.parse(storedLanguage));
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('isArabic', JSON.stringify(isArabic));
  }, [isArabic]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-800'
      } ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex justify-between mb-4">
          <button
            onClick={toggleLanguage}
            className={`px-3 py-1 rounded-full text-sm transition-all duration-200 hover:scale-105 ${
              isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700'
            }`}
          >
            {t.translateBtn}
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full focus:outline-none ${isDarkMode ? 'bg-gray-800 text-yellow-300' : 'bg-white text-gray-800'
              } shadow-md hover:scale-110 transition-transform duration-300`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-spin-slow" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse-slow" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 animate-fade-in ${isDarkMode
              ? 'text-white'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x'
            }`}>
            {t.title}
          </h1>
          <p className={`text-lg max-w-2xl mx-auto animate-slide-up ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
            {t.subtitle}
          </p>
        </div>

        <div className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl rounded-lg">
          <Todo isDarkMode={isDarkMode} isArabic={isArabic} />
        </div>

        <div className={`mt-10 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
          
          <div className="mt-6 border-t pt-4 flex flex-col items-center">
            <p className={`text-sm italic animate-slide-up ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} style={{ animationDelay: '0.6s' }}>
              {t.designedBy}
            </p>
            <h3 className={`text-xl font-bold mt-1 animate-float ${isDarkMode
                ? 'text-blue-300'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient-x'
              }`}>
              Ziad Hussein
            </h3>
            <div className="relative mt-2">
              <svg className="w-24 h-8 mx-auto animate-pulse-slow" viewBox="0 0 100 20">
                <path
                  d="M0,10 C30,20 70,0 100,10"
                  fill="none"
                  stroke={isDarkMode ? "#3B82F6" : "#8B5CF6"}
                  strokeWidth="2"
                />
              </svg>
              <p className={`text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage; 