import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "../services/api";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";

function App() {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLimit, setIsLimit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const page = useRef();
  const img = useRef();
  const modalImg = useRef();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      scrollBy({
        top: img.current.getBoundingClientRect().height * 2,
        behavior: "smooth",
      });
    }
  }, [gallery]);

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
      isFirstRender.current = false;

      const { data } = await fetchData(query, page.current);

      setGallery((prevGallery) => [...prevGallery, ...data.results]);

      if (page.current === data.total_pages) {
        setIsLimit(false);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImgClick = (url, alt) => {
    modalImg.current = {
      url,
      alt,
    };

    openModal();
  };

  const handleModalClick = (event) => {
    if (event.target.nodeName !== "DIV") {
      return;
    }
    closeModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearchQuery} />
      {gallery.length > 0 && (
        <ImageGallery onClick={handleImgClick} ref={img} gallery={gallery} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isLimit && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalIsOpen && (
        <ImageModal
          onClick={handleModalClick}
          modalIsOpen={modalIsOpen}
          onRequestClose={closeModal}
          modalImg={modalImg.current}
        />
      )}
    </>
  );
}

export default App;
