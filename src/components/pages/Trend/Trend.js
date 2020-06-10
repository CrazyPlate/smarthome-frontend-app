import React from 'react';

import TrendComponent from './TrendComponent/TrendComponent';
import EnergyComponent from './EnergyComponent/EnergyComponent';
import './Trend.css';

const trendPage = props => {
    return (
        <div className="trend-wrapper">
            <TrendComponent temperature name="Temperatura"/>
            <EnergyComponent energy name="Energia"/>
        </div>
    );
}

export default trendPage;