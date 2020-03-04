import React from 'react';

import ClimateComponent from './ClimateComponent/ClimateComponent';
import './Climate.css';

const climatePage = props => {
    return (
        <div className="lights-wrapper">
            <ClimateComponent temperature name="Temperature" />
            <ClimateComponent humidity name="Humidity" />
        </div>
    );
}

export default climatePage;