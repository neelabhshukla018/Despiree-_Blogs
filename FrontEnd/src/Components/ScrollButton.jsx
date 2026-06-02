import { useEffect, useState } from "react";

export default function ScrollButton() {
  const [show, setShow] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      setShow(scrollY > 300);

      setIsBottom(
        scrollY + windowHeight >= pageHeight - 200
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollAction = () => {
    if (isBottom) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top:
          document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollAction}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-red-600 text-white shadow-lg hover:scale-110 transition"
    >
      {isBottom ? "↑" : "↓"}
    </button>
  );
}