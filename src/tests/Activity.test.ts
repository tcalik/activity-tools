import chai, { expect } from "chai";
import "mocha";
import { Activity } from "../Activity";
import * as fs from "fs";
import { XMLParser } from "fast-xml-parser";
import type { ParsedGPX } from "../interfaces/ParsedGPX.interface";

const parser = new XMLParser({
  removeNSPrefix: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
});
const fileToParse = fs.readFileSync(`${__dirname}/8_AWF.gpx`, "utf-8");
let testActivity: ParsedGPX = parser.parse(
  fileToParse
);
let newActivity = new Activity(testActivity)

describe("Parser tests", () => {
  it("Reads lat attribute of first node correctly", () => {
    expect(newActivity.parsedActivity[0].lat).to.equal(50.0525730)
  });
  it("Calculates correct total distance", ()=> {
    expect(newActivity.totalDistance).to.equal(11777.49)
  })
  it("Calculates average speed", ()=> {
    expect(newActivity.averageSpeed).to.equal(10.48)
  })
  it("Calculates average heart rate", ()=> {
    expect(newActivity.averageHeartRate).to.equal(94)
  })
});
