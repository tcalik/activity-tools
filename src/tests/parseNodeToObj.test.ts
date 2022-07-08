import chai, { expect } from "chai";
import "mocha";
import parseNodeToObj from "../parseNodeToObj";
import * as fs from "fs";
import { DOMParser } from "xmldom";

const parser = new DOMParser();


let testNode: Element = parser.parseFromString(`<trkpt lat="50.0525730" lon="19.9232390">
<ele>198.4</ele>
<time>2022-05-27T03:38:23Z</time>
<extensions>
 <gpxtpx:TrackPointExtension>
  <gpxtpx:atemp>25</gpxtpx:atemp>
  <gpxtpx:hr>116</gpxtpx:hr>
  <gpxtpx:cad>0</gpxtpx:cad>
 </gpxtpx:TrackPointExtension>
</extensions>
</trkpt>`, "utf-8").getElementsByTagName("trkpt")[0]

let parsedNode = parseNodeToObj(testNode)

describe("Parser tests", () => {
  it("Reads properties of test node correctly", () => {
      expect(parsedNode.lat).to.equal(50.0525730)
      expect(parsedNode.lon).to.equal(19.9232390)
      expect(parsedNode.ele).to.equal(198.4)
      expect(parsedNode.temp).to.equal(25)
      expect(parsedNode.hr).to.equal(116)
      expect(parsedNode.cad).to.equal(0)
      expect(parsedNode.time).to.equal("2022-05-27T03:38:23Z")
      
      
});
});
