import parseNodeToObj from "./parseNodeToObj";
import distanceBtwnPoints from "./distanceBtwnPoints";
import { loopThroughByPair } from "./utils/pairLoopInArray";
import { timeDifference } from "./utils/timeDifference";
import type { ParsedTrackpoint } from "./interfaces/ParsedTrackpoint.interface";
import type { ParsedGPX } from "./interfaces/ParsedGPX.interface";

export class Activity {
  parsedActivity: ParsedTrackpoint[];

  constructor(XMLActivity: ParsedGPX) {
    this.parsedActivity = this.parseActivityToArray(XMLActivity);
  }

  parseActivityToArray(activity: ParsedGPX) {
    return this.parseGPXToArray(activity);
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
    let totalDistance = 0;

    loopThroughByPair(this.parsedActivity, (prev: any, curr: any) => {
      totalDistance += distanceBtwnPoints(prev, curr);
    });

    return parseFloat(totalDistance.toFixed(2));
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
      let timeDiff = timeDifference(curr, prev);
      speedNodeArray.push(
        parseFloat(((3.6 * distanceDifference) / timeDiff).toFixed(2))
      );
    });
    return speedNodeArray;
  }
}
// TODO: TPX parsing
// TODO: Interval data. Interval speed, distance, time.
