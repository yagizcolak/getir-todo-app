// src/assets/index.ts

import WorkImage from './images/work.jpeg';
import HealthImage from './images/health.jpeg';
import HomeImage from './images/home.jpeg';
import OtherImage from './images/other.jpeg';

export const categoryImages: Record<string, string> = {
  'Work': WorkImage,
  'Health & Wellbeing': HealthImage,
  'Home & Maintenance': HomeImage,
  'Other': OtherImage,
};