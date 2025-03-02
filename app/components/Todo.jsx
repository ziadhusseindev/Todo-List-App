"use client"
import React, { useState, useEffect } from 'react';

const Todo = ({ isDarkMode }) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    // Simulate loading for animation effect
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = () => {
    if (editValue.trim() !== '') {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editValue } : todo
        )
      );
      setEditingId(null);
      setEditValue('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  if (isLoading) {
    return (
      <div className={`max-w-md mx-auto rounded-lg shadow-lg overflow-hidden md:max-w-2xl transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } p-8 flex justify-center items-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`max-w-md mx-auto rounded-lg shadow-lg overflow-hidden md:max-w-2xl transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } animate-fade-in`}>
      <div className="md:flex">
        <div className="w-full p-4">
          <div className="mb-4">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Tasks
            </h2>
          </div>

          <div className={`flex items-center border-b py-2 mb-4 ${
            isDarkMode ? 'border-gray-600' : 'border-gray-300'
          }`}>
            <input
              type="text"
              className={`appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none ${
                isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-700 placeholder-gray-500'
              }`}
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={addTodo}
            >
              Add
            </button>
          </div>

          <ul className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {filteredTodos.length === 0 ? (
              <li className={`py-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} animate-pulse-slow`}>
                {filter === 'all' 
                  ? 'No tasks yet. Add one above!' 
                  : filter === 'active' 
                    ? 'No active tasks!' 
                    : 'No completed tasks!'}
              </li>
            ) : (
              filteredTodos.map((todo, index) => (
                <li 
                  key={todo.id} 
                  className={`py-3 flex justify-between items-center transition-all duration-300 ${
                    todo.completed ? 'bg-opacity-50' : ''
                  } animate-slide-up`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {editingId === todo.id ? (
                    <div className="flex items-center flex-grow mr-2">
                      <input
                        type="text"
                        className={`appearance-none bg-transparent border border-blue-500 rounded w-full py-1 px-2 leading-tight focus:outline-none ${
                          isDarkMode ? 'text-white' : 'text-gray-700'
                        }`}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                      />
                      <div className="flex ml-2">
                        <button
                          onClick={saveEdit}
                          className="text-green-500 hover:text-green-700 transition-all duration-200 hover:scale-125 mr-1"
                          aria-label="Save edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-125"
                          aria-label="Cancel edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300"
                        />
                        <span
                          className={`ml-2 ${
                            isDarkMode 
                              ? todo.completed 
                                ? 'line-through text-gray-500' 
                                : 'text-gray-200'
                              : todo.completed 
                                ? 'line-through text-gray-400' 
                                : 'text-gray-900'
                          } transition-all duration-300`}
                        >
                          {todo.text}
                        </span>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => startEditing(todo.id, todo.text)}
                          className="ml-2 text-blue-500 hover:text-blue-700 transition-all duration-200 hover:scale-125"
                          aria-label="Edit todo"
                          disabled={todo.completed}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${todo.completed ? 'opacity-50 cursor-not-allowed' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="ml-2 text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-125"
                          aria-label="Delete todo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>

          {todos.length > 0 && (
            <div className={`flex flex-col sm:flex-row justify-between items-center mt-4 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            } animate-slide-up`} style={{ animationDelay: '0.2s' }}>
              <span className="mb-2 sm:mb-0">{activeTodosCount} item{activeTodosCount !== 1 ? 's' : ''} left</span>
              <div className="flex space-x-1 mb-2 sm:mb-0">
                <button
                  className={`px-2 py-1 rounded transition-all duration-200 hover:scale-105 ${
                    filter === 'all' 
                      ? isDarkMode 
                        ? 'bg-blue-900 text-blue-200' 
                        : 'bg-blue-100 text-blue-600'
                      : isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200' 
                        : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button
                  className={`px-2 py-1 rounded transition-all duration-200 hover:scale-105 ${
                    filter === 'active' 
                      ? isDarkMode 
                        ? 'bg-blue-900 text-blue-200' 
                        : 'bg-blue-100 text-blue-600'
                      : isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200' 
                        : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setFilter('active')}
                >
                  Active
                </button>
                <button
                  className={`px-2 py-1 rounded transition-all duration-200 hover:scale-105 ${
                    filter === 'completed' 
                      ? isDarkMode 
                        ? 'bg-blue-900 text-blue-200' 
                        : 'bg-blue-100 text-blue-600'
                      : isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200' 
                        : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>
              <button
                className={`${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-gray-200' 
                    : 'text-gray-500 hover:text-gray-700'
                } transition-all duration-200 hover:scale-105`}
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo; 