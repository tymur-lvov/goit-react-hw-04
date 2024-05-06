import { useId } from "react";
import s from "./SearchBox.module.css";

function SearchBox({ filter, onFilter }) {
  const searchFieldId = useId();

  return (
    <>
      <label className={s.label} htmlFor={searchFieldId}>
        Find contacts by name
      </label>
      <input
        className={s.input}
        id={searchFieldId}
        type="text"
        value={filter}
        onChange={(event) => onFilter(event.target.value)}
      />
    </>
  );
}

export default SearchBox;
