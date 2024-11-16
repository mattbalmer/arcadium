import * as React from 'react';
import { FlexCol } from '@client/components/FlexCol';
import { Typography } from '@mui/material';

export const MainPage = () => {
  return <FlexCol sx={{ flexGrow: 1, height: '100vh', background: '#111' }}>
    <Typography variant={'h1'}>Hello World</Typography>
  </FlexCol>
}