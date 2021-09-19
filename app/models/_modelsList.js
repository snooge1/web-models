import {
  BalisticCurve
} from "./BalisticCurve";
import {
  DampedHarmonicOscilator
} from "./DampedHarmonicOscilator";
import {
  EarthSatelliteOrbit
} from "./EarthSatelliteOrbit";
import {
  RadioactiveDecay
} from "./RadioactiveDecay";

export const modelsList = (name) => {
  switch (name) {
    case 'balisticCurve':
      return new BalisticCurve();
    case 'dampedHarmonicOscilator':
      return new DampedHarmonicOscilator();
    case 'earthSatelliteOrbit':
      return new EarthSatelliteOrbit();
    case 'radioactiveDecay':
      return new RadioactiveDecay();
  };
};