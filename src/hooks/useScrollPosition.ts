import { useEffect } from "react";

const scrollPositions = {};

function useScrollPosition(page: string) {
  useEffect(() => {
    const pageScrollPosition = scrollPositions[page];

    if (pageScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, pageScrollPosition);
      }, 50);
    }

    const save = () => {
      scrollPositions[page] = window.scrollY;
    };

    window.addEventListener("scroll", save);

    return () => {
      window.removeEventListener("scroll", save);
    };
  }, [page]);
}

export default useScrollPosition;
