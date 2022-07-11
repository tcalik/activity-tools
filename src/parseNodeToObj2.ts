type TrackpointElement = {
  lat: number;
  lon: number;
  ele?: number;
  time?: string;
  hr?: number;
  cad?: number;
  atemp?: number;
};

const parseNodeToObj2 = (currentNode: any) => {
  // Destructuring
  let { lat, lon, ele, time } = currentNode;
  let { atemp, hr, cad } = currentNode.extensions.TrackPointExtension;

  let trackPoint: TrackpointElement = {
    lat: parseFloat(lat),
    lon: parseFloat(lon),
  };

  if (ele) {
    trackPoint.ele = parseFloat(ele);
  }
  if (time) {
    trackPoint.time = time;
  }
  if (atemp || parseInt(atemp) === 0) {
    trackPoint.atemp = parseInt(atemp);
  }
  if (cad || parseInt(cad) === 0) {
    trackPoint.cad = parseInt(cad);
  }
  if (hr || parseInt(hr) === 0) {
    trackPoint.hr = parseInt(hr);
  }

  console.log(trackPoint);
};
export default parseNodeToObj2;
