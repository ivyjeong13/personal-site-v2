import { Grid2 } from '@mui/material';
import { useContext } from 'react';
import CollectablesContext from '../../_context/collectables';
import MountListItem from './mount';

const UnownedMountList = () => {
  const { mounts, character } = useContext(CollectablesContext);
  const characterMounts = new Set(
    (character?.mounts ?? []).map((mount) => mount.name),
  );
  const unownedMounts = mounts.filter(
    (mount) => !characterMounts.has(mount.name),
  );

  return (
    <Grid2 container spacing={2}>
      {unownedMounts.map((mount) => (
        <Grid2 key={mount.id} size={{ sm: 12, md: 6 }}>
          <MountListItem mount={mount} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default UnownedMountList;
