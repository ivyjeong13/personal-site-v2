import { createContext } from 'react';
import { CollectableContextType } from '../_types';

const CollectablesContext = createContext<CollectableContextType>({
  character: null,
  minions: [],
  mounts: [],
  totalMinions: 0,
  totalMounts: 0,
});

export default CollectablesContext;
