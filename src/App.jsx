import React, { useState,useEffect} from 'react';

function App() {
  const [tasks, setTasks] = useState(()=>{
    const savedTasks=localStorage.getItem('my_tasks');
    return savedTasks?JSON.parse(savedTasks):[
    {text:'Finish HTML/CSS Roadmaps 💻',isCompleted:false},
    {text:'Prepare for Java Exam 📚',isCompleted:false},
    {text:'Increase Green Squares on GitHub 🟩',isCompleted:false}
  ];
  });



  const [inputValue, setInputValue] = useState('');




  useEffect(()=>{localStorage.setItem('my_tasks',JSON.stringify(tasks));},[tasks]);
  
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






//search functionality
  const[searchTerm,setsearchTerm]=useState('');
  const filteredTasks=tasks.filter(task=>task.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      
      
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.85)', 
        padding: '30px', 
        borderRadius: '15px', 
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        width: '400px',
        textAlign: 'center'
      }}>
        
        <h1 style={{ color: '#333', marginBottom: '20px' }}>My Coding Goals 🎯</h1>
        
        <input 
          type="text" 
          placeholder="Enter your new work....." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
          style={{ padding: '12px', width: '230px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        


       <div style={{ marginBottom: '20px' }}>
          <input 
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '12px', width: '93%',marginTop: '15px', 
               borderRadius: '8px', border: '1px solid #ccc', fontSize: '15px' }}
          />
        </div>


        <button onClick={handleAddTask} style={{ padding: '12px 20px', cursor: 'pointer', background: '#23a6d5', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Add
        </button>

        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
          {filteredTasks.map((task, index) => (
            <li key={index} style={{ background: 'white', margin: '12px auto', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              
              <span 
                onClick={() => handleToggleComplete(index)} 
                style={{
                  cursor: 'pointer',
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                  color: task.isCompleted ? 'gray' : 'black',
                  fontWeight: '5px',
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