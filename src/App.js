import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CampaignDataTable from './components/CampaignDataTable';
import NavBar from './components/layouts/NavBar';
import FooterBar from './components/layouts/FooterBar';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar/>
      <Container maxWidth="lg">
        <CampaignDataTable/>
      </Container>
      <FooterBar/>
    </React.Fragment>
  );
}

export default App;
