exports.getFieldParams = (fields, options) => {
let prefix = options.prefix;
let tabLevel = options.tabLevel;
let generateValues = options.generateValues;
  let fieldHash = {};
  fields.forEach(field => {
    fieldHash[field] = generateValues
      ? `%quote%${field} value%quote%`
      : prefix + field;
  });
  const fieldParams = JSON.stringify(fieldHash)
    .replace(/\"/g, "")
    .replace(/%quote%/g, "\"")
    .replace(/{/g, "")
    .replace(/}/g, "")
    .replace(/:/g, ": ")
    .replace(/,/g, ",\n"+("  ").repeat(tabLevel));
    
  return fieldParams;
};
