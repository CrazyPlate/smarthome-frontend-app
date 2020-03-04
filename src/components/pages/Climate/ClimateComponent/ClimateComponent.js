import React from 'react';

//import fetchTemp from '../../../../helpers/temperature/temperature';
import './ClimateComponent.css';

class lightComponent extends React.Component {
    state = {
        isChecked: false,
        temperature: null,
        humidity: null
    }

    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }
    
    componentWillMount() {
        this.fetchTemperature();
    }

    fetchTemperature = async () => {
        const requestBody = {
           query: `
                 query {
                    temperature {
                       temperature
                    }
                    }
              `
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
              const temperature = resData.data.temperature.temperature;
              /* console.log(temperature);
              return temperature; */
              this.setState({
                temperature: temperature
            })
           })
     };

    render() {
        let containerClasses = "light-container";
        let actionClasses = "light-container__action light-container__action-invisible";

        if (this.state.isChecked) {
            containerClasses = "light-container light-container__checked";
            actionClasses = "light-container__action";
        }        

        return (
            <div className={containerClasses}>
                <div className="light-container__main">
                    {/* <div><i className="fa fa-angle-down"></i></div> */}
                    <div className="light-container__name" onClick={this.fetchTemperature}>{this.props.name}</div>
                    <div className="toggle-button" onClick={this.fetchTemperature}>
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
                    {this.props.temperature && <div className="tempaerature__action" onClick={this.fetchTemperature}>{this.state.temperature} °C</div>}
                    {this.props.humidity && <div>{this.state.humidity}</div>}
                </div>}
            </div>
        );
    }
}

export default lightComponent;