// A car property that can be configured via sliders and/or genes
export interface CarPropSpec {
  label: string;
  min: number;
  max: number;
  default: number;
  // The step size for discrete properties, if applicable
  // If not specified, the property is considered continuous
  stepSize?: number;
}

export const CAR_PROP_KEYS = [
  "length",
  "height",
  "wheelRadius",
  "engineTorque",
  "rpmLimit",
] as const;
type CarPropKey = (typeof CAR_PROP_KEYS)[number];

export const CAR_PROP_SPECS: Record<CarPropKey, CarPropSpec> = {
  length: {
    label: "Length",
    min: 10,
    max: 100,
    default: 100,
  },
  height: {
    label: "Height",
    min: 10,
    max: 100,
    default: 50,
  },
  wheelRadius: {
    label: "Wheel Radius",
    min: 10,
    max: 50,
    default: 30,
  },
  engineTorque: {
    label: "Engine Torque",
    min: 0,
    max: 1,
    default: 0.5,
  },
  rpmLimit: {
    label: "RPM Limit",
    min: 100,
    max: 1000,
    default: 300,
  },
};

export type CarProperties = Record<CarPropKey, number>;
