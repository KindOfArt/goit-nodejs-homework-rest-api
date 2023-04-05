const HttpError = require("./HttpError");

const validateResult = (result) => {
  if (!result) {
    throw HttpError(404, "Not found");
  }
};

module.exports = validateResult;
