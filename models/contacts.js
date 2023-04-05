const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid/async");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(result);
  } catch ({ message }) {
    return message;
  }
};

const getContactById = async (contactId) => {
  try {
    const result = await listContacts();

    const foundContact = result.find(({ id }) => id === contactId.toString());

    return foundContact;
  } catch ({ message }) {
    return message;
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await listContacts();

    const filteredList = result.filter(({ id }) => id !== contactId.toString());

    await fs.writeFile(contactsPath, JSON.stringify(filteredList));

    return filteredList;
  } catch ({ message }) {
    return message;
  }
};

const addContact = async (body) => {
  try {
    const list = await listContacts();

    const newId = await nanoid(10);

    const newContact = { id: newId.toString(), ...body };

    const newContactsList = [...list, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));

    return newContactsList;
  } catch ({ message }) {
    return message;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const list = await listContacts();

    const idx = list.findIndex(({ id }) => id === contactId);

    if (idx === -1) {
      return null;
    }

    list[idx] = { id: contactId, ...body };

    await fs.writeFile(contactsPath, JSON.stringify(list));

    return list;
  } catch ({ message }) {
    return message;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
