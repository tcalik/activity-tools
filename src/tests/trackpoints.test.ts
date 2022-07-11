import chai, { expect } from "chai";
import "mocha";
import { parseActivityToArray } from "../index";
import * as fs from "fs";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  removeNSPrefix: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
});
const fileToParse = fs.readFileSync(`${__dirname}/8_AWF.gpx`, "utf-8");
let testActivity: XMLDocument = parser.parse(
  fileToParse
);
let parsedActivty = parseActivityToArray(testActivity)

describe("Parser tests", () => {
  it("Reads lat attribute of first node correctly", () => {
    
    expect(parsedActivty[0].lat).to.equal(50.0525730)

  });
});
