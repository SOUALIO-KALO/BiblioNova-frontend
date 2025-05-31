import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BookList = () => {
  const { books, loading, error } = useSelector(
    (state: RootState) => state.books
  );
  if (loading) {
    return <div className="text-center">Chargement des livres...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">Erreur : {error}</div>;
  }
  if (books.length === 0) {
    return <div className="text-center">Aucun livre trouvé.</div>;
  }
  // Affichage de la liste des livres
  const bookItems = books.map((book) => (
    <div key={book.id} className="bg-white p-4 rounded-lg shadow-md">
      <Accordion type="single" collapsible>
        <AccordionItem value="book-details">
          {/* Utilisation de l'AccordionTrigger pour le titre du livre */}
          <AccordionTrigger className="text-gray-800 font-semibold">
            <h2 className="text-xl font-semibold">{book.title}</h2>
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            {/* Contenu de l'AccordionContent pour les détails du livre */}
            <p className="text-gray-600">Auteur: {book.author}</p>
            {book.description && (
              <Accordion type="single" collapsible>
                <AccordionItem value="description">
                  <AccordionTrigger className="text-gray-600 hover:text-gray-800">
                    Description
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {book.description}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
            {book.publishedDate && (
              <p className="text-gray-600">Publié le: {book.publishedDate}</p>
            )}
            {book.pageCount && (
              <p className="text-gray-600">Nombre de pages: {book.pageCount}</p>
            )}
            {book.language && (
              <p className="text-gray-600">Langue: {book.language}</p>
            )}
            {book.category && (
              <p className="text-gray-600">Catégorie: {book.category}</p>
            )}
            {/* Affichage de l'image de couverture si elle existe */}
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full object-cover rounded mt-2"
              />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ));
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Liste des livres</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookItems}
        {/* Affichage des livres */}
      </div>
    </div>
  );
};

export default BookList;
