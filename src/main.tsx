import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./components/Home/Home";
import BorrowedBooks from "./components/BorrowedBooks/BorrowedBooks";
import ContactForm from "./components/ContactForm/ContactForm";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    // Ceci est le chemin racine de l'application
    // La propriété `element` spécifie le composant à afficher pour cette route
    // La propriété `children` définit les routes imbriquées
    // Chaque route enfant peut avoir son propre chemin et composant
    // La propriété `index: true` indique que c'est la route par défaut pour le chemin parent
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "borrowed-books",
        element: <BorrowedBooks />,
      },
      {
        path: "contact",
        element: <ContactForm />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Le composant Provider rend le store Redux disponible dans toute l'application */}
      <RouterProvider router={router} />
    </Provider>
    {/* Le composant RouterProvider fournit le routeur à l'application, permettant la navigation entre les routes */}
  </React.StrictMode>
);
