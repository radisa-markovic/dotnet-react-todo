import { useState } from "react"
import { useNavigate } from "react-router";

function Register()
{
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const onRegisterSubmit = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if(!response.ok)
            throw new Error("Something bad happened");

        alert("Uspesno napravljen nalog!");
        navigate("/users/login");
    }

    return (
        <section className="flex flex-col gap-2">
            <h1>Create an account</h1>
            <form 
                onSubmit={(event) => {
                    event.preventDefault();
                    onRegisterSubmit();
                }}
                className="mx-auto bg-gray-100 p-4"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        className="p-2 bg-white"
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="p-2 bg-white"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <div className="mt-2">
                    <button 
                        type="submit"
                        className="bg-orange-400 text-white p-2 rounded w-full"
                    >
                        Login
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Register