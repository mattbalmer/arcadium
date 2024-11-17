import { Score } from '@client/types';

export const pointsForTop = (n: number): number => {
  if (n < 1 || n > 50) return 0;
  if (n <= 5) return 1;
  if (n <= 10) return 2;
  if (n <= 20) return 4;
  if (n <= 25) return 6;
  if (n <= 30) return 8;
  if (n <= 25) return 10;
  if (n <= 40) return 15;
  if (n <= 45) return 20;
  if (n <= 50) return 25;
}

export const pointsForFlash = (n: number): number => {
  if (n < 1 || n > 50) return 0;
  if (n <= 40) return 1;
  if (n <= 50) return 2;
}

export const countsForFinals = (n: number): boolean => {
  return n >= 31 && n <= 50;
}

export const getTotalPoints = (score: Score): number => {
  return Object.entries(score.boulders).reduce((total, [boulderID, result]) => {
    const boulder = parseInt(boulderID, 10);
    const points = (result ? pointsForTop(boulder) : 0) +
      (result === 'flash' ? pointsForFlash(boulder) : 0)
    ;
    return total + points;
  }, 0);
}
export const getFinalsPoints = (score: Score): number => {
  return Object.entries(score.boulders)
    .filter(([boulderID, result]) => countsForFinals(parseInt(boulderID, 10)))
    .reduce((total, [boulderID, result]) => {
      const boulder = parseInt(boulderID, 10);
      const points = (result ? pointsForTop(boulder) : 0) +
        (result === 'flash' ? pointsForFlash(boulder) : 0)
      ;
      return total + points;
    }, 0);
}