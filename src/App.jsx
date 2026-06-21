import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    {text:'Finish HTML/CSS Roadmaps 💻',isCompleted:false},
    {text:'Prepare for Java Exam 📚',isCompleted:false},
    {text:'Increase Green Squares on GitHub 🟩',isCompleted:false}
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, {text: inputValue, isCompleted: false}]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };


const handleToggleComplete=(indexToToggle)=>{
const updatedTasks=tasks.map((task,index)=>{
if(index===indexToToggle){
  return{...task,isCompleted:!task.isCompleted};
}
return task;
});
setTasks(updatedTasks);
}


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
      <span 
  onClick={() => handleToggleComplete(index)} 
  style={{
    cursor: 'pointer',
    textDecoration: task.isCompleted ? 'line-through' : 'none',
    color: task.isCompleted ? 'gray' : 'black'
  }}
>
  {task.isCompleted ? '⬛ ' : '✅ '} {task.text}
</span>


            <button 
              onClick={() => handleDeleteTask(index)} 
              style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;