import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import {
  getUserBorrows,
  returnBook,
  clearError,
  extendBorrow,
} from "@/redux/features/borrowSlice";
import type { Borrow } from "@/types/types";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

  const handleExtendBorrow = (borrowId: string) => {
    dispatch(extendBorrow({ borrowId })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Emprunt prolongé avec succès !");
      } else {
        toast.error(result.payload as string);
      }
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
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-30 w-30 border-b-2 border-blue-500"></div>
        </div>
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
                className="w-24 h-32 object-cover"
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

                {!borrow.isReturned && (
                  <div className="mt-2 flex space-x-2">
                    <Button>
                      <Link to={borrow.bookDetails!} target="_blank">
                        Voir Détails
                      </Link>
                    </Button>

                    <Button
                      onClick={() => handleReturnBook(borrow._id)}
                      disabled={loading}
                    >
                      Retourner
                    </Button>

                    <Button
                      onClick={() => handleExtendBorrow(borrow._id)}
                      disabled={loading}
                      variant="outline"
                    >
                      Prolonger
                    </Button>
                  </div>
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
