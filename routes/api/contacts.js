const express = require("express");

const { HttpError } = require("../../helpers");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;

    res.status(status).json(message);
  }
});

router.post("/", async (req, res, next) => {
  const result = await addContact(req.body);

  res.json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
