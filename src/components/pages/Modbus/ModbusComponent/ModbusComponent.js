import React from 'react';

import './ModbusComponent.css';

class modbusComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            isChecked: false,
            isLoading: false,
            address: 71,
            register: 1024,
            data: 0,
            modbusError: false
        }

        this.handleRegisterChange = this.handleRegisterChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.setState({
            isLoading: true
        });
        //this.fetchModbusValue();
    }

    fetchModbusValue (address, register) {
        fetch(`http://192.168.0.214:4000/modbus/adr${address}/reg${register}`, {
        method: 'GET', // or 'PUT'
        body: JSON.stringify(), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
     .then(response => {
        if (response.status === 'OK') {
            this.setState({
                register: response.register,
                data: response.data,
                modbusError: false
            })
        } else if (response.status === 'error') {
            this.setState({
                modbusError: true
            })
        }
    })
     .catch(error => console.error('Error:', error));
    }

    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    handleRegisterChange(e) {
        this.setState({
            register: e.target.value
        })
    }

    handleAddressChange(e) {
        this.setState({
            address: e.target.value
        })
    }

    render() {
        let containerClasses = "modbus-container";
        // eslint-disable-next-line no-unused-vars
        let actionClasses = "modbus-container__action modbus-container__action-invisible";

        if (this.state.isChecked) {
            containerClasses = "modbus-container modbus-container__checked";
            actionClasses = "modbus-container__action";
        }

        return (
            <div className={containerClasses}>
                <div className="modbus-container__main">
                    <div className="modbus-container__name">{this.props.name}</div>
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
                {this.state.modbusError && this.state.isChecked && <div className={actionClasses}>ERROR</div>}
                {this.state.isChecked && <div className={actionClasses}>
                    <div className='modbus-row'> Adres urządzenia 
                        <input type="number" value={this.state.address} onChange={this.handleAddressChange}/>
                    </div>
                    <div className='modbus-row'> Rejestr
                        <input type="number" value={this.state.register} onChange={this.handleRegisterChange}/>
                    </div>  
                    <div className='modbus-row'> Wartość 
                        <input type="number" value={this.state.data} readOnly/>
                    </div>
                    <div className="button" onClick={() => this.fetchModbusValue(this.state.address, this.state.register)} >Read Register</div>
                </div>}
            </div>
        );
    }
}

export default modbusComponent;


/* fetchModbusValue = async () => {
        const requestBody = {
            query: `
                query {
                    modbus {
                        register
                        data
                        date
                    }   
                }
                `
        };
     
        await fetch("http://192.168.0.214:4000/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error("Failed!");
                }
                return res.json();
            })
            .then(resData => {
                const toTwoDigits = (a) => {
                    if (a < 10) {
                        a = a.toString()
                        return '0'+ a;
                    }
                    return a;
                }

                const register = resData.data.modbus.register;
                const data = resData.data.modbus.data;
                const date = new Date(Number(resData.data.modbus.date));
                const day = toTwoDigits(date.getDate());
                const month = toTwoDigits(date.getMonth())
                const year = toTwoDigits(date.getFullYear());
                const hour = toTwoDigits(date.getHours());
                const minute = toTwoDigits(date.getMinutes());
                const sec = toTwoDigits(date.getSeconds());

                

                this.setState({
                    isLoading: false,
                    register: register,
                    data: data,
                    date: `${day}.${month}.${year} - ${hour}:${minute}:${sec}`
                });
            })
     }; */
