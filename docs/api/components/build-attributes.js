const xlsx = require("node-xlsx").default;
const yaml = require("js-yaml");
const fs = require("fs");

async function buildAttribiutes() {
  let attributes = {};
  const workSheetsFromBuffer = xlsx.parse(`../../Attributesheet_scoring.xlsx`);
  for (let i = 0; i < workSheetsFromBuffer.length; i++) {
    const array = workSheetsFromBuffer[i];
    console.log("array",array)
    const filterArray = array.data.filter((subArr) => subArr.length > 0);
    const response = formObject(filterArray);
    console.log('response',response)
    const addArrtibuteName = {
      [array?.name]: response,
    };
    attributes = { ...attributes, ...addArrtibuteName };
  }
  console.log("attributes",attributes)
  if (Object.keys(attributes)?.length) {
    const attributesYaml = yaml.dump(attributes);
    fs.writeFileSync(`./attributes/score/index.yaml`, attributesYaml);
  }
}
function formObject(attributes) {
  const result = {};
  let dataValue = {};
  attributes.slice(1).forEach((item) => {
    const keys = item[0].split(".");
    let temp = result;
    const tempAtt = attributes[0].slice(1);
    const tempItem = item?.slice(1);
    keys.forEach((key, index) => {
      if (!temp[key]) {
        if (index === keys.length - 1) {
          for (const [i, step] of tempAtt?.entries()) {
            dataValue[tempAtt[i]?.toLowerCase()] = tempItem[i] || false;
          }
          temp[key] = dataValue;
        } else {
          temp[key] = {};
        }
        dataValue = {};
      }
      temp = temp[key];
    });
  });
  return result;
}
buildAttribiutes();

module.exports = { buildAttribiutes }
