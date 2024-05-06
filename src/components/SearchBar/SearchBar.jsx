import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

function SearchBar({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const value = event.target.elements.search.value;

    if (value.trim() === "") {
      toast.error("Field can't be empty!");
      form.reset();
      return;
    }

    onSubmit(value);
    form.reset();
  };

  return (
    <header>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
