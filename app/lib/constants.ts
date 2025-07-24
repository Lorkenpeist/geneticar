// TODO: refactor this into car-props files

// A car property that can be configured via sliders and/or genes
export interface ConfigurableCarProp {
  min: number;
  max: number;
  default: number;
  // The step size for discrete sliders
  // TODO: remove this
  stepSize?: number;
}

// Constants for the simulation options
export const CAR_COUNT_MIN = 1;
export const CAR_COUNT_MAX = 4;
export const CAR_COUNT_DEFAULT = 3;

export const CAR_LENGTH: ConfigurableCarProp = {
  min: 10,
  max: 100,
  default: 100,
  stepSize: 10,
};
export const CAR_HEIGHT: ConfigurableCarProp = {
  min: 10,
  max: 100,
  default: 50,
  stepSize: 10,
};
export const CAR_WHEEL_SIZE: ConfigurableCarProp = {
  min: 10,
  max: 50,
  default: 30,
  stepSize: 10,
};
// TODO: rename this to CAR_ENGINE_TORQUE everywhere
export const CAR_TORQUE: ConfigurableCarProp = {
  min: 0,
  max: 1,
  default: 0.5,
  stepSize: 0.1,
};
export const CAR_RPM_LIMIT: ConfigurableCarProp = {
  min: 100,
  max: 1000,
  default: 300,
  stepSize: 100,
};

export const ROAD_SEGMENT_LENGTH = 100;
export const ROAD_SEGMENT_HEIGHT = 10;

// Constants for rendering
export const WHEEL_SPRITE_LOCATION = "/wheel-sectors-svgrepo-com.svg";
export const WHEEL_SPRITE_SIZE = 800;
