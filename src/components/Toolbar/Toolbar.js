import React from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

class toolbar extends React.Component {

    clickLightsPageHandler = () => {
        this.props.changePageHandler("lights");
    }

    clickClimatePageHandler = () => {
        this.props.changePageHandler("climate");
    }

    render() {
        return (
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div className="toolbar__toggle-button">
                        <DrawerToggleButton
                            click={this.props.drawerClickHandler}
                        />
                    </div>
                    <div className="toolbar__logo"><a href="/">SMARTHOME</a></div>
                    <div className="spacer" />
                    <div className="toolbar__navigation-items">
                        <ul>
                            <li onClick={this.clickLightsPageHandler}>Lights</li>
                            <li onClick={this.clickClimatePageHandler}>Climate</li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
};

export default toolbar;