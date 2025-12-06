import './App.css';
import { globalAddinContainer } from './extensibility/AddinContainer.ts';
import { initializeModules } from './initializer.ts';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routesAddinPath } from './interface/app.interface.ts';
import React from 'react';
import { BoundaryToggle } from './common/BoundaryToggle.tsx';

initializeModules();
globalAddinContainer.start();

const routeAddins: { path: string; Component: React.FC }[] = globalAddinContainer.get(routesAddinPath);

const router = createBrowserRouter(routeAddins);

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <BoundaryToggle />
        </>
    );
}

export default App;
