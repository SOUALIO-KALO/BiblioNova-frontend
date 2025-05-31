import heroImage from "@/assets/images/heros-desktop.jpg";
import SearchForm from "../SearchForm/SearchForm";
const HeroSection = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[50vh]"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="z-10 bg-white bg-opacity-20 rounded-xl p-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">LIVRES</h1>
        <p className="mb-4">Indiquez le livre à rechercher</p>
        <SearchForm />
      </div>
    </div>
  );
};

export default HeroSection;
