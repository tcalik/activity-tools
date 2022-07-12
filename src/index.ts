import * as fs from "fs";
import { XMLParser } from "fast-xml-parser";
import parseNodeToObj from "./parseNodeToObj";
import distanceBtwnPoints from "./distanceBtwnPoints";

const parser = new XMLParser({
  removeNSPrefix: true,
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const fileToParse = fs.readFileSync(`${__dirname}/tests/8_AWF.gpx`, "utf-8");

let jsonObj = parser.parse(fileToParse);

export let parseActivityToArray = (activity: any) => {
  let trkptArray = activity.gpx.trk.trkseg.trkpt;
  let activityArray = [];
  for (let index in trkptArray) {
    let idx = parseInt(index);
    activityArray.push(parseNodeToObj(trkptArray[idx]));
  }
  return activityArray;
};

/*export let parseActivityToArray = (activity: any) => {
  let totalDistance = 0;
  let trkptArray = activity.gpx.trk.trkseg.trkpt;
  let activityArray = [{...parseNodeToObj(trkptArray[0]), totalDistance: 0, distanceFromLast: 0}];
  for (let index in trkptArray) {
    let idx = parseInt(index);
    let currentNode = trkptArray[idx];
    if (idx > 0) {
      let previousNode = activityArray[idx - 1];
      totalDistance += distanceBtwnPoints(previousNode, currentNode);
      activityArray.push({...parseNodeToObj(currentNode), totalDistance: totalDistance, distanceFromLast: distanceBtwnPoints(previousNode, currentNode)});
    }
  }*/

  let calculateTotalDistance = (activity: any) => {
    let totalDistance = 0
    for (let index in activity){
      let currentNode = activity[index]
      let idx = parseInt(index)
      if (idx > 0) {
        let previousNode = activity[idx - 1];
        totalDistance += distanceBtwnPoints(previousNode, currentNode);
      }
    }
    return totalDistance;
  }

  let x = parseActivityToArray(jsonObj)

  console.log(calculateTotalDistance(x))