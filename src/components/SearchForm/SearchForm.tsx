import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { AppDispatch, RootState } from "@/redux/store";
import { setQuery, fetchBooks } from "@/redux/features/booksSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

const SearchForm = () => {
  const [localQuery, setLocalQuery] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.books.query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (localQuery.trim() === "") {
      return;
    }
    dispatch(setQuery(localQuery));
    dispatch(fetchBooks(localQuery));
    setLocalQuery("");
  };

  return (
    <div className="mt-5 flex flex-col items-center gap-5">
      <form onSubmit={handleSubmit} className="flex gap-1">
        <Input
          type="text"
          value={localQuery}
          onChange={handleChange}
          placeholder="Rechercher un livre..."
          aria-label="Rechercher des livres"
          className="w-[300px] bg-white text-black placeholder:text-black placeholder:text-sm placeholder:font-bold focus:outline-none focus:ring-0 focus:ring-offset-0"
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Rechercher
        </Button>
      </form>
      <p>
        Dernière recherche : <strong>{query}</strong>
      </p>
    </div>
  );
};
export default SearchForm;
