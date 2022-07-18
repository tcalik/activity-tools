import * as fs from "fs";
import { XMLParser } from "fast-xml-parser";
import { Activity } from "./Activity";

const parser = new XMLParser({
  removeNSPrefix: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const fileToParse = fs.readFileSync(`${__dirname}/tests/8_AWF.gpx`, "utf-8");

let jsonObj = parser.parse(fileToParse);
let newActivity = new Activity(jsonObj);
