import React from 'react';
import "./ToggleDigitalPin.css";

class toggleDigitalPin extends React.Component {

    state = {
        pin: "9",
        pinState: "D0"
    }

    /* componentWillMount() {
        this.fetchPinState();
    }

    fetchPinState = async () => {
        const requestBody = {
            query: ``
        };
    
        await fetch("http://192.168.1.214:4000/graphql", {
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
            const pinState = resData.data;
            this.setState({
                pinState: pinState
            })
        })
    } */

    togglePin = () => {
        if (this.state.pinState === "D0") {
            this.setState({
                pinState: "D1"
            })
        } else if (this.state.pinState === "D1") {
            this.setState({
                pinState: "D0"
            })
        }

        const requestBody = {
            query: `
                mutation LedWrite($pin: String!, $data: String!) {
                    ledWrite(order: "W", pin: $pin, data: $data) {
                        pin
                        data
                    }
                }
            `,
            variables: {
                pin: this.state.pin,
                data: this.state.pinState
            }
        }

        fetch("http://192.168.0.214:4000/graphql", {
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
            
        })
        .catch(err => {
            throw Error('Toggle Pin Error');
        })
    }

    render() {
        return (
            <div>
                <div className="button" onClick={this.togglePin}>Toggle LED</div>
            </div>
        );
    }
}

export default toggleDigitalPin;