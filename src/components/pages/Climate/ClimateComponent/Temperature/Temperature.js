import React from 'react';

class Temperature extends React.Component {
    state = {
        temperature: null
    }

    UNSAFE_componentWillMount() {
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
        return (
            <div className="temperature__action">{this.state.temperature} °C</div>
        )
     }
    }

    export default Temperature;