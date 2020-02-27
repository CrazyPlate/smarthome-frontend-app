import React, { Component } from "react";

class TemperaturePage extends Component {
   state = {
      temperature: null
   };

   componentDidMount() {
      this.fetchTemperature();
   }

   fetchTemperature = () => {
      const requestBody = {
         query: `
               query {
                  temperature {
                    temperature
                  }
                }
            `
      };

      fetch("http://192.168.1.214:4000/graphql", {
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
            this.setState({temperature: temperature});
         })
   };

      render() {
      return (
         <React.Fragment>
            <div onClick={this.fetchTemperature}>{this.state.temperature}</div>
         </React.Fragment>
      );
   }
}

export default TemperaturePage;