import { createBrowserRouter } from 'react-router';

import Home from './pages/Home';
import Todos, { todosLoader } from './pages/Todos';
import NotFound from './pages/NotFound';
import Root from './layouts/Root';
import NewTodo from './pages/NewTodo';
import { ErrorBoundary } from './components/ErrorBoundary';
import { deleteTodo, toggleTodoCompletion } from './components/TodoItem';
import EditTodo, { editTodo, loadTodo } from './pages/EditTodo';
import { createTodo } from './components/TodoForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary/>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "todos",
        element: <Todos />,
        loader: todosLoader,
        action: toggleTodoCompletion,
        children: [
          {
            path: ":todoId",
            action: deleteTodo
          },
        ]
      },
      {
        path: "todos/edit/:todoId",
        element: <EditTodo />,
        loader: loadTodo,
        action: editTodo
      },
      {
        path: "todos/new",
        element: <NewTodo />,
        action: createTodo
      }
    ]
  },  
  {
    path: "*",
    element: <NotFound /> 
  }
]);

export default router;