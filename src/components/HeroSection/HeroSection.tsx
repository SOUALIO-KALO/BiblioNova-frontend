import heroImage from "@/assets/images/heros-desktop.jpg";
import SearchForm from "../SearchForm/SearchForm";
const HeroSection = () => {
  return (
    <div
      className="w-full flex flex-col items-center justify-center min-h-[50vh]"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="z-10 backdrop-blur-sm bg-white/30 border rounded-xl p-6 flex flex-col items-center justify-center">
        <h1 className="hero-title text-3xl font-semibold mb-4 text-white">
          Bienvenue à BiblioNova
        </h1>
        <p className="hero-description mb-4 text-white">
          Explorez notre collection de livres numériques.
        </p>
        <SearchForm />
      </div>
    </div>
  );
};

export default HeroSection;
