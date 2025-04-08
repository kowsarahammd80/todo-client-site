import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Router/Routers/Routers";
import { Provider } from "react-redux";
import store from "./app/store";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    // Force the theme (optional, for safety)
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);
  return (
    <div className="bg-color">
      <Provider store={store}>
        <RouterProvider router={router}>
           
        </RouterProvider>
      </Provider>
    </div>
  );
}

export default App;