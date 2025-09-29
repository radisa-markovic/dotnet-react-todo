import { useFetcher, type ActionFunctionArgs } from "react-router";

import type Todo from "../models/Todo";
import { Link } from "react-router";

const IS_COMPLETED_KEY_NAME = "isCompleted";

function TodoItem(todo : Todo)
{
    const fetcher = useFetcher();

    return (
        <li
            className="border p-4 mb-4 rounded-lg shadow-md"
        >
            <h3 className="text-xl font-bold mb-2">
                {todo.title}
            </h3>
            <time>Created At: {todo.createdAt.toString()}</time>
            {
                todo.completedAt && <time>Completed At: {todo.completedAt.toString()}</time>
            }
            <p>{todo.description}</p>
            <p>Status: {todo.isCompleted ? "Completed" : "Pending"}</p>
            <fetcher.Form
                method="patch"
                action={`/todos`}
            >
                <input type="hidden" name="todoId" value={todo.id} />
            {
                todo.isCompleted ? (
                    <>
                        <input 
                            type="hidden" 
                            name={IS_COMPLETED_KEY_NAME} 
                            value="false"    
                        />
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Mark as Incomplete
                        </button>
                    </>
                ) : (
                    <>
                        <input 
                            type="hidden" 
                            name={IS_COMPLETED_KEY_NAME} 
                            value="true"
                        />
                        <button 
                            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Mark as Complete
                        </button>
                    </>
                )
            }
            </fetcher.Form>
            <fetcher.Form
                method="delete"
                action={`/todos/${todo.id}`}
            >
                <button 
                    className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                >
                    Delete
                </button>
            </fetcher.Form>
            <Link 
                to={`/todos/edit/${todo.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
                Edit
            </Link>
        </li>
  )
}

export async function toggleTodoCompletion({ request } : ActionFunctionArgs)
{
    const formData = await request.formData();
    const todoId = +formData.get("todoId")!;
    const isCompleted = Boolean(formData.get(IS_COMPLETED_KEY_NAME) === "true");

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos/${todoId}/complete`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ isCompleted })
    });

}

export async function deleteTodo({ params } : ActionFunctionArgs)
{
    const todoId = +params.todoId!;
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos/${todoId}`, {
        method: "DELETE"
    });
}

export default TodoItem