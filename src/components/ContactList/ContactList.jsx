import Contact from "../Contact/Contact";

function ContactList({ contacts, onDelete }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ContactList;
