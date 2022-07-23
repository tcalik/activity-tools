import parseNodeToObj from "./parseNodeToObj";
import distanceBtwnPoints from "./distanceBtwnPoints";
import { loopThroughByPair } from "./utils/loopThroughByPair";
import { timeDifference } from "./utils/timeDifference";
import type { ParsedTrackpoint } from "./interfaces/ParsedTrackpoint.interface";
import type { ParsedGPX } from "./interfaces/ParsedGPX.interface";

export class Activity {
  parsedActivity: ParsedTrackpoint[];

  constructor(XMLActivity: ParsedGPX) {
    this.parsedActivity = this.parseGPXToArray(XMLActivity);
  }

  parseGPXToArray(activity: ParsedGPX) {
    let trkptArray = activity.gpx.trk.trkseg.trkpt;
    let activityArray: ParsedTrackpoint[] = [];
    trkptArray.forEach((trackpoint) => {
      activityArray.push(parseNodeToObj(trackpoint));
    });
    return activityArray;
  }

  get totalDistance() {
    return this.distanceAtInterval(0, this.parsedActivity.length);
  }

  get averageSpeed() {
    let activity = this.parsedActivity;
    let speed = parseFloat(
      (
        (3.6 * this.totalDistance) /
        ((activity[activity.length - 1].time.getTime() -
          activity[0].time.getTime()) /
          1000)
      ).toFixed(2)
    );
    return speed;
  }

  get averageHeartRate() {
    let hrSum = 0;
    let noHeartRateNodes = 0;

    this.parsedActivity.forEach((trackpoint) => {
      if (trackpoint.hr) {
        hrSum += trackpoint.hr;
      } else {
        noHeartRateNodes++;
      }
    });

    let averageHR = hrSum / this.parsedActivity.length - noHeartRateNodes;
    return Math.round(averageHR);
  }

  get speedAtNode() {
    let speedNodeArray = [0];
    loopThroughByPair(this.parsedActivity, (prev: any, curr: any) => {
      let distanceDifference = distanceBtwnPoints(prev, curr);
      let timeDiff = timeDifference(prev, curr);
      speedNodeArray.push(
        parseFloat(((3.6 * distanceDifference) / timeDiff).toFixed(2))
      );
    });
    return speedNodeArray;
  }

  speedAtInterval(startIndex: number, endIndex: number) {
    let speed = 0;
    let distanceDifference = this.distanceAtInterval(startIndex, endIndex);
    let timeDiff = timeDifference(
      this.parsedActivity[startIndex],
      this.parsedActivity[endIndex]
    );
    speed = parseFloat(((3.6 * distanceDifference) / timeDiff).toFixed(2));
    return speed;
  }

  distanceAtInterval(startIndex: number, endIndex: number) {
    let distance = 0;
    let interval = this.parsedActivity.slice(startIndex, endIndex);
    loopThroughByPair(interval, (prev: any, curr: any) => {
      distance += distanceBtwnPoints(prev, curr);
    });
    return parseFloat(distance.toFixed(2));
  }
  
averagePropertyAtInterval(startIndex:number, endIndex:number, propertyName: "hr" | "cad" | "atemp"){
  let propertySum = 0;
  let interval = this.parsedActivity.slice(startIndex, endIndex)
  interval.forEach((trackpoint) => {
    let x = trackpoint[propertyName]
    if (x) {
      propertySum += x;
    } 
  });

  let averageProperty = propertySum / interval.length;
  return Math.round(averageProperty);
}


}
// TODO: TCX parsing
// TODO: Interval data. Interval speed, distance, time.
