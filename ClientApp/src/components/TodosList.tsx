import type Todo from "../models/Todo";
import TodoItem from "./TodoItem";

export default function TodosList({ todos }: { todos: Todo[] }) {
    return (
        <div>
            <ul className="list-none p-0 grid grid-cols-3 gap-2">
                {todos.map((todo) => (
                    <TodoItem key={todo.id} {...todo} />
                ))}
            </ul>
        </div>
    );
}