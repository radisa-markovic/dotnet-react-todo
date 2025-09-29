import { Form, type ClientActionFunctionArgs } from "react-router";
import type Todo from "../models/Todo";

const TITLE_KEY_NAME = "title";
const DESCRIPTION_KEY_NAME = "description";
const DUE_DATE_KEY_NAME = "dueDate";

interface TodoFormProps
{
    todo? : Todo
}

function TodoForm({ todo }: TodoFormProps)
{
    return (
        <Form 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            method="post"
            action={todo ? `/todos/edit/${todo.id}` : "/todos/new"}
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
        </Form>
    );
}

export async function createTodo({ request } : any)
{
    const formData = await request.formData();
    const title = formData.get(TITLE_KEY_NAME) as string;
    const description = formData.get(DESCRIPTION_KEY_NAME) as string;

    const todo: Partial<Todo> = { 
        title, 
        description,  
    };

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    await fetch(`${baseUrl}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
}

export default TodoForm