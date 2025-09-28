import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import Home from './pages/Home';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';
import Root from './layouts/Root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "todos",
        element: <Todos />
      },
    ]
  },  
  {
    path: "*",
    element: <NotFound /> 
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
