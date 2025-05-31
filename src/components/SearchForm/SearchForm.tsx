import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useState } from "react";

const SearchForm = () => {
  const [localQuery, setLocalQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (localQuery.trim() === "") {
      return;
    }
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
        Dernière recherche : <strong>{""}</strong>
      </p>
    </div>
  );
};
export default SearchForm;
