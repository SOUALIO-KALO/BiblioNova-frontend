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
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Book = ({ book }: IBookItemProps) => {
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
        {book.coverUrl && (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-auto transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        )}
        <p>
          {" "}
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
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
};

export default Book;
