import React, {useState, useEffect, useContext} from "react"
import {LockClosedIcon} from "@heroicons/react/solid";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, error, request} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    let [message, setMessage] = useState(null)

    function makeMessage(text) {
        setMessage(message = text)
    }


    useEffect(() => {
        makeMessage(error)
    }, [error])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    let history = useHistory()

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            history.push("/profile")
        } catch (e) {
        }
    }
    useEffect(() => {
        console.log("hey")
    }, [loginHandler])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ввойдите в свой аккаунт</h2>
                </div>
                <form className="mt-8 space-y-6">
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email адрес"
                                onChange={changeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Пароль"
                                onChange={changeHandler}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <p className="font-medium text-red-600">
                                {message}
                            </p>
                        </div>
                        <div className="text-sm">
                            <a href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Еще не зарегистрированы ?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={loginHandler}
                            disabled={loading}
                        >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
              </span>
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}