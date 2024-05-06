import s from "./ImageCard.module.css";

function ImageCard({ src, alt }) {
  return (
    <div className={s.wrapper}>
      <img src={src} alt={alt} />
    </div>
  );
}

export default ImageCard;
