import { Config } from '@client/config';
import { personCapsule } from '@client/capsules/person';

window['Config'] = Config;
window['capsules'] = {
  person: personCapsule,
};