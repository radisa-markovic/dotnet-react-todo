import { createBrowserRouter } from 'react-router';

import Home from './pages/Home';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';
import Root from './layouts/Root';
import NewTodo from './pages/NewTodo';
import { ErrorBoundary } from './components/ErrorBoundary';
import { deleteTodo, toggleTodoCompletion } from './components/TodoItem';
import EditTodo, { editTodo, loadTodo } from './pages/EditTodo';
import Login, { loginAction } from './pages/Login';
import Register from './pages/Register';

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
        element: <NewTodo />
      },
      {
        path: "/users/login",
        element: <Login />,
        action: loginAction
      },
      {
        path: "/users/register",
        element: <Register />
      }
    ]
  },  
  {
    path: "*",
    element: <NotFound /> 
  }
]);

export default router;