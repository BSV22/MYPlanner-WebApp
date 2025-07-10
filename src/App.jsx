import { useState, useEffect } from 'react'
import "tailwindcss";
import Navbar from './components/Navbar'; 
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { LuSaveAll } from "react-icons/lu";
import { v4 as uuidv4 } from 'uuid';
import './App.css'


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todosString= localStorage.getItem('todos')
    if(todosString){
     let todos = JSON.parse(todosString)
     setTodos(todos)
    }
  }, [])

  
  const SaveToLS = ()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  }

  const handleAdd = ()=>{
    if (!todo.trim()) return;
    setTodos([...todos,{id: uuidv4(), isCompleted: false,todo}])
    setTodo('')
    // SaveToLS()
  }

  const handleSave = ()=>{
    SaveToLS()
  }

  const handleEdit = (id)=>{
    let t = todos.filter(item=> item.id === id)
    setTodo(t[0].todo)
    let NewTodos= todos.filter(item=>item.id!==id
    )
    setTodos(NewTodos)
    // SaveToLS()
  }
  const handleDelete = (id)=>{
    let NewTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(NewTodos)
    // SaveToLS()
  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
    // SaveToLS()
  }

  const handleCheck = (e) => {
    let id = e.target.name
    let NewTodos=[...todos]
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    NewTodos[index].isCompleted = !NewTodos[index].isCompleted
    setTodos(NewTodos)
    // SaveToLS()
  }
  
  const toggleFinished = (e)=>{
    setshowFinished(!showFinished)
    // let Finishedtodos = todos.filter(i=>i.isCompleted===true)
    // showFinished? setTodos(Finishedtodos) : setTodos(todos)
  }

const visibleTodos = showFinished
  ? todos.filter((item) => item.isCompleted)
  : todos;

  return (
    <>
      <Navbar />
      <div className='bg-gray-800 container mx-auto my-5 py-5 px-5 text-amber-50 rounded-xl min-h-[80vh]'>
        <div className='addtodo '>
          <div className="head flex justify-between">
          <h4 className='text-2xl'>Add A Todo</h4>
          <button onClick={handleSave} className='bg-green-500 text-gray-900 rounded-xl py-1 px-3 font-bold cursor-pointer hover:bg-green-400'><LuSaveAll /></button>
          </div>
          <div className="action flex gap-8 py-3">
            <input type="text" onChange={handleChange} placeholder='Enter ToDo....' value={todo} className='bg-gray-500 px-3 py-1 text-black rounded-[5px] w-1/2' />
            <button onClick={handleAdd} className='bg-blue-900 text-amber-50 rounded-xl py-1 px-3 hover:bg-blue-800'>Add</button>
          </div>
          <div className='flex px-3 gap-3'>
            <input type="checkbox" onChange={toggleFinished} checked={showFinished} />Show Finished
          </div>
          <div className="todos">
            {visibleTodos.length===0 && <div className='m-5'> NO Todos to display</div>}
            {visibleTodos.map(item=>{

            return  <div key={item.id} className={item.isCompleted?'line-through todo flex items-center justify-between bg-gray-700 rounded-xl py-1 px-3 my-2':"todo flex items-center justify-between bg-gray-700 rounded-xl py-1 px-3 my-2 hover:bg-gray-600"}>
              <div className='flex gap-5'>
              <input name={item.id} type="checkbox" onChange={handleCheck} checked={item.isCompleted}/>
              <span >{item.todo}</span>
              </div>
              <ul className='flex gap-2.5'>
                <li><button onClick={()=>{handleEdit(item.id)}} className='bg-blue-950 text-amber-50 rounded-xl py-1 px-3 hover:bg-blue-900'><MdOutlineEdit /></button></li>
                <li><button onClick={()=>{handleDelete(item.id)}} className='bg-red-600 text-amber-50 rounded-xl py-1 px-3 hover:bg-red-500'><MdDeleteOutline /></button></li>
              </ul>
            </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
