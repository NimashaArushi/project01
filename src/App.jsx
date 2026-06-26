import React, { useState, useEffect } from 'react';

function App() {
  // 1. Local Storage with updated initial tasks containing categories
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('my_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { text: 'Finish HTML/CSS Roadmaps 💻', isCompleted: false, date: 'No Date', category: 'WebDev' },
      { text: 'Prepare for Java Exam 📚', isCompleted: false, date: 'No Date', category: 'University' },
      { text: 'Increase Green Squares on GitHub 🟩', isCompleted: false, date: 'No Date', category: 'Personal' }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [taskCategory, setTaskCategory] = useState('Personal'); 
  const [selectedFilter, setSelectedFilter] = useState('All'); 
  
  // Fixed State Typos here
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Tasks Local Storage Update 
  useEffect(() => {
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Add task logic
  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { 
        text: inputValue, 
        isCompleted: false,
        date: taskDate ? taskDate : 'No Date',
        category: taskCategory // Save the selected category tag
      }]);
      setInputValue('');
      setTaskDate('');
    }
  };

  // Delete Logic 
  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  // Done/Pending 
  const handleToggleComplete = (indexToToggle) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === indexToToggle) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Filter Logic (Combines both Search and Category Tabs)
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedFilter === 'All' || task.category === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  // Dashboard calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const remainingTasks = totalTasks - completedTasks;

  // clear all
  const handleClearAll = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all task ?");
    if (confirmDelete) {
      setTasks([]);
    }
  };

  // Fixed Typos inside Edit Handlers
  const handleEditClick = (index, currentText) => {
    setEditingIndex(index);
    setEditValue(currentText);
  };

  const handleSaveEdit = (indexToSave) => {
    if (editValue.trim() !== '') {
      const updatedTasks = tasks.map((task, index) => {
        if (index === indexToSave) {
          return { ...task, text: editValue };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditingIndex(null); 
      setEditValue('');
    }
  };

  return (

// Main background div
<div style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  minHeight: '100vh',
  

  background: isDarkMode  
    ? "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH9IkEbAJ4FOPuGM22R_PPhXkrQ8_U7YnwAdpLVb2CakppHkdcBTVV9nCd&s=10') center / cover no-repeat" 
    : "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbQjkC6ZIh7ZBjmiescDWvWy9TiQLWEKsR547jbEiI0ogBR2NOMrDcFdxB&s=10') center / cover no-repeat",
  
  transition: 'all 0.5s ease', 
}}>
      
      {/* Main Card Container */}
      <div style={{ 
        background: isDarkMode ? 'rgba(30, 30, 40, 0.95)' : 'rgba(255, 255, 255, 0.85)', 
        color: isDarkMode ? '#fff' : '#333', 
        padding: '30px', 
        borderRadius: '15px', 
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(5px)',
        width: '400px',
        textAlign: 'center',
        transition: 'all 0.5s ease'
      }}>
        
        <h1 style={{ color: isDarkMode ? '#fff' : '#333', marginBottom: '20px' }}>My Coding Goals 🎯</h1>
        
        {/* Dashboard UI Panel */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          background: isDarkMode ? '#2a2a3a' : '#f8f9fa', 
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

        {/* Theme Toggle Button */}
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

          <button
            onClick={handleClearAll}
            style={{
              padding:'8px 15px',
              cursor:'pointer',
              borderRadius:'20px',
              border:'none',
              background:'#ff4d4d',
              color:'white',
              marginLeft: '10px',
              fontWeight:'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            🗑️ Clear All
          </button>
        </div>

        {/* Search Input Box */}
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
              background: isDarkMode ? '#2a2a3a' : '#fff', 
              color: isDarkMode ? '#fff' : '#000',
              transition: 'all 0.5s ease'
            }}
          />
        </div>

        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '20px' }}>
          {['All', 'University', 'WebDev', 'Personal'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              style={{
                padding: '6px 12px',
                cursor: 'pointer',
                borderRadius: '15px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 'bold',
                background: selectedFilter === category ? '#23a6d5' : (isDarkMode ? '#2a2a3a' : '#e0e0e0'),
                color: selectedFilter === category ? 'white' : (isDarkMode ? '#fff' : '#333'),
                transition: 'all 0.3s ease'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Add Task Input, Dropdown, Date and Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Enter your new work....." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} 
            style={{ 
              padding: '12px', 
              width: '93%', 
              borderRadius: '5px', 
              border: '1px solid #ccc',
              background: isDarkMode ? '#2a2a3a' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              transition: 'all 0.5s ease'
            }}
          />
          
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0 10px', gap: '5px' }}>
            <select
              value={taskCategory}
              onChange={(e) => setTaskCategory(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                background: isDarkMode ? '#2a2a3a' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                cursor: 'pointer'
              }}
            >
              <option value="Personal">🔑 Personal</option>
              <option value="University">🎓 University</option>
              <option value="WebDev">💻 WebDev</option>
            </select>

            <input
              type="date"
              value={taskDate} 
              onChange={(e) => setTaskDate(e.target.value)}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                background: isDarkMode ? '#2a2a3a' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                cursor: 'pointer'
              }}
            />
            <button onClick={handleAddTask} style={{ padding: '10px 20px', cursor: 'pointer', background: '#23a6d5', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
              Add
            </button>
          </div>
        </div>

        {/* Tasks (List) */}
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
          {filteredTasks.map((task, index) => (
            <li key={index} style={{ 
              background: isDarkMode ? '#2a2a3a' : 'white', 
              margin: '12px auto', 
              padding: '12px', 
              borderRadius: '8px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              transition: 'all 0.5s ease'
            }}>
              
              {editingIndex === index ? (
                <div style={{ display: 'flex', flex: 1, gap: '10px', marginRight: '10px' }}>
                  <input 
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      borderRadius: '5px',
                      border: '1px solid #23a6d5',
                      background: isDarkMode ? '#1e1e28' : '#fff',
                      color: isDarkMode ? '#fff' : '#000'
                    }}
                  />
                  <button 
                    onClick={() => handleSaveEdit(index)}
                    style={{ background: '#2ed573', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => handleToggleComplete(index)} 
                  style={{
                    cursor: 'pointer',
                    textAlign: 'left',
                    flex: 1
                  }}
                >
                  <span style={{
                    textDecoration: task.isCompleted ? 'line-through' : 'none',
                    color: task.isCompleted ? 'gray' : (isDarkMode ? '#fff' : 'black'),
                    display: 'block'
                  }}>
                    {task.isCompleted ? '⬛ ' : '✅ '} {task.text}
                  </span>
                  
                  <span style={{ fontSize: '11px', color: '#888', marginLeft: '25px', display: 'block', marginTop: '4px' }}>
                    📅 Due: {task.date} | <span style={{ color: '#23a6d5', fontWeight: 'bold' }}>#{task.category}</span>
                  </span>
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '5px' }}>
                {editingIndex !== index && (
                  <button 
                    onClick={() => handleEditClick(index, task.text)} 
                    style={{ background: '#fafafa', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    ✏️
                  </button>
                )}
                
                <button 
                  onClick={() => handleDeleteTask(index)} 
                  style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                >
                  X
                </button>
              </div>

            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;