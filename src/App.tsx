import './App.css';
import { globalAddinContainer } from './extensibility/AddinContainer.ts';
import { initializeModules } from './initializer.ts';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routesAddinPath } from './interface/app.interface.ts';
import React from 'react';
import { BoundaryToggle } from './common/BoundaryToggle.tsx';

initializeModules();
globalAddinContainer.start();

const routeAddins = globalAddinContainer.get(routesAddinPath);
const routes = routeAddins.map((route: { path: string; Component: React.ComponentType }) => ({
    path: route.path,
    element: React.createElement(route.Component),
}));

const router = createBrowserRouter(routes);

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <BoundaryToggle />
        </>
    );
}

export default App;
