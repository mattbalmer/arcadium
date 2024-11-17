export type Person = {
  firstName: string,
  lastName: string,
  sex: 'male' | 'female',
}

export type BoulderState = null | 'top' | 'flash';

export type Score = {
  boulders: Record<number, BoulderState>,
  quests: Record<string, number>,
}

export type Boulder = {
  number: number,
  top: number,
  flash: number,
  state: BoulderState,
}