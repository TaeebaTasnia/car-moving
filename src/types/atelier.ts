export interface VehicleBuild {
  id: string;
  name: string;
  subtitle: string;
  chassis: string;
  engine: string;
  power: string;
  acceleration: string;
  topSpeed: string;
  position: 'left' | 'center' | 'right';
  spotlightColor: string;
  accentColor: string;
  description: string;
  features: string[];
}

export interface TransitionPhase {
  id: string;
  title: string;
  timeRange: string;
  timeStart: number;
  timeEnd: number;
  badge: string;
  headline: string;
  subtext: string;
  frameImage: string;
  cameraMovement: string;
  easingCurve: string;
  lightingSetup: string;
  interactionModel: string;
  technicalDetails: string[];
}

export interface CraftImage {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
}
