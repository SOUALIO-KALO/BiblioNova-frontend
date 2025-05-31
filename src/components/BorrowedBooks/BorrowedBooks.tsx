const BorrowedBooks = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-10rem)]">
      <h2 className="text-2xl font-bold mb-6">Mes livres empruntés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    </div>
  );
};

export default BorrowedBooks;
