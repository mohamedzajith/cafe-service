const generateUniqueId = require("generate-unique-id");
const { v4: uuidv4 } = require("uuid");

const generateUuid = () => {
  return uuidv4();
};

const uniqueId = (prefix = "UI") => {
  const id = generateUniqueId({
    length: 7,
    useLetters: true,
    useNumbers: true,
  });
  return `${prefix}${id}`;
};

module.exports = {
  generateUuid,
  uniqueId,
};
