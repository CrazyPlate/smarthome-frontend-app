import React from 'react';

import TrendComponent from './TrendComponent/TrendComponent';
import './Trend.css';

const trendPage = props => {
    return (
        <div className="trend-wrapper">
            <TrendComponent temperature name="Temperature"/>
        </div>
    );
}

export default trendPage;