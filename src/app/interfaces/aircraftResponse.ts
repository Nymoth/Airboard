export interface AircraftResponse {
  control: {
    landing_gear: number,
    flaps: number
  };
  telemetry: {
    altitude: number,
    airspeed: number
  };
}
