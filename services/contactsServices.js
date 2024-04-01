import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();

export const addContact = (data) => Contact.create(data);

export const getContactById = (id) => {
  const data = Contact.findById(id);
  return data;
};

export const updateContact = (id, data) => Contact.findByIdAndUpdate(id, data);

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const updateContactStatusById = (id, data) => Contact.findByIdAndUpdate(id, data);