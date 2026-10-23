
import { useState } from "react";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState("");

    // 할 일 추가
    const handleSubmit = (event) => {
        event.preventDefault();

        if (todoValue.trim() === "") return;

        setTodoList((prevTodoList) => [
            ...prevTodoList,
            {
                id: Date.now(),
                text: todoValue.trim(),
                completed: false
            }
        ]);

        setTodoValue("");
    };

    // 완료 / 미완료 상태 변경
    const toggleTodo = (id) => {
        setTodoList((prevTodoList) =>
            prevTodoList.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    return (
        <>
            <h1>My ToDo ({todoList.length})</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Write your to do..."
                    value={todoValue}
                    onChange={(event) => {
                        setTodoValue(event.target.value);
                    }}
                />

                <button type="submit">Add To Do</button>
            </form>

            <hr />

            <ul>
                {todoList.map((todo) => (
                    <li key={todo.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />

                            <span
                                style={{
                                    textDecoration: todo.completed
                                        ? "line-through"
                                        : "none"
                                }}
                            >
                                {todo.text}
                            </span>

                            {todo.completed ? " (완료)" : " (미완료)"}
                        </label>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default App;
