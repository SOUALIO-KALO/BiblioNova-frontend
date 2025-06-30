import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import {
  getUserBorrows,
  returnBook,
  clearError,
  extendBorrow,
  deleteBorrow,
} from "@/redux/features/borrowSlice";
import type { Borrow } from "@/types/types";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import coverNotAvailable from "@/assets/images/cover-not-available.jpg";

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
      dispatch(getUserBorrows());
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

  const handleDeleteBorrow = (borrowId: string) => {
    dispatch(deleteBorrow(borrowId));
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : borrows.length > 0 ? (
        <ul className="space-y-4">
          {borrows.map((borrow: Borrow) => (
            <li
              key={borrow._id}
              className="border p-4 rounded-md flex items-center space-x-4"
            >
              <img
                src={
                  borrow.bookCover === "neant"
                    ? coverNotAvailable
                    : borrow.bookCover
                }
                alt={borrow.bookTitle}
                className="w-24 h-32 object-cover"
              />
              <div className="flex-grow">
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

                <div className="mt-2 flex space-x-2 flex-wrap space-y-2">
                  {!borrow.isReturned ? (
                    <>
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
                    </>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Supprimer l'emprunt
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer cet emprunt ?
                            Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteBorrow(borrow._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
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
