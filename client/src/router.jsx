import React from 'react';
import {createBrowserRouter, Navigate} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout.jsx';
import Schedule from './components/Schedule.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/home',
        element: <Navigate to="/home" />
      }
    ]
  },
  {
    path: '/schedule',
    element: <Schedule />,
    children:[
      {

      }
    ]
  }
]);

export default router;