import { Toaster } from "react-hot-toast";
import { useRef, useState } from "react";
import { fetchData } from "../services/api";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";

function App() {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLimit, setIsLimit] = useState(false);
  const [query, setQuery] = useState("");

  const page = useRef();
  const img = useRef();

  const handleSearchQuery = async (searchQuery) => {
    try {
      setGallery([]);
      setIsLoading(true);
      setIsError(false);
      setIsLimit(false);
      setQuery(searchQuery);

      page.current = 1;

      const { data } = await fetchData(searchQuery, page.current);

      setGallery(data.results);

      if (data.total_pages > page.current) {
        setIsLimit(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);

      ++page.current;

      const { data } = await fetchData(query, page.current);

      setGallery((prevGallery) => [...prevGallery, ...data.results]);

      scrollBy({
        top: img.current.getBoundingClientRect().height * 2,
        behavior: "smooth",
      });

      if (page.current === data.total_pages) {
        setIsLimit(false);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearchQuery} />
      {gallery.length > 0 && <ImageGallery ref={img} gallery={gallery} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isLimit && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
}

export default App;
