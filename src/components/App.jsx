import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { fetchData } from "../services/api";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";

function App() {
  const [gallery, setGallery] = useState([]);

  const handleSearchQuery = async (searchQuery) => {
    const { data } = await fetchData(searchQuery);
    setGallery(data.results);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearchQuery} />
      <ImageGallery gallery={gallery} />
    </>
  );
}

export default App;
