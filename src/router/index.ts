import React from "react";
import Login from "../pages/Login";
import Event from "../pages/Event";
import NotFound from "../components/NotFound";

interface IRoute {
    path: string,
    component: React.ComponentType,
}

export enum RouteNames {
    LOGIN='/login',
    EVENT='/',
    NOTFOUND='*'
}

export const publicRoutes:IRoute[] = [
    {
        path: RouteNames.LOGIN,
        component: Login
    }
]

export const privateRoutes:IRoute[] = [
    {
        path: RouteNames.EVENT,
        component: Event
    }
]