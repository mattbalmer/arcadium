import * as React from 'react';
import { useMemo } from 'react';
import { FlexCol } from '@client/components/FlexCol';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HikingIcon from '@mui/icons-material/Hiking';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { BoulderPage } from '@client/components/pages/BoulderPage';
import { QuestsPage } from '@client/components/pages/QuestsPage';
import { useCapsuleField } from '@client/hooks/use-capsule';
import { personCapsule } from '@client/capsules/person';
import { IntroDialog } from '@client/components/dialogs/IntroDialog';
import { BoulderState, Person } from '@client/types';
import { FlexRow } from '@client/components/FlexRow';
import { getFinalsPoints, getTotalPoints } from '@client/utils/boulders';
import ClearIcon from '@mui/icons-material/Clear';
import { ConfirmDialog } from '@client/components/ConfirmDialog';

export const MainPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = React.useState<boolean>(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<'Boulders' | 'Quests'>('Boulders');
  const [person, setPerson] = useCapsuleField(personCapsule, 'person');
  const [score, setScore] = useCapsuleField(personCapsule, 'score');

  const totalPoints = useMemo(() => {
    return getTotalPoints(score);
  }, [score]);

  const finalsPoints = useMemo(() => {
    return getFinalsPoints(score);
  }, [score]);

  React.useEffect(() => {
    if (!person) {
      setIsJoinDialogOpen(true);
    }
  }, [person]);

  const handleJoin = (person: Person) => {
    setPerson(person);
    setIsJoinDialogOpen(false);
  }

  const handleBoulderChange = (boulder: number, state: BoulderState) => {
    setScore({
      ...score,
      boulders: {
        ...score.boulders,
        [`${boulder}`]: state,
      }
    });
  }

  const handleReset = () => {
    setScore({
      boulders: {},
      quests: {},
    });
    setPerson(null);
    setIsResetDialogOpen(false);
  }

  return <FlexCol sx={{ flexGrow: 1, height: '100vh', background: '#111' }}>
    <FlexCol sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <FlexRow sx={{ flexGrow: 1, justifyContent: 'space-between' }} >
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              {finalsPoints > 0 ? `${finalsPoints} finals pts (${totalPoints} total)` : `${totalPoints} pts`}
            </Typography>
            <Typography variant='h6' component='div'>
              {person?.firstName} {person?.lastName}
            </Typography>
          </FlexRow>
        </Toolbar>
      </AppBar>
      {page === 'Boulders' && <BoulderPage score={score} onBoulderChange={handleBoulderChange} />}
      {page === 'Quests' && <QuestsPage />}
    </FlexCol>
    <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <Box
        sx={{ display: 'flex', flexGrow: 1, width: 250, flexDirection: 'column', justifyContent: 'space-between' }}
        role='presentation'
        onClick={() => setIsDrawerOpen(false)}
      >
        <FlexCol sx={{ flexGrow: 1 }}>
          <Typography variant={'h6'} sx={{ p: 2 }}>Radium Arcadium</Typography>
          <Divider />
          <List sx={{ width: '100%' }}>
            {(['Boulders', 'Quests'] as const).map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => setPage(text)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <HikingIcon /> : <AutoAwesomeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </FlexCol>
        <List sx={{ width: '100%' }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsResetDialogOpen(true)}>
              <ListItemIcon>
                <ClearIcon />
              </ListItemIcon>
              <ListItemText primary={'Reset'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
    <IntroDialog
      isOpen={isJoinDialogOpen}
      onConfirm={handleJoin}
    />
    <ConfirmDialog
      isOpen={isResetDialogOpen}
      id={'reset'}
      title={'Reset?'}
      onCancel={() => setIsResetDialogOpen(false)}
      onConfirm={handleReset}
      confirmText={'Reset'}
      color={'error'}
    >
      Are you sure you want to reset your progress? This cannot be undone
    </ConfirmDialog>
  </FlexCol>
}