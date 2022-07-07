import chai, { expect } from "chai";
import "mocha";
import { parseActivityToArray } from "../index";
import * as fs from "fs";
import { DOMParser } from "xmldom";

describe("Parser tests", () => {
  it("Reads lat attribute of first node correctly", () => {
    const parser = new DOMParser();

    const fileToParse = fs.readFileSync(`${__dirname}/8_AWF.gpx`, "utf-8");
    let testActivity: XMLDocument = parser.parseFromString(
      fileToParse,
      "text/xml"
    );
    let parsedActivty = parseActivityToArray(testActivity)
    
    expect(parsedActivty[0].lat).to.equal("50.0525730")

  });
});
