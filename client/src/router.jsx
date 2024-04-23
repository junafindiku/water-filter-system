import React from 'react';
import {createBrowserRouter, Navigate} from 'react-router-dom';
import DefaultLayout from './screen/DefaultLayout';
import InstantMeetingScheduler from './screen/InstantMeetingScheduler';
import ReservedCalls from './screen/ReservedCalls';
import Scheduler from './screen/Scheduler';

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
    path: '/instantmeeting',
    element: <InstantMeetingScheduler />,
    children: [{

    }]
  },
  {
    path: '/reservedCalls',
    element: <ReservedCalls />,
    children:[
      {
        
      }
    ]
  },
  {
    path: '/scheduler',
    element: <Scheduler />,
    children:[
      {
        
      }
    ]
  }
]);

export default router;