import React from 'react';
import { Line } from 'react-chartjs-2';

let labels = [];
let data = [];

class EnergyTrend extends React.Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            chartWidth: window.innerWidth/1.2,
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

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({ chartWidth: window.innerWidth});
    };

    fetchTemperature = async () => {
        const requestBody = {
            query: `
                query {
                    trendEnergy {
                        energy
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
               let lengthOfFetchedData;
                if (resData.data.trendEnergy.length > 24) {
                    lengthOfFetchedData = resData.data.trendEnergy.length - 24
                } else {
                    lengthOfFetchedData = 0;
                }
                
                for (let i = lengthOfFetchedData; i < resData.data.trendEnergy.length; i++) {
                    const currentDate = new Date(Number(resData.data.trendEnergy[i].date));
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth();
                    const day = currentDate.getDate();
                    const hours = currentDate.getHours();
                    const minutes = "0" + currentDate.getMinutes();
                    //const seconds = "0" + currentDate.getSeconds();

                    // eslint-disable-next-line no-unused-vars
                    const dateString = day + ' ' + (month+1) + ' ' + year;
                    const timeString = hours + ":" + minutes.substr(-2);
                    labels.push(timeString);
                    data.push(resData.data.trendEnergy[i].energy);
                }
                this.setState({
                    chartData: {
                        labels: labels,
                        datasets: [
                            {
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

    render() {        
        return (
            <div className="chart__container">
                <div>{!this.state.isLoading && <Line
                    data={this.state.chartData}
                    width={this.state.chartWidth}
                    height={this.state.chartHeight}
                    options={{ 
                        animation: false,
                        maintainAspectRatio: false,
                        responsive: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 1600
                                }
                            }]
                        },
                        legend: {
                            display: false
                        },
                    }}
                />}</div>
            </div>);
      }
}

export default EnergyTrend;