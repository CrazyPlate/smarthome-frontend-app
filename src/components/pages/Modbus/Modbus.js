import React from 'react';

import './Modbus.css';
import ModbusComponent from './ModbusComponent/ModbusComponent';

const modbusPage = props => {
    return (
        <div className="modbus-wrapper">
            <ModbusComponent name="Modbus"/>
        </div>
    );
}

export default modbusPage;