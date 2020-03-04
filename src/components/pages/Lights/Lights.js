import React from 'react';

import LightComponent from './LightComponent/LightComponent';
import './Lights.css';

const lightsPage = props => {
    return (
        <div className="lights-wrapper">
            <LightComponent dimmer name="Dimmer" />
            <LightComponent RGB name="RGB" />
            <LightComponent />
        </div>
    );
}

export default lightsPage;