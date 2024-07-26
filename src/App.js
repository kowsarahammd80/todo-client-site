import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Router/Routers/Routers';

function App() {

  return (

    <div className="bg-color">

      <RouterProvider router={router}>
           
      </RouterProvider>

    </div>

  );
}

export default App;
