import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Book from "../Book/Book";

const BookList = () => {
  const { books, loading, error } = useSelector(
    (state: RootState) => state.books
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-30 w-30 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Erreur : {error}</div>;
  }
  if (books.length === 0) {
    return <div className="text-center">Aucun livre trouvé.</div>;
  }
  // Affichage de la liste des livres
  const bookItems = books.map((book) => <Book key={book.bookId} book={book} />);
  return (
    <div className="container mx-auto p-4">
      <h1 className="flex items-center justify-center text-2xl font-bold mb-6 text-center">
        <span className="flex items-center w-full">
          <span className="flex-1 h-1 bg-blue-500 rounded-full mr-4" />
          Liste des livres recherchés
          <span className="flex-1 h-1 bg-blue-500 rounded-full ml-4" />
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Affichage des livres */}
        {bookItems}
      </div>
    </div>
  );
};

export default BookList;
