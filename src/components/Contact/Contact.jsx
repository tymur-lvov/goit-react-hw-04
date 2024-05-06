import { BsFillTelephoneFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";

import s from "./Contact.module.css";

function Contact({ contact, onDelete }) {
  const { name, number, id } = contact;

  return (
    <>
      <li className={s.item}>
        <div className={s.wrapper}>
          <div className={s.field}>
            <IoPerson size={20} />
            <p>{name}</p>
          </div>
          <div className={s.field}>
            <BsFillTelephoneFill size={20} />
            <p>{number}</p>
          </div>
        </div>
        <button
          className={s.delete_button}
          type="button"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </li>
    </>
  );
}

export default Contact;
