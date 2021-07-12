import React, {useState} from "react";
import {BrowserRouter as Router} from "react-router-dom"
import {AuthContext} from './context/AuthContext'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import NavBar from "./components/NavBar";
import {Loader} from "./components/Loader";
import {Footer} from "./components/footer";


function Server() {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    const [theme, setTheme] = useState(localStorage.theme)

    if (!ready) {
        return <Loader/>
    }

    const darkMode = () => {
        if (localStorage.theme === 'dark'){
            setTheme("light")
            return localStorage.theme = 'light'
        }
        if (localStorage.theme === 'light'){
            setTheme("dark")
            return localStorage.theme = 'dark'
        }
        setTheme("dark")
        localStorage.theme = 'dark'
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                <div className={localStorage.theme}>
                    <NavBar darkMode={darkMode}/>
                    {routes}
                    <Footer/>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default Server;
