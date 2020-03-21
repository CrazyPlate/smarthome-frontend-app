import React from 'react';
import { Line } from 'react-chartjs-2';

import './TemperatureTrend.css';

let labels = [];
let data = [];

class TemperatureTrend extends React.Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            chartWidth: 340,
            chartHeight: 220,
            chartData: {
                labels: [],
                datasets: [
                    {
                        data: []
                    }
                ]
            }
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            isLoading: true
        });
        this.fetchTemperature();
    }

    fetchTemperature = async () => {
        const requestBody = {
            query: `
                query {
                    trendTemps {
                        temperature
                        date
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

                for (let i = resData.data.trendTemps.length - 10; i < resData.data.trendTemps.length; i++) {
                    const currentDate = new Date(Number(resData.data.trendTemps[i].date));
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth();
                    const day = currentDate.getDate();
                    const hours = currentDate.getHours();
                    const minutes = "0" + currentDate.getMinutes();
                    const seconds = "0" + currentDate.getSeconds();

                    const dateString = day + ' ' + (month+1) + ' ' + year;
                    const timeString = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
                    labels.push(timeString);
                    data.push(resData.data.trendTemps[i].temperature);
                }
                this.setState({
                    chartData: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Temperature',
                                fill: false,
                                lineTension: 0.3,
                                backgroundColor: 'rgba(255,255,255,1)',
                                borderColor: 'rgba(255,255,255,1)',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgba(255,255,255,1)',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 0,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgba(255,255,255,1)',
                                pointHoverBorderColor: 'rgba(255,255,255,1)',
                                pointHoverBorderWidth: 0,
                                pointRadius: 0,
                                pointHitRadius: 10,
                                data: data
                            }
                        ]
                    },
                    isLoading: false
                });
                labels = [];
                data = [];
           })
     };

    /* setCanvasDimensions() {
        console.log("ABC")
        this.setState({
            chartWidth: window.innerWidth/2,
            chartHeight: window.innerHeight/2
        })
    } */


    render() {        
        return (
            <div className="chart__container">
                {!this.state.isLoading && <Line
                    data={this.state.chartData}
                    width={this.state.chartWidth}
                    height={this.state.chartHeight}
                    options={{ maintainAspectRatio: false }}
                />}
            </div>);
      }
}

export default TemperatureTrend;