import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  
  const [task, settask] = useState("")
  const [todos, settodos] = useState([])

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("todos")
    if (stored) {
      try {
        settodos(JSON.parse(stored))
      } catch (err) {
        console.error("Invalid JSON in localStorage", err)
        settodos([])
      }
    }
  }, [])

  // Save todos to localStorage AFTER todos is properly loaded
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos])

  const handleChange = (e) => settask(e.target.value)

  const handleAdd = () => {
    if (task.trim() === "") return alert("Write something to add")
    settodos([...todos, { id: uuidv4(), task, isCompleted: false }])
    settask("")
  }

  const handleDelete = (e) => {
    if (confirm("Are you sure you want to delete?")) {
      const id = e.target.name
      settodos(todos.filter(todo => todo.id !== id))
    }
  }

  const handleEdit = (e) => {
    const id = e.target.name
    const item = todos.find(todo => todo.id === id)
    if (!item) return
    settask(item.task)
    settodos(todos.filter(todo => todo.id !== id))
  }

  const handleCheckBox = (e) => {
    const id = e.target.name
    settodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ))
  }
  return (
    <>
      <Navbar />
      <div className='md:container md:mx-auto md:w-[50vw] w-full max-h-[80vh] bg-[#0D0D0D] my-7 rounded-2xl overflow-auto'>
        <div className='heading p-3 text-2xl font-bold text-center'>
          <h1> Add a <span className='text-cyan-400'>To-Do</span></h1>
        </div>
        
        <div className='addtodo flex p-5'>
          <input 
            className='bg-transparent border border-gray-600 rounded-lg w-[80%] p-2 focus:outline-none focus:ring-1 focus:ring-cyan-400 mx-4 text-white placeholder-gray-400'
 
            value={task} 
            onChange={handleChange} 
            type="text" 
            autoFocus 
            placeholder='What needs to be done today?' 
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button 
            className="btn bg-cyan-700 hover:bg-cyan-800 cursor-pointer px-6 font-semibold rounded-full text-white" 
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div className='todos flex flex-col gap-4'>
          <h1 className='p-3 text-2xl font-bold mx-2 text-white'>Your Todos({todos.length})</h1>
          
          {todos.length === 0 ? (
            <div className='text-center text-gray-400 py-8 '>
              No todos yet. Add one above!
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="yourtasks flex justify-between w-full p-3 gap-4 items-center border-b border-white/20">
                <div className="flex gap-2 w-1/2 ">
                  <input 
                    type="checkbox" 
                    onChange={handleCheckBox} 
                    checked={todo.isCompleted} 
                    name={todo.id} 
                  />
                  <div className={`text-base rounded-lg p-1 text-white ${todo.isCompleted ? 'line-through text-gray-400' : ''}`}>
                    {todo.task}
                  </div>
                </div>

                <div className='button flex items-center gap-2'>
                  <button 
                    className="btn bg-cyan-700 hover:bg-cyan-800 cursor-pointer px-3 py-1 font-bold rounded-full text-white" 
                    onClick={handleEdit} 
                    name={todo.id}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn bg-red-600 hover:bg-red-700 cursor-pointer px-3 py-1 font-bold rounded-full text-white" 
                    onClick={handleDelete} 
                    name={todo.id}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className='p-4 '>
            <button 
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-medium "
              onClick={() => {
                if (confirm("Are you sure you want to clear all todos?")) {
                  settodos([])
                }
              }}
            >
              Clear All Todos
            </button>
          </div>
)}
      </div>
    </>
  )
}

export default App
