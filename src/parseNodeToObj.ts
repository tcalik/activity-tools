type TrackpointElement = {
  lat: number;
  lon: number;
  ele?: number;
  time?: string;
  hr?: number;
  cad?: number;
  temp?: number;
};

const parseNodeToObj = (currentNode: Element) => {
  let extension = currentNode
    .getElementsByTagName("extensions")[0]
    .childNodes[1].nodeName.split(":")[0];

  // New Trackpoint object is always initialized with the latitude and longtitude properties
  let nodeObj: TrackpointElement = {
    lat: parseFloat(currentNode.attributes[0].value),
    lon: parseFloat(currentNode.attributes[1].value),
  };

  // Read existing properties from node
  let nodeTime = currentNode.getElementsByTagName("time")[0]?.textContent;
  let elevation = currentNode.getElementsByTagName("ele")[0]?.textContent;
  let heartRate = currentNode.getElementsByTagName(
    `${extension ? extension + ":" : ""}hr`
  )[0]?.textContent;
  let cadence = currentNode.getElementsByTagName(
    `${extension ? extension + ":" : ""}cad`
  )[0]?.textContent;
  let atemp = currentNode.getElementsByTagName(
    `${extension ? extension + ":" : ""}atemp`
  )[0]?.textContent;

  //Add existing properties to node
  if (nodeTime !== null) nodeObj.time = nodeTime;
  if (elevation !== null) nodeObj.ele = parseFloat(elevation);
  if (heartRate !== null) nodeObj.hr = parseInt(heartRate);
  if (cadence !== null) nodeObj.cad = parseInt(cadence);
  if (atemp !== null) nodeObj.temp = parseInt(atemp);

  return nodeObj;
};

export default parseNodeToObj;
