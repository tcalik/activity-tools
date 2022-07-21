import type { ParsedTrackpoint } from "./interfaces/ParsedTrackpoint.interface";
import type { GPXTrackpoint } from "./interfaces/GPXTrackpoint.interface";
// Destructuring and flattening parsed trackpoint
const parseNodeToObj = (currentNode: GPXTrackpoint) => {
  let { lat, lon, ele, time } = currentNode;

  let trackPoint: ParsedTrackpoint = {
    lat: parseFloat(lat),
    lon: parseFloat(lon),
    time: new Date(time),
  };

  if (ele) {
    trackPoint.ele = ele;
  }

  if (currentNode.extensions?.TrackPointExtension) {
    let { atemp, hr, cad } = currentNode.extensions.TrackPointExtension;

    if (atemp || atemp == 0) {
      trackPoint.atemp = atemp;
    }
    if (cad || cad == 0) {
      trackPoint.cad = cad;
    }
    if (hr || hr == 0) {
      trackPoint.hr = hr;
    }
  }

  return trackPoint;
};
export default parseNodeToObj;
