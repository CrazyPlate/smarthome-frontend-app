import React from 'react';

import LightComponent from './LightComponent/LightComponent';
import './Lights.css';

const lightsPage = props => {
    return (
        <div className="lights-wrapper">
            <LightComponent toggleDigitalPin name="On/Off"/>
            <LightComponent dimmer name="Dimmer" />
            <LightComponent RGB name="RGB" />
        </div>
    );
}

export default lightsPage;