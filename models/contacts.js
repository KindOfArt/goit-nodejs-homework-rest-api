const fs = require("fs/promises");
const path = require("path");

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

const removeContact = async (contactId) => {};

const createId = (result) => {
  const idList = result.map(({ id }) => Number(id));

  const lastId = idList[idList.length - 1];

  const newId = lastId + 1;

  return newId;
};

const addContact = async (body) => {
  try {
    const result = await listContacts();

    const newId = createId(result);

    const newContact = await { id: newId.toString(), ...body };

    const newContactsList = [...result, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));

    return newContactsList;
  } catch ({ message }) {
    return message;
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
