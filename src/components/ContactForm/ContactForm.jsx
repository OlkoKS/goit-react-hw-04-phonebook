import { useState } from 'react';
import {
  ContactFormContainer,
  InputContainer,
  BtnElement,
} from './ContactForm.styled';

export const ContactForm = ({ createContactData }) => {
  const [form, setForm] = useState({ name: '', number: '' });
  const { name, number } = form;

  const handleChange = ({ target: { name, value } }) => {
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    createContactData(form);
    setForm({ name: '', number: '' });
  };

  return (
    <ContactFormContainer onSubmit={handleSubmit}>
      <h2>ContactForm</h2>
      <label>Name</label>
      <InputContainer
        type="text"
        onChange={handleChange}
        value={name}
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label>Number</label>
      <InputContainer
        type="tel"
        onChange={handleChange}
        value={number}
        name="number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <BtnElement type="submit">Add contact</BtnElement>
    </ContactFormContainer>
  );
};
