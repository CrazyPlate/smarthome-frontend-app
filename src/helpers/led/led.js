import React, { Component } from "react";

class LedPage extends Component {
   state = {
      led: false,
   };

   toggleLed = () => {
       const pin = '5';
       const order = 'W';
       let data = 'D1';

       if (this.state.led) {
         data = 'D0';
       } else if (!this.state.led) {
          data = 'D1';
       }

      const requestBody = {
         query: `
               mutation toggleLed($pin: String!, $order: String!, $data: String!){
                  led(pin: $pin, order: $order, data: $data) {
                      pin
                      data
                  }
               }
            `,
            variables: {
               pin: pin,
               order: order,
               data: data
            }
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
            console.log(resData.data.led)

            this.setState(prevState => ({
               led: !prevState.led
            }))
         })
   };

      render() {
      return (
         <React.Fragment>
            <button onClick={this.toggleLed}>LED</button>
         </React.Fragment>
      );
   }
}

export default LedPage;