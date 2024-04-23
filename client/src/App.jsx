//import './App.css';
// import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
function App() {

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  {/* <ContextProvider> */}
    <RouterProvider router={router} />

  {/* </ContextProvider> */}
  </React.StrictMode>,
)

}

export default App;
