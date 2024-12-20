import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Outlet, Route, Routes } from 'react-router-dom';
import { MainPage } from '@client/components/pages/MainPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ForceNav = ({ to }: { to: string }) => {
  window.location.href = to;
  return <></>
}

const AppLayout = () => {
  return <>
    <ThemeProvider theme={darkTheme}>
      <Outlet />
    </ThemeProvider>
  </>
}

export const AppComponent = () => {
  return <>
    <Routes>
      <Route path={'/'} element={<AppLayout />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path="" element={<ForceNav to={'/'} />} />
    </Routes>
  </>
}