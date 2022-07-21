import type { GPXTrackpoint } from "./GPXTrackpoint.interface";

export interface ParsedGPX {
  gpx: {
    metadata: { time: string };
    trk: { name: string; type?: string | number; trkseg: {
      trkpt: GPXTrackpoint[]
    } };
    creator: string;
    schemaLocation: string;
    version: string;
  };
}
