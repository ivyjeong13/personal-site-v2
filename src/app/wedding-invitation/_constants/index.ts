import SpritesJsonA from '../_assets/sprites_a.json';
import SpritesJsonB from '../_assets/sprites_b.json';
import SpritesJsonC from '../_assets/sprites_c.json';
import SpritesJsonD from '../_assets/sprites_d.json';
import SpritesJsonE from '../_assets/sprites_e.json';
import SpritesJsonF from '../_assets/sprites_f.json';
import SpritesJsonG from '../_assets/sprites_g.json';
import SpritesJsonH from '../_assets/sprites_h.json';
import SpritesJsonI from '../_assets/sprites_i.json';
import SpritesJsonJ from '../_assets/sprites_j.json';
import SpritesJsonK from '../_assets/sprites_k.json';

import DrunkDragonIdle from '../_assets/drunk_dragon_idle.json';
import DrunkDragonHurt from '../_assets/drunk_dragon_hurt.json';
import DrunkDragonDead from '../_assets/drunk_dragon_death.json';

export const spritesMap = new Map<string, object>([
  ['sprites_a.json', SpritesJsonA],
  ['sprites_b.json', SpritesJsonB],
  ['sprites_c.json', SpritesJsonC],
  ['sprites_d.json', SpritesJsonD],
  ['sprites_e.json', SpritesJsonE],
  ['sprites_f.json', SpritesJsonF],
  ['sprites_g.json', SpritesJsonG],
  ['sprites_h.json', SpritesJsonH],
  ['sprites_i.json', SpritesJsonI],
  ['sprites_j.json', SpritesJsonJ],
  ['sprites_k.json', SpritesJsonK],
]);

export const dragonSpriteMap = new Map<string, object>([
  ['drunk_dragon_idle.json', DrunkDragonIdle],
  ['drunk_dragon_hurt.json', DrunkDragonHurt],
  ['drunk_dragon_death.json', DrunkDragonDead],
]);
