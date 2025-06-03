import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import {
  getUserBorrows,
  returnBook,
  clearError,
} from "@/redux/features/borrowSlice";
import type { Borrow } from "@/types/types";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const BorrowedBooks: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { borrows, loading, error } = useSelector(
    (state: RootState) => state.borrow
  );
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getUserBorrows());
    }
  }, [dispatch, token]);

  const handleReturnBook = (borrowId: string) => {
    dispatch(returnBook(borrowId)).then(() => {
      dispatch(getUserBorrows()); // Rafraîchir la liste après retour
    });
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mes Livres Empruntés</h2>
      {error && (
        <div className="text-red-500 mb-4 flex items-center">
          {error}
          <Button onClick={handleClearError} variant="outline" className="ml-2">
            Effacer
          </Button>
        </div>
      )}
      {loading ? (
        <p>Chargement...</p>
      ) : borrows.length > 0 ? (
        <ul className="space-y-4">
          {borrows.map((borrow: Borrow) => (
            <li
              key={borrow._id}
              className="border p-4 rounded-md flex items-center space-x-4"
            >
              <img
                src={borrow.bookCover}
                alt={borrow.bookTitle}
                className="w-16 h-24 object-cover"
              />
              <div>
                <h3 className="font-semibold">{borrow.bookTitle}</h3>
                <p>
                  Date d'emprunt :{" "}
                  {new Date(borrow.borrowDate).toLocaleDateString()}
                </p>
                <p>
                  Date de retour :{" "}
                  {new Date(borrow.returnDate).toLocaleDateString()}
                </p>
                <p>Statut : {borrow.isReturned ? "Retourné" : "Emprunté"}</p>
                <Button>
                  <Link to={borrow.bookDetails!} target="_blank">
                    Voir Détails
                  </Link>
                </Button>
                {!borrow.isReturned && (
                  <Button
                    onClick={() => handleReturnBook(borrow._id)}
                    className="mt-2"
                    disabled={loading}
                  >
                    Retourner
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun livre emprunté.</p>
      )}
    </div>
  );
};

export default BorrowedBooks;
