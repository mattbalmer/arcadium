import '@client/debug';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { AppComponent } from '@client/components/pages/AppComponent';
import { HashRouter } from 'react-router-dom';

const USE_STRICT_MODE = false;

const container = document.getElementById('arcadium-app');
const root = createRoot(container!);

root.render(<>
  {USE_STRICT_MODE ?
    <React.StrictMode>
      <HashRouter>
        <AppComponent/>
      </HashRouter>
    </React.StrictMode>
  :
    <HashRouter>
      <AppComponent/>
    </HashRouter>
  }
</>);