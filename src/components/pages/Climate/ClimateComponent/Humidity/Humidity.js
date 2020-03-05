import React from 'react';

class Humidity extends React.Component {
    state = {
        humidity: null
    }

    fetchHumidity = async () => {
        const requestBody = {
            query: `
                query {
                    humidity {
                        humidity
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
              const humidity = "80";

              this.setState({
                humidity: humidity
            })
           })
     };

     render() {
        return (
            <div className="humidity__action">{this.state.humidity} %</div>
        )
     }
    }

    export default Humidity;