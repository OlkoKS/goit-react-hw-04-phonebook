import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
};
export class App extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    let localData = localStorage.getItem('contacts');
    if (localData && JSON.parse(localData).length > 0) {
      this.setState({ contacts: JSON.parse(localData) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  createContactData = contactData => {
    let sameContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === contactData.name.toLowerCase()
    );
    if (sameContact) {
      return alert(`${sameContact.name} is already in contacts`);
    }

    const newContact = {
      ...contactData,
      id: nanoid(),
    };

    this.setState(prev => ({
      contacts: [...prev.contacts, newContact],
    }));
  };

  handleFilter = userQuery => {
    this.setState({ filter: userQuery });
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    return (
      <div className="phoneBookContainer">
        <h1>Phonebook</h1>
        <ContactForm createContactData={this.createContactData} />
        <h2>Contacts</h2>
        <Filter handleFilter={this.handleFilter} />
        <ContactList
          contacts={this.handleContacts()}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
