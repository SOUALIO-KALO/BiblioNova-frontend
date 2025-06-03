import type { IBookItemProps } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Library } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { borrowBook } from "@/redux/features/borrowSlice";
import { toast } from "react-toastify";

const Book = ({ book }: IBookItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  const { borrows, loading: borrowLoading } = useSelector(
    (state: RootState) => state.borrow
  );

  // Vérifier si le livre est déjà emprunté
  const isBorrowed = borrows.some(
    (b) => b.bookId === book.bookId && !b.isReturned
  );

  const handleBorrow = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(
      borrowBook({
        bookId: book.bookId,
        bookTitle: book.title || "",
        bookCover: book.imageUrl || "",
        bookDetails: book.previewLink || "",
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Livre emprunté avec succès !");
      } else {
        toast.error(result.payload as string);
      }
    });
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
      <CardHeader>
        <CardTitle>
          <h2>{book.title}</h2>
        </CardTitle>
        <CardDescription>
          <p>{book.authors}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {book.imageUrl && (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-auto transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        )}
        <p>
          <strong>Catégorie: </strong>
          {book.category}
        </p>
        <p>
          <strong>Langue: </strong>
          {book.language}
        </p>
        <p>
          <strong>Page: </strong>
          {book.pageCount}
        </p>
        <Accordion type="single" collapsible>
          <AccordionItem value="description">
            <AccordionTrigger>
              {book.description
                ? book.description.length > 100
                  ? book.description.substring(0, 100) + "..."
                  : book.description
                : "Pas de description"}
            </AccordionTrigger>
            <AccordionContent>
              {book.description ? <p>{book.description}</p> : <p>Néant</p>}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-between">
        {book.previewLink && (
          <Button
            variant="outline"
            className="transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <Link to={book.previewLink} target="_blank">
              Lire l'aperçu
            </Link>
            <BookOpen className="ml-2" />
          </Button>
        )}
        <Button
          onClick={handleBorrow}
          disabled={borrowLoading || isBorrowed}
          className="transition-colors duration-300 bg-indigo-600 hover:bg-indigo-500"
          aria-label={`Emprunter ${book.title}`}
        >
          {isBorrowed ? "Déjà emprunté" : "Emprunter"}
          <Library className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Book;
