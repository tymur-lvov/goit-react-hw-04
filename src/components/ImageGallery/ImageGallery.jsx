import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

function ImageGallery({ gallery }) {
  return (
    <ul className={s.list}>
      {gallery.map((img) => (
        <li className={s.item} key={img.id}>
          <ImageCard src={img.urls.small} alt={img.alt_description} />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
