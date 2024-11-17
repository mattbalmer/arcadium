import * as React from 'react';
import { useMemo, useState } from 'react';
import { FlexCol } from '@client/components/FlexCol';
import { Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Boulder, BoulderState, Score } from '@client/types';
import { pointsForFlash, pointsForTop } from '@client/utils/boulders';
import { FlexRow } from '@client/components/FlexRow';

const getBoundsForTab = (tab: '1' | '2' | '3' | '4' | '5'): [number, number] => {
  switch (tab) {
    case '1':
      return [1, 10];
    case '2':
      return [11, 20];
    case '3':
      return [21, 30];
    case '4':
      return [31, 40];
    case '5':
      return [41, 50];
  }
}

const BoulderList = ({
  boulders,
  onChange,
}: {
  boulders: Boulder[];
  onChange: (boulder: number, state: BoulderState) => void;
}) => {
  return <FlexCol>
    {boulders.map((boulder, i) => {
      return <FlexRow key={i} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <FlexRow sx={{ flexGrow: 1, alignItems: 'center'  }}>
          <Box sx={{ width: 80 }}>
            <Typography variant='body1' sx={{ fontSize: '1.2em' }}>{boulder.number}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: boulder.state ? '#9c9' : '#fff',
              color: '#111',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => onChange(boulder.number, 'top')}
          >
            <Typography variant='caption' sx={{ fontSize: '2em', fontWeight: 'bold' }}>{boulder.top}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: boulder.state === 'flash' ? '#99c' : '#fff',
              color: '#111',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'translate(-5px, -10px)'
            }}
            onClick={() => onChange(boulder.number, 'flash')}
          >
            <Typography variant='subtitle1' sx={{ opacity: 0.67, fontSize: '1em', fontWeight: 'bold' }}>+{boulder.flash}</Typography>
          </Box>
        </FlexRow>
        {boulder.state &&
          <Box
            sx={{
              display: 'flex',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#999',
              color: '#111',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => onChange(boulder.number, null)}
          >
            <Typography variant='subtitle1' sx={{ opacity: 0.67, fontSize: '1em', fontWeight: 'bold' }}>X</Typography>
          </Box>
        }
      </FlexRow>
    })}
  </FlexCol>
}

export const BoulderPage = ({
  score,
  onBoulderChange,
}: {
  score: Score,
  onBoulderChange: (boulder: number, state: BoulderState) => void;
}) => {
  const [currentTab, setCurrentTab] = useState<'1' | '2' | '3' | '4' | '5'>('1');

  const boulders = useMemo(() => {
    const [min, max] = getBoundsForTab(currentTab);

    return Array.from({ length: max - min + 1 }, (_, i): Boulder => {
      const id = min + i;
      return {
        number: id,
        top: pointsForTop(id),
        flash: pointsForFlash(id),
        state: score.boulders[`${id}`],
      };
    });
  }, [score, currentTab]);

  return <FlexCol>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(e, nv) => setCurrentTab(nv)}>
            <Tab label="1-10" value="1" />
            <Tab label="11-20" value="2" />
            <Tab label="21-30" value="3" />
            <Tab label="31-40" value="4" />
            <Tab label="41-50" value="5" />
          </TabList>
        </Box>
        <FlexRow sx={{alignItems: 'center', pl: 3, pt: 2, pr: 3, justifyContent: 'space-between'}}>
          <FlexRow sx={{flexGrow: 1}}>
            <Box sx={{display: 'inline-block', width: 80}}></Box>
            <Box
              sx={{
                display: 'flex',
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='caption'>Top</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='subtitle2' sx={{ opacity: 0.67 }}>Flash</Typography>
            </Box>
          </FlexRow>
          <Box
            sx={{
              display: 'flex',
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant='subtitle2' sx={{ opacity: 0.67 }}>Clear</Typography>
          </Box>
        </FlexRow>
        <TabPanel value="1">
          <BoulderList boulders={boulders} onChange={onBoulderChange} />
        </TabPanel>
        <TabPanel value="2">
          <BoulderList boulders={boulders} onChange={onBoulderChange} />
        </TabPanel>
        <TabPanel value="3">
          <BoulderList boulders={boulders} onChange={onBoulderChange} />
        </TabPanel>
        <TabPanel value="4">
          <BoulderList boulders={boulders} onChange={onBoulderChange} />
        </TabPanel>
        <TabPanel value="5">
          <BoulderList boulders={boulders} onChange={onBoulderChange} />
        </TabPanel>
      </TabContext>
    </Box>
  </FlexCol>
}