import HeroSection from "../HeroSection/HeroSection";
import BookList from "../BookList/BookList";

const Home = () => {
  return (
    <div className="flex flex-col items-center min-h-svh">
      <section className="w-full">
        <HeroSection />
      </section>
      <section className="w-full">
        <BookList />
      </section>
    </div>
  );
};

export default Home;
