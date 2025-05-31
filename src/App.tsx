import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "@/components/Footer/Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
