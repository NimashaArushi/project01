import React,{useState}from 'react';

function App() {
  const[tasks,settasks]=useState(['Finish HTML/CSS Roadmaps 💻',
'Prepare for Java Exam 📚',
'Increase Green Squares on GitHub 🟩'])
  const [inputValue, setInputValue] = useState('');
  
const handleAddTask=()=>{
if(inputValue.trim()!==''){
  setInputValue('');
}

};







  return(
    <div style={{textAlign:'center',marginTop:'50px',fontFamily:'Arial'}}>
    <h1>My Coding Goals</h1>
     <input 
     type="text"
     placeholder='Enter your new work.....'
     value={inputValue}
     onChange={(e)=>setInputValue(e.target.value)}
     style={{padding:'10px',width:'250px',marginRight:'10px'}}
     />
  
  

  {
    <button onClick={handleAddTask}style={{padding:'10px 20px',cursor:'pointer'}}>Add Task</button>
  }
  


  {
   <ul style={{listStyleType:'none',padding:0,margingTop:'20px'}}>
    {tasks.map((task,index)=>(
      <li key={index} style={{ background: '#f4f4f4', margin: '10px auto', padding: '10px', width: '350px', borderRadius: '5px', textAlign: 'left' }}> {task}</li>
       

        ))}
   </ul>

  }
  </div>
  );





}

export default App;