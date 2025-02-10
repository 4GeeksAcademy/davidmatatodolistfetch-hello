
import React, { useState, useEffect } from "react";

const Home = () => {
	const [input, setInput] = useState({ label: "", done: false });
	const [addTodo, setAddTodo] = useState([]);
	const [deleteTask, setdeleteTask] = useState(null);
	const [firstRender, setFirstRender] = useState(false);
	

	useEffect(() => {
		getList();
	}, []);

	useEffect(() => {
		if (firstRender) {
			updateList();
		}
	}, [addTodo]);

	const validateInputEnter = (e) => {
		const labels = addTodo.map((e) => e.label);
		const newInput = e.target.value.trim();
		console.log(e);
		if (e.key == "Enter") {
			if (newInput != "" && !labels.includes(newInput)) {
				setAddTodo([...addTodo, input]);
				e.target.value = "";
			} else {
				alert("No se pueden repetir tareas o introducir tareas vacias");
			}
		}
	};

	const validateInputClick = (e) => {
		const labels = addTodo.map((e) => e.label);
		const newInput = input.label.trim();
		console.log(e);

		if (e.type == "click") {
			if (newInput != "" && !labels.includes(newInput)) {
				setAddTodo([...addTodo, input]);
				e.target.value = "";
			} else {
				alert("No se pueden repetir tareas o introducir tareas vacias");
			}
		}
	};

	const getList = async () => {
		const Response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/davidcell97",
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const result = await Response.json();
		setAddTodo(result);
		setFirstRender(true);
	};

	const updateList = async () => {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/davidcell97",
			{
				method: "PUT", // or 'POST'
				body: JSON.stringify(addTodo), 
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	};

	return (
		<div className="container">
			<div className="mb-3 w-75 mx-auto">
				<label htmlFor="exampleInputEmail1" className="form-label">
					<h2 className="h2">To2</h2>
				</label>
				<div className="d-flex justify-content-start">
					<div className="w-75">
						{" "}
						<input
							type="text"
							className="form-control"
							value={input.label}
							onChange={(e) => {
								setInput({ ...input, label: e.target.value });
							}}
							onKeyDown={(e) => {
								validateInputEnter(e);
							}}
						/>
					</div>
					<div>
						{" "}
						<button
							type="button"
							className="btn btn-light"
							value={input.label}
							onClick={(e) => {
								validateInputClick(e);
							}}>
							Add
						</button>
					</div>
				</div>
				{addTodo.map((e, i) => {
					if (i != 0) {
						return (
							<div
								key={i}
								className="d-flex justify-content-between"
								onMouseEnter={() => setdeleteTask(i)}
								onMouseLeave={() => setdeleteTask(null)}>
								<div className="form-control">{e.label}</div>
								<div>
									{deleteTask == i && (
										<button
											type="button"
											className="btn-close text-end"
											aria-label="Close"
											onClick={() => {
												setAddTodo(
													addTodo.filter(
														(v, index) =>
															index !== i
													)
												);
												
											}}></button>
									)}
								</div>
							</div>
						);
					}
				})}
				<div>
					{" "}
					<p className="h6">
						{" "}
						{addTodo.length > 1
							? addTodo.length - 1 + " items left"
							: "add something to-do"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;

