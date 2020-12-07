import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://localhost:44374/api/';

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');

    const handleDescChange = (e) => {
        setDescription(e.target.value);
    };

    // Create
    const createToDo = () => {
        fetch(`${BASE_URL}todo`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                IsComplete: false,
                Description: description,
                Priority: 3,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                setDescription('');
                fetchTodos();
            })
            .catch((err) => {
                console.log(`An error has occured: ${err}`);
            });
    };

    // Update
    const updateToDo = (id, checked) => {
        fetch(`${BASE_URL}todo/MyEdit`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: id,
                IsComplete: checked,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                fetchTodos();
            })
            .catch((err) => {
                console.log(`An error has occured: ${err}`);
            });
    };

    // Delete
    const deleteToDo = (id) => {
        fetch(`${BASE_URL}todo/mydelete?Id=${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                fetchTodos();
            })
            .catch((err) => {
                console.log(`An error has occured: ${err}`);
            });
    };

    // Get
    const fetchTodos = () => {
        fetch(`${BASE_URL}todo`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                    'bearer-token'
                )}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTodos(data);
            })
            .catch((err) => {
                console.log(`An error has occured: ${err}`);
            });
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h1>To Do</h1>
            <input
                type="text"
                value={description}
                onChange={handleDescChange}
            />
            <button className="button" onClick={createToDo}>
                Create
            </button>
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Is Complete</th>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Created On</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    value={todo.isComplete}
                                    checked={todo.isComplete}
                                    onChange={(e) =>
                                        updateToDo(todo.id, e.target.checked)
                                    }
                                />
                            </td>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.priority}</td>
                            <td>{todo.createdOn}</td>
                            <td>
                                <button
                                    className="button is-danger"
                                    onClick={() => deleteToDo(todo.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
