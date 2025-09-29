import { useLoaderData } from "react-router";
import TodosList from "../components/TodosList";

export default function Todos()
{
  const { todos } = useLoaderData();

  return (
    <section>
      <h1 className="text-3xl text-black mb-2">Todos</h1>
      { 
        todos.length === 0 
        ? (<p className="text-gray-600">
          No todos found. Create a new todo to get started!
          </p>
        ) 
        : <TodosList todos={todos} />
      }
    </section>
  )
}

export async function todosLoader()
{
  const todosResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const todos = await todosResponse.json();
  return { todos };
}
