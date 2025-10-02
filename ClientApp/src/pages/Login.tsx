import { Form, Navigate, useActionData } from "react-router"
import { useAuth } from "../contexts/AuthContext"

function Login()
{
    const { accessToken, login } = useAuth();

    const loginOutcome = useActionData() as { token: string } | undefined;

    if (loginOutcome && loginOutcome.token) {
        login(loginOutcome.token);
    }
    
    return (
        accessToken
            ? 
                <Navigate to="/todos" replace={true} /> 
            :
            <section className="flex flex-col">
                <h1>Login Page</h1>
                <Form 
                    method="post"
                    className="mx-auto flex flex-col gap-4 max-w-sm p-4 bg-gray-100"
                    action="/users/login"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            className="bg-white px-1 py-2"
                            required 
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            className="bg-white px-1 py-2" 
                            required 
                        />
                    </div>
                    <button 
                        type="submit"
                        className="bg-orange-400 text-white p-2 rounded"
                    >
                        Login
                    </button>
                </Form>
            </section>
    )
}

export async function loginAction({ request }: { request: Request })
{
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data = await response.json() as { token: string };

    return { token: data.token };
}

export default Login