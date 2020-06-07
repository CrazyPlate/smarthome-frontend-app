import React from 'react';

import './SideDrawer.css';

class sideDrawer extends React.Component {
    clickLightsPageHandler = () => {
        this.props.changePageHandler("lights");
        this.props.backdrop();
    }

    clickClimatePageHandler = () => {
        this.props.changePageHandler("climate");
        this.props.backdrop();
    }

    clickTrendPageHandler = () => {
        this.props.changePageHandler("trend");
        this.props.backdrop();
    }

    clickModbusPageHandler = () => {
        this.props.changePageHandler("modbus");
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
                    <li onClick={this.clickLightsPageHandler}><i className="fa fa-lightbulb"></i>Lights</li>
                    <li onClick={this.clickClimatePageHandler}><i className="fa fa-cloud-sun"></i>Climate</li>
                    <li onClick={this.clickTrendPageHandler}><i className="fa fa-cloud-sun"></i>Trend</li>
                    <li onClick={this.clickModbusPageHandler}><i className="fa fa-cloud-sun"></i>Modbus</li>
                </ul>
            </nav>
        )
    }
};

export default sideDrawer;