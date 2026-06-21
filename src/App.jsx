import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    'Finish HTML/CSS Roadmaps 💻',
    'Prepare for Java Exam 📚',
    'Increase Green Squares on GitHub 🟩'
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>My Coding Goals 🎯</h1>
      
  
      <input 
        type="text" 
        placeholder="Enter your new work....." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
        style={{ padding: '10px', width: '250px', marginRight: '10px' }}
      />
      
 
      <button onClick={handleAddTask} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Add Task
      </button>

   
      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ background: '#f4f4f4', margin: '10px auto', padding: '10px', width: '350px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>✅ {task}</span>
            <button 
              onClick={() => handleDeleteTask(index)} 
              style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;