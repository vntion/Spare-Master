import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = function (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query) return;
    navigate(`/search/${query.trim()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex basis-96 items-center gap-2 overflow-hidden rounded-md border border-[#777] bg-white px-2 py-[6px]"
    >
      <button type="submit">
        <MagnifyingGlassIcon className="size-5" />
      </button>
      <input
        type="text"
        placeholder="Cari di Spare Master..."
        className="flex-1 outline-none"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
    </form>
  );
}

export default SearchForm;
