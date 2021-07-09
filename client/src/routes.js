import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {MainPage} from "./pages/MainPage";
import {SignUp} from "./pages/SignUpPage";
import {About} from "./pages/AboutUs"
import {ProfilePage} from "./pages/ProfilePage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage/>
                </Route>
                <Route path="/about" exact>
                    <About/>
                </Route>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/sign-in" exact>
                <AuthPage/>
            </Route>
            <Route path="/sign-up" exact>
                <SignUp/>
            </Route>
            <Route path="/" exact>
                <MainPage/>
            </Route>
        </Switch>
    )
}