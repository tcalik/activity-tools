import parseNodeToObj from "./parseNodeToObj";
import distanceBtwnPoints from "./distanceBtwnPoints";
import type { ParsedTrackpoint } from "./interfaces/ParsedTrackpoint.interface";
import type { ParsedGPX } from "./interfaces/ParsedGPX.interface";

export class Activity {
    parsedActivity: ParsedTrackpoint[];
  
    constructor(XMLActivity: ParsedGPX) {
      this.parsedActivity = this.parseActivityToArray(XMLActivity);
    }
  
    parseActivityToArray(activity: ParsedGPX) {
      let trkptArray = activity.gpx.trk.trkseg.trkpt;
      let activityArray = [];
      for (let index in trkptArray) {
        let idx = parseInt(index);
        activityArray.push(parseNodeToObj(trkptArray[idx]));
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
          ((activity[activity.length - 1].time.getTime() - activity[0].time.getTime()) / 1000)
        ).toFixed(2)
      );
      return speed;
    }
  
    get averageHeartRate() {
      let hrSum = 0;
      let noHeartRateNodes = 0
      for (let index in this.parsedActivity) {
        let idx = parseInt(index);
        let currentNode = this.parsedActivity[idx];
        if(currentNode.hr){
        hrSum += currentNode.hr;
        }
        else{
          noHeartRateNodes++
        }
      }
      let averageHR = hrSum / this.parsedActivity.length - noHeartRateNodes;
      return Math.round(averageHR);
    }
  }