import * as fs from "fs";
import { XMLParser } from "fast-xml-parser";
import parseNodeToObj from "./parseNodeToObj";

const parser = new XMLParser({
  removeNSPrefix: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const fileToParse = fs.readFileSync(`${__dirname}/tests/8_AWF.gpx`, "utf-8");

let jsonObj = parser.parse(fileToParse);


export let parseActivityToArray = (activity: XMLDocument) => {
  let activityArray = [];
  for (let index in jsonObj.gpx.trk.trkseg.trkpt) {
    let currentNode = jsonObj.gpx.trk.trkseg.trkpt[index];
    activityArray.push(parseNodeToObj(currentNode));
  }
  return activityArray
};

