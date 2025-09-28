import { Link } from "react-router";

export default function Navigation()
{
    const routes: { path: string, caption: string }[] = [
        {
            path: "/",
            caption: "Home"
        },
        {
            path: "/todos",
            caption: "Todos"
        }
    ];

  return (
    <nav className="bg-orange-400">
        <ul className="flex gap-4 p-4">
            {routes.map((route) => (
                <li key={route.path}>
                    <Link 
                        to={route.path}
                        className="text-white"
                    >
                        {route.caption}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
  )
}