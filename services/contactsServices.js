import Contact from "../models/Contact.js";

export const listContacts = (filter, setting) => Contact.find(filter, null, setting).populate("owner", "email");

export const listContactsCount = filter => Contact.countDocuments(filter);

export const addContact = (data) => Contact.create(data);

export const getContactById = (id) => Contact.findById(id);

export const updateContact = (id, data) => Contact.findByIdAndUpdate(id, data);

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const updateContactStatusById = (id, data) => Contact.findByIdAndUpdate(id, data);