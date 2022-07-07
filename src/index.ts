import * as fs from "fs";
import { DOMParser } from "xmldom";

const parser = new DOMParser();

const fileToParse = fs.readFileSync(`${__dirname}/tests/8_AWF.gpx`, "utf-8");
let testActivity: XMLDocument = parser.parseFromString(fileToParse, "text/xml");

export let parseActivityToArray = (activity: XMLDocument) => {
  let activityArray = [];
  for (let index in testActivity.getElementsByTagName("trkpt")) {
    let currentNode = testActivity.getElementsByTagName("trkpt")[index];

    if (currentNode.nodeType === 1) {
      activityArray.push(parseNodeToObj(currentNode));
    }
  }
  return activityArray;
};

let parseNodeToObj = (currentNode: Element) => {
  let nodeObj = {
    lat: currentNode.attributes[0].value,
    lon: currentNode.attributes[1].value,
  };
  return nodeObj;
};
