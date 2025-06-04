import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Book from "../Book/Book";
import CategoryFilter from "../CategoryFilter/CategoryFilter";

const BookList = () => {
  const { books, loading, error, selectedCategory } = useSelector(
    (state: RootState) => state.books
  );

  // Filtrer les livres en fonction de la catégorie sélectionnée
  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : books;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-50!0">Erreur : {error}</div>;
  }

  if (books.length === 0) {
    return <div className="text-center">Aucun livre trouvé.</div>;
  }

  // Affichage de la liste des livres
  const bookItems = filteredBooks.map((book) => (
    <Book key={book.bookId} book={book} />
  ));

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex items-center justify-center text-2xl font-bold mb-6 text-center">
        <span className="flex items-center w-full">
          <span className="flex-1 h-1 bg-blue-500 rounded-full mr-4" />
          Liste des livres recherchés
          <span className="flex-1 h-1 bg-blue-500 rounded-full ml-4" />
        </span>
      </h1>
      <CategoryFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bookItems}
      </div>
    </div>
  );
};

export default BookList;
