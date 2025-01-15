
import Form from "./form";

//include images into your bundle
import React, { useState } from 'react';


//create your first component
const Home = () => {
	const [todos, setTodos] = useState([
		{ done: false, title: 'Study software develop', id: Math.random() * 10 },
		{ done: false, title: 'do the homework from the academy', id: Math.random() * 10 },
		{ done: false, title: 'do any kinf of sport', id: Math.random() * 10 },
		{ done: false, title: 'Walk the dog', id: Math.random() * 10 }
	  ]);

	  const [taskInput, setTaskInput] = useState('');

  	const handleFormSubmit = (e) => {
    	e.preventDefault();
    	setTodos([
     	 ...todos,
      	{ title: taskInput, done: false, id: Math.random() * 10 }
    	]);
    	setTaskInput('');
  	};

	const deleteTask = (taskId) => {
		setTodos(todos.filter(task => task.id !== taskId));
	};

	const tasksToRender = todos.map(task => (
		<li key={task.id}>
		<div className="view">
			<label>{task.title}</label>
			<button className="destroy" onClick={() => deleteTask(task.id)}></button>
		</div>
		</li>
  		));

	return (
		<div className="text-center">
				<h1 className="text-center mt-5"></h1>
				<section className="todoapp">
			<header className="header">
				<h1>todos</h1>
				<form onSubmit={handleFormSubmit}>
				<input
					autoFocus={true}
					className="new-todo"
					placeholder="What needs to be done?"
					value={taskInput}
					onChange={(e) => setTaskInput(e.target.value)}
				/>
				</form>
			</header>
			<section className="main">
				<ul className="todo-list">
				{tasksToRender}
				</ul>
			</section>
			<footer className="footer">
				<span className="todo-count">
				<strong>{todos.filter(task => !task.done).length}</strong> item left
				</span>
			</footer>
			</section>
		</div>
	);
};

export default Home;
