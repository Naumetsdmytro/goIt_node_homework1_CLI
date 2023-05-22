const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const getAllContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const contacts = await getAllContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact || null;
};

const removeContact = async (id) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

const addContact = async (data) => {
  const contacts = await getAllContacts();

  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  addContact,
  removeContact,
  getAllContacts,
  getContactById,
};
