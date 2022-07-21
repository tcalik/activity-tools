export interface ParsedTrackpoint {
  lat: number;
  lon: number;
  ele?: number;
  time: Date;
  hr?: number;
  cad?: number;
  atemp?: number;
};
