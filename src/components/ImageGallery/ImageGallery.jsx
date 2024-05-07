import { forwardRef } from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = forwardRef(function ImageGallery({ gallery }, ref) {
  return (
    <ul className={s.list}>
      {gallery.map((img) => (
        <li className={s.item} key={img.id} ref={ref}>
          <ImageCard src={img.urls.small} alt={img.alt_description} />
        </li>
      ))}
    </ul>
  );
});

export default ImageGallery;
