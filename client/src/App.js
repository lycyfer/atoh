import logo from './logo.svg';
import './App.css';
import SignUp from './components/singUp/signUp';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import User from './components/users/users';
import { clientPageLoader } from './components/lib/loader';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
    },
    {
      path: "/user/:id",
      element: <User />,
      loader: clientPageLoader
      // element: 
      // loader: 
    }
  ])

  // return (
  //   <div className="App">
  //     <SignUp />
  //   </div>
  // );
  return (
    <RouterProvider router={router} />
  )
}

export default App;
