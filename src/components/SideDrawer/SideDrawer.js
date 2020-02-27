import React from 'react';

import './SideDrawer.css';
import { render } from '@testing-library/react';

class sideDrawer extends React.Component {
    clickLightsPageHandler = () => {
        this.props.changePageHandler("lights");
        this.props.backdrop();
    }

    clickClimatePageHandler = () => {
        this.props.changePageHandler("climate");
        this.props.backdrop();
    }

    render() {
        let drawerClasses = "side-drawer";

        if (this.props.show) {
            drawerClasses = "side-drawer open";
        }
        return (
            <nav className={drawerClasses}>
                <ul>
                    <li onClick={this.clickLightsPageHandler}>Lights</li>
                    <li onClick={this.clickClimatePageHandler}>Climate</li>
                </ul>
            </nav>
        )
    }
};

export default sideDrawer;