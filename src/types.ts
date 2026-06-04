export type Screen = 'LOGIN' | 'ONBOARDING' | 'HOME' | 'ANALYSIS' | 'PLANT_JOURNEY' | 'LEADERBOARD' | 'PROFILE' | 'INVENTORY_SELECT';

export type OnboardingStep = 'SHOWER' | 'DISHES' | 'LAUNDRY';

export interface UserStats {
  streak: number;
  totalSavings: number;
  treesSaved: number;
  level: number;
  xp: number;
  maxXp: number;
}
