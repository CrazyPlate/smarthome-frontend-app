import React from 'react';

import EnergyTrend from './EnergyTrend/EnergyTrend';

class energyComponent extends React.Component {
    state = {
        isChecked: false,
    }

    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render() {
        let containerClasses = "trend-container";
        let actionClasses = "trend-container__action trend-container__action-invisible";

        if (this.state.isChecked) {
            containerClasses = "trend-container trend-container__checked";
            actionClasses = "trend-container__action";
        }
        
        return (
            <div className={containerClasses}>
                <div className="trend-container__main">
                    <div className="trend-container__name">{this.props.name}</div>
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
                    {this.props.energy && <div><EnergyTrend /></div>}
                </div>}
            </div>
        );
    }
}

export default energyComponent;