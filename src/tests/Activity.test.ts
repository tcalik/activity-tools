import chai, { expect } from "chai";
import "mocha";
import { Activity } from "../Activity";
import * as fs from "fs";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  removeNSPrefix: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
});
const fileToParse = fs.readFileSync(`${__dirname}/8_AWF.gpx`, "utf-8");
let testActivity = parser.parse(fileToParse);
let newActivity = new Activity(testActivity);

describe("Activity class tests", () => {
  it("Reads lat attribute of first node correctly", () => {
    expect(newActivity.parsedActivity[0].lat).to.equal(50.052573);
  });
  it("Calculates correct total distance", () => {
    expect(newActivity.totalDistance).to.equal(11777.49);
  });
  it("Calculates average speed", () => {
    expect(newActivity.averageSpeed).to.equal(10.48);
  });
  it("Calculates average heart rate", () => {
    expect(newActivity.averageHeartRate).to.equal(94);
  });
  it("Return speed at specific node", () => {
    expect(newActivity.speedAtNode[10]).to.equal(6.68);
  });
});
