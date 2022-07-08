const distanceBtwnPoints = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  // Convert degrees to radians
  lat1 = (lat1 * Math.PI) / 180.0;
  lon1 = (lon1 * Math.PI) / 180.0;
  lat2 = (lat2 * Math.PI) / 180.0;
  lon2 = (lon2 * Math.PI) / 180.0;

  // radius of earth in metres
  let r = 6378137;
  // P
  let rho1 = r * Math.cos(lat1);
  let z1 = r * Math.sin(lat1);
  let x1 = rho1 * Math.cos(lon1);
  let y1 = rho1 * Math.sin(lon1);

  // Q
  let rho2 = r * Math.cos(lat2);
  let z2 = r * Math.sin(lat2);
  let x2 = rho2 * Math.cos(lon2);
  let y2 = rho2 * Math.sin(lon2);

  // Dot product
  let dot = x1 * x2 + y1 * y2 + z1 * z2;
  let cos_theta = dot / (r * r);
  let theta = Math.acos(cos_theta);

  // Distance in Metres
  return parseFloat((r * theta).toFixed(3));
};

export default distanceBtwnPoints;
