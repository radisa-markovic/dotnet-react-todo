import {  NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

interface RouteInterface
{
    path: string;
    caption: string;
}

export default function Navigation()
{
    const { accessToken, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();          
        navigate("/login", { replace: true }); 
    }

    const guestRoutes: RouteInterface[] = [
        {
            path: "/",
            caption: "Home"
        },
        {
            path: "/users/login",
            caption: "Login"
        },
        {
            path: "/users/register",
            caption: "Register"
        }
    ];

    const routesForLoggedInUsers: RouteInterface[] = [
        {
            path: "/todos",
            caption: "Todos"
        },
        {
            path: "/todos/new",
            caption: "New Todo"
        },
    ];

  return (
    <nav className="bg-orange-400">
        <ul className="flex gap-4 p-4">
            {
                !accessToken 
                ? guestRoutes.map((route) => (
                    <li key={route.path}>
                        <NavLink 
                            to={route.path}
                            className={({ isActive }) =>
                                isActive ? "text-black" : "text-white"
                            }
                        >
                            {route.caption}
                        </NavLink>
                    </li>
                )) 
                : (
                    <>
                        {
                            routesForLoggedInUsers.map((route) => (
                            <li key={route.path}>
                                <NavLink 
                                    to={route.path}
                                    className={({isActive}) => 
                                        isActive? "text-black" : 'text-white'
                                    }
                                >
                                    {route.caption}
                                </NavLink>
                            </li>
                            ))
                        }
                        <li>
                            <button 
                                onClick={() => onLogout()}
                                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition"    
                            >
                                Logout
                            </button>
                        </li>
                    </>
                )
            }            
        </ul>
    </nav>
  )
}