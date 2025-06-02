import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";
import { getProfile } from "./redux/features/authSlice";
import { useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  // Fetch user profile if token is available
  // This effect runs once when the component mounts
  useEffect(() => {
    if (token) {
      dispatch(getProfile());
    }
  }, [dispatch, token]);

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto flex-1">
        {/* The Outlet component renders the child routes */}
        {/* This is where the nested routes will be rendered */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
