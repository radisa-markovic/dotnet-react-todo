import { useLoaderData } from "react-router";
import TodoForm from "../components/TodoForm"
import type Todo from "../models/Todo";

function EditTodo()
{
    const todo = useLoaderData() as Todo;

    console.log(todo);

    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
            <TodoForm todo={todo}/>
        </section>
    )
}

export async function loadTodo({ params  } : any )
{
    const todoId = +params.todoId!;
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos/${todoId}`);
    if (!response.ok)
    {
        throw new Error("Failed to fetch todo");
    }
    const todo: Todo = await response.json();
    return todo;
}

export async function editTodo({ request, params } : any)
{
    const todoId = +params.todoId!;
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const isCompleted = Boolean(formData.get("isCompleted") === "true");

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos/${todoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, isCompleted })
    });
    if (!response.ok)
    {
        throw new Error("Failed to update todo");
    }
    return null;
}

export default EditTodo