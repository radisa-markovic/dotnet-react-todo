import { useFetcher } from "react-router";
import type Todo from "../models/Todo";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const TITLE_KEY_NAME = "title";
const DESCRIPTION_KEY_NAME = "description";
const DUE_DATE_KEY_NAME = "dueDate";

interface TodoFormProps
{
    todo? : Todo
}

function TodoForm({ todo }: TodoFormProps)
{
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { accessToken } = useAuth();

    async function onCreateTodo(event: any)
    {
        event.preventDefault();
        const todo: Partial<Todo> = { 
            title, 
            description,  
        };

        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(`${baseUrl}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(todo),
        });

        const data = await response.json();
        console.log(data);
    }
    
    return (
        <form 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            method="post"
            onSubmit={(event) => onCreateTodo(event)}
        >
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Enter todo title"
                    name={TITLE_KEY_NAME}
                    defaultValue={todo?.title ?? ""}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Enter description"
                    name={DESCRIPTION_KEY_NAME}
                    rows={3}
                    onChange={(event) => setDescription(event.target.value)}
                >{ todo && todo.description }</textarea>
            </div>
           <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    { todo? "Edit" : "Add" } Todo
                </button>
            </div>
        </form>
    );
}

export default TodoForm