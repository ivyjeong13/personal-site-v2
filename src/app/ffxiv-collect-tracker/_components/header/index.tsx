'use client';

import { XivIcon } from '@/common/assets/icons';
import useIsMobile from '@/common/hooks/use-is-mobile';
import { centeredFlexStyles } from '@/common/styles';
import {
  Alert,
  Box,
  ClickAwayListener,
  IconButton,
  Portal,
  Snackbar,
  styled,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { cinzel, thasadith } from '../../_fonts';
import CharacterSearch from './character-search';

const HeaderContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: 64,
    '&::before': {
      top: '64px !important',
    },
  },
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: 86,
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  zIndex: 2,
  '&::before': {
    content: '""',
    top: 86,
    left: 0,
    width: '100%',
    position: 'fixed',
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1))',
    height: theme.spacing(1),
  },
}));

const DesktopContent = styled(Box)(({ theme }) => ({
  height: '100%',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  padding: `0px ${theme.spacing(2)}`,
}));

const DesktopHeaderLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  gap: theme.spacing(4),
}));

const DesktopHeaderRight = styled(Box)({
  ...centeredFlexStyles,
  display: 'flex',
});

const HeaderItem = styled(Typography)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  fontFamily: thasadith.style.fontFamily,
  fontWeight: 400,
  '&:hover': {
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 1,
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
}));

const HeaderHomeItem = styled(HeaderItem)({
  fontFamily: cinzel.style.fontFamily,
  fontWeight: 400,
});

const MobileTitle = styled(Typography)({
  fontFamily: cinzel.style.fontFamily,
  fontWeight: 400,
  fontSize: 18,
});

const MobileContent = styled(Box)(({ theme }) => ({
  ...centeredFlexStyles,
  height: '100%',
  gap: theme.spacing(1),
}));

const MobileNavigationButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  left: theme.spacing(1),
  position: 'absolute',
  top: theme.spacing(1.5),
}));

const MobileNavigation = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 64,
  left: 0,
  width: '100%',
  height: 'auto',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  zIndex: 2,
  '&::before': {
    content: '""',
    bottom: `-${theme.spacing(1)}`,
    left: 0,
    width: '100%',
    position: 'absolute',
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1))',
    height: theme.spacing(1),
  },
}));

const MobileNavigationItem = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(1)} 0px`,
  width: '100%',
}));

const Header = () => {
  const [showMobileNavigation, setShowMobileNavigation] = useState(false);
  const [showNotifyUnderConstruction, setNotifyUnderConstruction] =
    useState(false);
  const isMobile = useIsMobile();
  const headerTitle = 'XIV Completionist';

  const handleClickLink = () => {
    setNotifyUnderConstruction(true);
  };

  const handleCloseNotify = () => setNotifyUnderConstruction(false);
  const handleCloseMobileNavigation = () => setShowMobileNavigation(false);

  return (
    <HeaderContainer>
      {isMobile ? (
        <>
          <MobileNavigationButton onClick={() => setShowMobileNavigation(true)}>
            <MenuIcon />
          </MobileNavigationButton>
          <MobileContent>
            <XivIcon /> <MobileTitle>{headerTitle}</MobileTitle>
          </MobileContent>
          {showMobileNavigation && (
            <Portal>
              <ClickAwayListener onClickAway={handleCloseMobileNavigation}>
                <MobileNavigation>
                  <MobileNavigationItem>
                    <CharacterSearch onClose={handleCloseMobileNavigation} />
                  </MobileNavigationItem>
                </MobileNavigation>
              </ClickAwayListener>
            </Portal>
          )}
        </>
      ) : (
        <DesktopContent>
          <DesktopHeaderLeft>
            <HeaderHomeItem>{headerTitle}</HeaderHomeItem>
            <HeaderItem onClick={handleClickLink}>Mounts</HeaderItem>
            <HeaderItem onClick={handleClickLink}>Minions</HeaderItem>
            <HeaderItem onClick={handleClickLink}>Achievements</HeaderItem>
          </DesktopHeaderLeft>
          <DesktopHeaderRight>
            <CharacterSearch />
          </DesktopHeaderRight>
        </DesktopContent>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showNotifyUnderConstruction}
        autoHideDuration={3000}
        onClose={handleCloseNotify}
      >
        <Alert onClose={handleCloseNotify} severity="info" variant="filled">
          Currently under construction! Coming Soon!
        </Alert>
      </Snackbar>
    </HeaderContainer>
  );
};

export default Header;
