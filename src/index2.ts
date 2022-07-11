import * as fs from "fs";
import { XMLParser } from "fast-xml-parser";
import parseNodeToObj2 from "./parseNodeToObj2";

const parser = new XMLParser({
  removeNSPrefix: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const fileToParse = fs.readFileSync(`${__dirname}/tests/8_AWF.gpx`, "utf-8");

let jsonObj = parser.parse(fileToParse);


let parseActivityToArray = (activity: XMLDocument) => {
  let activityArray = [];
  //for (let index in jsonObj.gpx.trk.trkseg.trkpt) {
    let currentNode = jsonObj.gpx.trk.trkseg.trkpt[0];
    activityArray.push(parseNodeToObj2(currentNode));
  //}
};

parseActivityToArray(jsonObj)