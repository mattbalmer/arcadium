import { Capsule } from '@yootil/capsule';
import { Score, Person } from '@client/types';

class PersonCapsule extends Capsule<{
  person: Person,
  score: Score,
}>{}

export const personCapsule = new PersonCapsule('arcadium.person', {
  person: null,
  score: {
    boulders: {},
    quests: {},
  },
});