import React from 'react';

import ClimateComponent from './ClimateComponent/ClimateComponent';
import './Climate.css';

const climatePage = props => {
    return (
        <div className="lights-wrapper">
            <ClimateComponent temperatureOutside name="Temperatura zewnętrzna" />
            <ClimateComponent temperatureInside name="Temperatura kuchnia" />
            <ClimateComponent humidity name="Wilgotność salon" />
        </div>
    );
}

export default climatePage;