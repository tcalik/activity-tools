import chai, { expect } from "chai";
import "mocha";
import distanceBtwnPoints from "../distanceBtwnPoints";

const firstNode = { lat: 50.052573, lon: 19.923239 };

const secondNode = { lat: 50.052612, lon: 19.923253 };

describe("Distance between points", () => {
  it("Correctly calculates distance between two points", () => {
    let distance = distanceBtwnPoints(
      firstNode.lat,
      firstNode.lon,
      secondNode.lat,
      secondNode.lon
    );
    expect(distance).to.equal(4.455);
  });
});
