
import './App.css';
 import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import User from './componentes/getUser/User';
import Add from './componentes/addUser/Add';
import Update from './componentes/updateUser/Update';

function App() {

  const route = createBrowserRouter ([
    {
      path:'/',
      element:<User/>,
      
    },
    {
      path:'/add',
      element: <Add/>,

    },
    {
      path:'/update/:id',
      element: <Update/>,

    }
  ])


  return (
    <div className="App">
    <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
