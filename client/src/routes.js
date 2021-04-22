import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {Loader} from "./components/Loader";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/loading" exact>
                    <Loader/>
                </Route>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage/>
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}