import React, { useState, useEffect } from 'react';

function App() {
  // 1. Local Storage 
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('my_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { text: 'Finish HTML/CSS Roadmaps 💻', isCompleted: false },
      { text: 'Prepare for Java Exam 📚', isCompleted: false },
      { text: 'Increase Green Squares on GitHub 🟩', isCompleted: false }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // 🌙 Dark Mode (Default: false)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Tasks  Local Storage Update 
  useEffect(() => {
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  //add task
  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { text: inputValue, isCompleted: false }]);
      setInputValue('');
    }
  };

  // delete Logic එක
  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  //  Done/Pending 
  const handleToggleComplete = (indexToToggle) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === indexToToggle) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Search  Tasks Filter  Logic එක
  const filteredTasks = tasks.filter(task => 
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  Dashboard 
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const remainingTasks = totalTasks - completedTasks;

  return (
    //  div  Dark Mode  Background 
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      // Condition ? True  : False 
      background: isDarkMode ? '#1e1e2f' : 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)', 
      transition: 'all 0.5s ease' 
    }}>
      
      {/*  (Main Card Container) */}
      <div style={{ 
        background: isDarkMode ? 'rgba(30, 30, 40, 0.95)' : 'rgba(255, 255, 255, 0.85)', 
        color: isDarkMode ? '#fff' : '#333', // Dark mode 
        padding: '30px', 
        borderRadius: '15px', 
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(5px)',
        width: '400px',
        textAlign: 'center',
        transition: 'all 0.5s ease'
      }}>
        
        
        <h1 style={{ color: isDarkMode ? '#fff' : '#333', marginBottom: '20px' }}>My Coding Goals 🎯</h1>
        
        {/*  Dashboard UI Panel  */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          background: isDarkMode ? '#2a2a3a' : '#f8f9fa', // Dark mode 
          padding: '12px', 
          borderRadius: '10px', 
          marginTop: '20px',
          marginBottom: '25px',
          boxShadow: isDarkMode ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'inset 0 2px 4px rgba(0,0,0,0.05)',
          transition: 'all 0.5s ease'
        }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: isDarkMode ? '#fff' : '#333' }}>{totalTasks}</div>
            <div style={{ fontSize: '12px', color: isDarkMode ? '#bbb' : '#666' }}>Total</div>
          </div>
          
          <div style={{ borderRight: isDarkMode ? '1px solid #444' : '1px solid #ddd' }}></div>

          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2ed573' }}>{completedTasks}</div>
            <div style={{ fontSize: '12px', color: isDarkMode ? '#bbb' : '#666' }}>Done</div>
          </div>
          
          <div style={{ borderRight: isDarkMode ? '1px solid #444' : '1px solid #ddd' }}></div>

          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff4d4d' }}>{remainingTasks}</div>
            <div style={{ fontSize: '12px', color: isDarkMode ? '#bbb' : '#666' }}>Pending</div>
          </div>
        </div>

        {/* 🌙/☀️ Theme Toggle Button */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            style={{
              padding: '8px 15px',
              cursor: 'pointer',
              borderRadius: '20px',
              border: 'none',
              background: isDarkMode ? '#fff' : '#333',
              color: isDarkMode ? '#333' : '#fff',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* 🔍 Search Input Box එක */}
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              padding: '12px', 
              width: '93%', 
              borderRadius: '8px', 
              border: '1px solid #ccc', 
              fontSize: '15px',
              background: isDarkMode ? '#2a2a3a' : '#fff', // Dark Mode Input Box 
              color: isDarkMode ? '#fff' : '#000',
              transition: 'all 0.5s ease'
            }}
          />
        </div>

        {/*  Add Task Input, Button එක */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Enter your new work....." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} 
            style={{ 
              padding: '12px', 
              width: '230px', 
              marginRight: '10px', 
              borderRadius: '5px', 
              border: '1px solid #ccc',
              background: isDarkMode ? '#2a2a3a' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              transition: 'all 0.5s ease'
            }}
          />
          <button onClick={handleAddTask} style={{ padding: '12px 20px', cursor: 'pointer', background: '#23a6d5', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            Add
          </button>
        </div>

        {/*  Tasks  (List) */}
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
          {filteredTasks.map((task, index) => (
            <li key={index} style={{ 
              background: isDarkMode ? '#2a2a3a' : 'white', // List Items  Dark Mode 
              margin: '12px auto', 
              padding: '12px', 
              borderRadius: '8px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              transition: 'all 0.5s ease'
            }}>
              
              <span 
                onClick={() => handleToggleComplete(index)} 
                style={{
                  cursor: 'pointer',
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                  color: task.isCompleted ? 'gray' : (isDarkMode ? '#fff' : 'black'),
                  textAlign: 'left',
                  flex: 1
                }}
              >
                {task.isCompleted ? '⬛ ' : '✅ '} {task.text}
              </span>
              
              <button 
                onClick={() => handleDeleteTask(index)} 
                style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
              >
                X
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;