import React from 'react';

//import fetchTemp from '../../../../helpers/temperature/temperature';
import Temperature from './Temperature/Temperature';
import Humidity from './Humidity/Humidity';
import './ClimateComponent.css';

class lightComponent extends React.Component {
    state = {
        isChecked: false
    }

    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render() {
        let containerClasses = "light-container";
        let actionClasses = "light-container__action light-container__action-invisible";

        if (this.state.isChecked) {
            containerClasses = "light-container light-container__checked";
            actionClasses = "light-container__action";
        }

        return (
            <div className={containerClasses}>
                <div className="light-container__main">
                    {/* <div><i className="fa fa-angle-down"></i></div> */}
                    <div className="light-container__name">{this.props.name}</div>
                    <div className="toggle-button">
                        <input
                            type="checkbox"
                            name="checkbox"
                            className="cm-toggle"
                            checked={this.state.isChecked}
                            onChange={this.toggleChange}
                        />
                    </div>
                </div>
                {this.state.isChecked && <div className={actionClasses}>
                    {this.props.temperatureInside && <Temperature inside />}
                    {this.props.temperatureOutside && <Temperature outside />}
                    {this.props.humidity && <Humidity />}
                </div>}
            </div>
        );
    }
}

export default lightComponent;