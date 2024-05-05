import React, { useEffect, useState } from 'react';
import Todo from '../components/Todo'

const TodosList = ({ userId }) => {
  const [todos, setTodos] = useState();
  const [filteredTodos, setFilteredTodos] = useState();
  const [newTask, setNewTask] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [sortCriteria, setSortCriteria] = useState('sequential');
  const [indexUpdateTask, setIndexUpdateTask] = useState(-1);
  let massege;


  useEffect(() => {
    const url = `http://localhost:3000/todos?userId=${userId}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setTodos(data);
      })
  }, []);

  useEffect(() => {
    switch (sortCriteria) {
      case "sequential":
        setFilteredTodos(todos);
        break;
      case "performance":
        const completed = [];
        const unCompleted = [];
        todos.map(todo => {
          if (todo.completed == true) {
            completed.push(todo);
          } else {
            unCompleted.push(todo);
          }
        });
        setFilteredTodos([...completed, ...unCompleted]);
        break;
      case "alphabetical":
        setFilteredTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case "random":
        setFilteredTodos([...todos].sort(() => Math.random() - 0.5));
        break;
      default:
        break;
    }
  }, [sortCriteria, todos])

  const addTodo = () => {
    const newTodo = {
      userId: userId,
      title: newTask,
      completed: false
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo),
    };
    const url = 'http://localhost:3000/todos';
    fetch(url, requestOptions)
      .then(res => res.json())
      .then(data => {
        setTodos([...todos, data]);
        setIsAddingTask(false);
        setNewTask('');
      })
  };

  if (!filteredTodos) {
    return <h1>loading...</h1>
  }
  if (filteredTodos.length === 0) {
    massege = <h1>No todos found.</h1>
  }
  return (
    <div className='todo'>
      {massege}
      <h2>Todos</h2>
      <button className='addItem' onClick={() => setIsAddingTask(!isAddingTask)}>➕</button>
      {isAddingTask && (
        <div>
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter title of task" className='inputItem' />
          <button onClick={addTodo}>Add Task</button>
        </div>
      )}
      <div>
        <label className='input' >Sort by:</label>
        <select className='inputItem' id="sortSelect" value={sortCriteria} onChange={(event) => { setSortCriteria(event.target.value); }}>
          <option value="sequential">לפי הסדר</option>
          <option value="performance">בוצע</option>
          <option value="alphabetical">אלפביתי</option>
          <option value="random">רנדומלי</option>
        </select>
        <label className='input'>Search:</label>
        <input className='inputItem' type="text" value={searchCriteria} placeholder="Search by title or number" onChange={(event) => setSearchCriteria(event.target.value)} />
        {filteredTodos != null ?
          filteredTodos.map((todo, index) => (
            <div key={index}>
              <Todo todo={todo} todos={todos} searchCriteria={searchCriteria} sortCriteria={sortCriteria} setTodos={setTodos} indexUpdateTask={indexUpdateTask} setIndexUpdateTask={setIndexUpdateTask} setFilteredTodos={setFilteredTodos} />
            </div>
          )) : <div></div>}
      </div>
    </div>
  )
}

export default TodosList