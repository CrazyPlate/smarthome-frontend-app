import React from 'react';

import Backdrop from './components/Backdrop/BackDrop';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import LightsPage from './components/pages/Lights/Lights';
import ClimatePage from './components/pages/Climate/Climate';
import TrendPage from './components/pages/Trend/Trend';

import './App.css';

class App extends React.Component {
  state = {
    sideDrawerOpen: false,
    activePage: "lights"
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return {
        sideDrawerOpen: !prevState.sideDrawerOpen
      };
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  changePageHandler = (page) => {
    this.setState({activePage: page});
  }

  render() {
    let backdrop;
    let activePage;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>
    }

    if (this.state.activePage === "lights") {
      activePage = <LightsPage />
    } else if (this.state.activePage === "climate") {
      activePage = <ClimatePage />
    } else if (this.state.activePage === "trend") {
      activePage = <TrendPage />
    }

    return (
      <div className="App">
        <Toolbar 
          drawerClickHandler={this.drawerToggleClickHandler}
          changePageHandler={this.changePageHandler}
        />
        <SideDrawer
          show={this.state.sideDrawerOpen}
          changePageHandler={this.changePageHandler}
          backdrop={this.backdropClickHandler}
        />
        {backdrop}
        <main>
          {activePage}
        </main>
      </div>
    );
  }
}

export default App;
