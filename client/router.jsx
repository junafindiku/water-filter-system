import {createBrowserRouter, Navigate} from 'react-router-dom';
import DefaultLayout from './src/components/DefaultLayout';

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
  }
]);

export default router;