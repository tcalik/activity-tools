export type TrackpointElement = {
  lat: number;
  lon: number;
  ele?: number;
  time?: string;
  hr?: number;
  cad?: number;
  atemp?: number;
};

// Destructuring and flattening parsed trackpoint
const parseNodeToObj = (currentNode: any) => {
  let { lat, lon, ele, time } = currentNode;

  let { atemp, hr, cad } = currentNode.extensions.TrackPointExtension;

  let trackPoint: TrackpointElement = {
    lat: parseFloat(lat),
    lon: parseFloat(lon),
  };

  if (ele) {
    trackPoint.ele = ele;
  }
  if (time) {
    trackPoint.time = time;
  }
  if (atemp || atemp == 0) {
    trackPoint.atemp = atemp;
  }
  if (cad || cad == 0) {
    trackPoint.cad = cad;
  }
  if (hr || hr == 0) {
    trackPoint.hr = hr;
  }

  return trackPoint;
};
export default parseNodeToObj;
