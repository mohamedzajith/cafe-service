const generateUniqueId = require("generate-unique-id");

const id2 = generateUniqueId({
  length: 7,
  useLetters: true,
  useNumbers: true,
});

const uniqueId = (prefix = "UI") => {
  const id = generateUniqueId({
    length: 7,
    useLetters: true,
    useNumbers: true,
  });
  return `${prefix}${id}`;
};

module.exports = {
  uniqueId,
};
