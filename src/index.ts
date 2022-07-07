import * as fs from "fs";
import {DOMParser} from "xmldom"

const parser = new DOMParser();

const fileToParse = fs.readFileSync(`${__dirname}/tests/8_AWF.gpx`, "utf-8");

let parseToXml = (activity: string) => {
  const currentActivity = parser.parseFromString(activity, "text/xml");
  return currentActivity;
};

let testActivity:XMLDocument = parseToXml(fileToParse);

let y = testActivity.getElementsByTagName("trkpt")[1];
console.log(y.attributes[0].value)