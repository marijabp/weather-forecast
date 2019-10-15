import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Background from '../../images/blue.jpg';
import Sun from '../../images/sun.png';
import Cloud from '../../images/cloud.png';

const styles = {
    paper1: {
        borderRadius: "10px",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#DAAD86"
    },
    paper2: {
        marginTop: "20px",
        padding: "5px",
        backgroundColor: "#DAAD86",
        minWidth: "600px",
        borderRadius: "10px",
        color: "#662c28",
        fontWeight: "600",


    },
    cloudsBlock: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "30px",
        marginRight: "30px",
    },
    cloudsBlockItem: {
        paddingTop:"10px",
        margin: "10px",
        backgroundImage: "url(" + Background + ")",
        minHeight: "200px",
        minWidth: "150px",
        borderRadius: "10px",
        color: "white",
    }
}

class DestinationBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinationName: "",
            dewPoint: null,
            humidity: "",
            temperature: "",
            isLoaded: false,
            altitude: "453",
            latitude: "11.43",
            longitude: "12.12",
            fog: null,
            lowClouds: null,
            mediumClouds: null,
            highClouds: null,
        }

    }

    handleChangeData = name => event => {
        this.setState({ [name]: event.target.value })
    }

    async componentDidMount() {


        const corsAnywhere = `https://cors-anywhere.herokuapp.com`;
        const weatherApiUrl = `http://api.met.no/weatherapi/locationforecast/1.9/?lat=${this.state.latitude};lon=${this.state.longitude}`
        const URL = `${corsAnywhere}/${weatherApiUrl}`

        const myInit = {
            method: 'GET',
        };
        const myRequest = new Request(URL, myInit);

        const response = await fetch(myRequest);

        const text = await response.text();

        const parser = new DOMParser();

        const xml = parser.parseFromString(text, "text/xml");

        var location = xml.querySelector("time").getElementsByTagName("location")[0];
        var dewPoint = location.getElementsByTagName("dewpointTemperature")[0].getAttribute("value");
        var humidity = location.getElementsByTagName("humidity")[0].getAttribute("value");
        var temperature = location.getElementsByTagName("temperature")[0].getAttribute("value");
        var fog = location.getElementsByTagName("fog")[0].getAttribute("percent");
        var lowClouds = location.getElementsByTagName("lowClouds")[0].getAttribute("percent");
        var mediumClouds = location.getElementsByTagName("mediumClouds")[0].getAttribute("percent");
        var highClouds = location.getElementsByTagName("highClouds")[0].getAttribute("percent");

        this.setState({ dewPoint, humidity, temperature, fog, lowClouds, mediumClouds, highClouds })
      
    }

    render() {
        const { destinationName, dewPoint, humidity, temperature, fog, lowClouds, mediumClouds, highClouds } = this.state

        return (
            <div>
                <Paper style={styles.paper1}>
                    <TextField
                        label="Destination Name"
                        margin="normal"
                        value={destinationName}
                        onChange={this.handleChangeData('destinationName')}
                    ></TextField>

                    <Paper style={styles.paper2}>
                        <div>Destination Weather </div>
                        <div>
                            Dew Point: {dewPoint}°
                        </div>
                        <div>
                            Humidity: {humidity}%
                        </div>
                        <div>
                            Temperature: {temperature}
                        </div>

                        <div style={styles.cloudsBlock}>
                            <div style={styles.cloudsBlockItem}>
                                {fog} % <br />
                                Fog <br />
                                {(() => {
                                    if (fog < 40)
                                        return <img src={Sun} alt="Cloud" width="100" height="100" style={{ opacity: 1, marginTop: "50px", }} />
                                    else if (fog >= 40 && fog < 90)
                                        return <img src={Sun} alt="Cloud" width="100" height="100" style={{ opacity: 0.6, marginTop: "50px", }} />
                                    else
                                        return <img src={Sun} alt="Cloud" width="100" height="100" style={{ opacity: 0.0, marginTop: "50px", }} />

                                })
                                    ()
                                }
                            </div>
                            <div style={styles.cloudsBlockItem}>
                                {lowClouds} % <br />
                                Low Clouds <br />

                                {(() => {
                                    if (lowClouds < 20)
                                        return <img src={Cloud} alt="Cloud" width="100" height="100" style={{ opacity: 0.0, marginTop: "70px", }} />
                                    else if (lowClouds >= 20 && lowClouds < 50)
                                        return <img src={Cloud} alt="Cloud" width="100" height="100" style={{ opacity: 0.6, marginTop: "70px", }} />
                                    else
                                        return <img src={Cloud} alt="Cloud" width="100" height="100" style={{ opacity: 1, marginTop: "70px", }} />

                                })
                                    ()
                                }

                            </div>
                            <div style={styles.cloudsBlockItem}>
                                {mediumClouds} % <br />
                                Medium Clouds <br />
                                {(() => {
                                    if (mediumClouds < 20)
                                        return <img src={Cloud} alt="Cloud" width="100" height="100" style={{ opacity: 0.0, marginTop: "50px", }} />
                                    else if (mediumClouds >= 20 && mediumClouds < 50)
                                        return <img src={Cloud} alt="Cloud" width="100" height="100" style={{ opacity: 0.6, marginTop: "50px", }} />
                                    else
                                        return <img src={Cloud} alt="Cloud" width="100" height="100" style={{ opacity: 1, marginTop: "50px", }} />

                                })
                                    ()
                                }
                            </div>
                            <div style={styles.cloudsBlockItem}>
                                {highClouds} % <br />
                                High Clouds <br />
                                {(() => {
                                    if (highClouds < 20)
                                        return <img src={Cloud} alt="Cloud" width="100" height="100" style={{ opacity: 0.0, marginTop: "30px", }} />
                                    else if (highClouds >= 20 && highClouds < 50)
                                        return <img src={Cloud} alt="Cloud" width="100" height="100" style={{ opacity: 0.6, marginTop: "30px", }} />
                                    else
                                        return <img src={Cloud} alt="Cloud" width="100" height="100" style={{ opacity: 1, marginTop: "30px", }} />

                                })
                                    ()
                                }
                            </div>
                        </div>

                    </Paper>
                </Paper>
            </div>
        );
    }

}

export default DestinationBlock;