import TodosList from "../components/TodosList";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export default function Todos()
{
  const { accessToken } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    async function loadTodos()
    {
      const todosResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      return await todosResponse.json();
    }
    
    loadTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

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
