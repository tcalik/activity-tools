export interface GPXTrackpoint {
  lat: string ;
  lon: string ;
  time: string;
  ele?:  number;
  extensions?: {
    TrackPointExtension: { atemp?: number; hr?: number; cad?: number };
  };
}
