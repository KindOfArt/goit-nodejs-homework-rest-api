const { ctrlWrapper, validateResult } = require("../helpers");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getAll = async (req, res) => {
  const result = await listContacts();

  validateResult(result);

  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await getContactById(contactId);

  validateResult(result);

  res.json(result);
};

const add = async (req, res) => {
  const result = await addContact(req.body);

  validateResult(result);

  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await removeContact(contactId);

  validateResult(result);

  return res.json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body);

  validateResult(result);

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
