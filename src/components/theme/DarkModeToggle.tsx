import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [theme, setTheme] = useState<string>("light");

  const handleToggleTheme = function () {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

    document.documentElement.className = "";

    if (theme === "light") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    localStorage.setItem("theme", `${theme === "light" ? "dark" : "light"}`);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (!theme) {
      localStorage.setItem("theme", "light");
      return;
    }
    setTheme(theme);
    if (theme === "light") document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <button
      className="rounded-full p-1.5 text-primary hover:bg-primary/10"
      onClick={handleToggleTheme}
    >
      {theme === "light" && <MoonIcon className="size-5" />}
      {theme === "dark" && <SunIcon className="size-5" />}
    </button>
  );
}

export default DarkModeToggle;
