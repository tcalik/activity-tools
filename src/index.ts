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
  parsedActivity: any;
  fullInfoActivity: any;

  constructor(XMLActivity: any) {
    this.parsedActivity = this.parseActivityToArray(XMLActivity);
    this.fullInfoActivity = this.fullActivityInfo();
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
        let distanceDifference = distanceBtwnPoints(previousNode, currentNode);
        let timeDifference =
          (new Date(currentNode.time).getTime() -
            new Date(previousNode.time).getTime()) /
          1000;

        let speedAtInterval = parseFloat(
          ((distanceDifference / timeDifference) * 3.6).toFixed(2)
        );

        totalDistance += distanceDifference;
        activityArray.push({
          ...this.parsedActivity[idx],
          totalDistance: totalDistance,
          distanceFromLast: distanceBtwnPoints(previousNode, currentNode),
          speed: speedAtInterval,
        });
      }
    }
    return activityArray;
  }
  get totalDistance() {
    let totalDistance = 0;
    for (let index in this.parsedActivity) {
      let idx = parseInt(index);
      let currentNode = this.parsedActivity[idx];
      if (idx > 0) {
        let previousNode = this.parsedActivity[idx - 1];
        let distanceDifference = distanceBtwnPoints(previousNode, currentNode);
        totalDistance += distanceDifference;
      }
    }
    return parseFloat(totalDistance.toFixed(2));
  }
  get averageSpeed() {
    let activity = this.parsedActivity;
    let speed = parseFloat(
      (
        (3.6 * this.totalDistance) /
        ((activity[activity.length - 1].time - activity[0].time) / 1000)
      ).toFixed(2)
    );
    return speed;
  }

  get averageHeartRate() {
    let hrSum = 0;
    for (let index in this.parsedActivity) {
      let idx = parseInt(index);
      let currentNode = this.parsedActivity[idx];
      hrSum += currentNode.hr;
    }
    let averageHR = hrSum / this.parsedActivity.length;
    return Math.round(averageHR);
  }
}

let newActivity = new Activity(jsonObj);
