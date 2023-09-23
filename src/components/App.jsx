import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  // componentDidMount() {
  //   let localData = localStorage.getItem('contacts');
  //   if (localData && JSON.parse(localData).length > 0) {
  //     this.setState({ contacts: JSON.parse(localData) });
  //   }
  // }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidUpdate(_, prevState) {
  //   if (this.state.contacts.length !== prevState.contacts.length) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const createContactData = contactData => {
    const sameContact = contacts.find(
      contact =>
        contact.name.toLowerCase() === contactData.name.toLowerCase() ||
        contact.number === contactData.number
    );
    if (sameContact) {
      return alert(
        `${contactData.name} or ${contactData.number}  is already in contacts`
      );
    }

    const newContact = {
      ...contactData,
      id: nanoid(),
    };
    setContacts([...contacts, newContact]);

    // setContacts(prev => ({
    //   contacts: [...prev.contacts, newContact],
    // }));
  };

  const handleFilter = userQuery => {
    setFilter(userQuery);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className="phoneBookContainer">
      <h1>Phonebook</h1>
      <ContactForm createContactData={createContactData} />
      <h2>Contacts</h2>
      <Filter handleFilter={handleFilter} />
      <ContactList contacts={handleContacts()} handleDelete={handleDelete} />
    </div>
  );
};
