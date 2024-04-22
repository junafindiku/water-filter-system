import {createBrowserRouter, Navigate} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import InstantMeetingScheduler from './components/InstantMeetingScheduler';

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
  }
]);

export default router;