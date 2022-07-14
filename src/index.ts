import * as fs from "fs";
import { XMLParser } from "fast-xml-parser";
import parseNodeToObj from "./parseNodeToObj";
import distanceBtwnPoints from "./distanceBtwnPoints";
import type { TrackpointElement } from "./parseNodeToObj";

const parser = new XMLParser({
  removeNSPrefix: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const fileToParse = fs.readFileSync(`${__dirname}/tests/8_AWF.gpx`, "utf-8");

let jsonObj = parser.parse(fileToParse);

export class Activity {
  parsedActivity: TrackpointElement[];
  fullInfoActivity: {
    distanceFromLast: number;
    totalDistance: number;
  }[];
  totalDistance: number;

  constructor(XMLActivity: any) {
    this.parsedActivity = this.parseActivityToArray(XMLActivity);
    this.fullInfoActivity = this.fullActivityInfo();
    this.totalDistance =
      this.fullInfoActivity[this.fullInfoActivity.length - 1].totalDistance;
  }

  parseActivityToArray(activity: any) {
    let trkptArray = activity.gpx.trk.trkseg.trkpt;
    let activityArray = [];
    for (let index in trkptArray) {
      let idx = parseInt(index);
      activityArray.push(parseNodeToObj(trkptArray[idx]));
    }
    return activityArray;
  }

  fullActivityInfo() {
    let totalDistance = 0;
    let activityArray = [
      { ...this.parsedActivity[0], totalDistance: 0, distanceFromLast: 0 },
    ];
    for (let index in this.parsedActivity) {
      let idx = parseInt(index);
      let currentNode = this.parsedActivity[idx];
      if (idx > 0) {
        let previousNode = activityArray[idx - 1];
        totalDistance += distanceBtwnPoints(previousNode, currentNode);
        activityArray.push({
          ...this.parsedActivity[idx],
          totalDistance: totalDistance,
          distanceFromLast: distanceBtwnPoints(previousNode, currentNode),
        });
      }
    }
    return activityArray;
  }
}

let newActivity = new Activity(jsonObj);
newActivity.fullActivityInfo();
console.log(newActivity);
