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

const router = createBrowserRouter([
  {
    path: "/",
    // This is the root path of the application
    // The `element` property specifies the component to render for this route
    // The `children` property defines nested routes
    // Each child route can have its own path and element
    // The `index: true` property indicates that this is the default route for the parent path
    // The `element` property specifies the component to render for this route
    // The `children` property defines nested routes
    // Each child route can have its own path and element
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
