import React, {FC} from 'react';
import {Routes,Route, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRoute:FC = () => {
    const auth = useTypedSelector(state => state.authReducer.auth)
    return (
        auth ?
        <Routes>
            {privateRoutes.map(route =>
                <Route
                    path = {route.path}
                    key = {route.path}
                    element={<route.component />}
                />
            )}
            <Route path="*" element={<Navigate replace to={RouteNames.EVENT} />} />
        </Routes> :
        <Routes>
            {publicRoutes.map(route =>
                <Route
                    path={route.path}
                    key = {route.path}
                    element={<route.component />}
                />
            )}
            <Route path="*" element={<Navigate replace to={RouteNames.LOGIN} />} />
        </Routes>
    );
}

export default AppRoute;