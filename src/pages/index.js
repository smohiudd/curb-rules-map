import React, {Component} from "react"
import { Helmet } from "react-helmet"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

import RulesConatiner from "../components/RulesContainer"

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FhZGlxbSIsImEiOiJjamJpMXcxa3AyMG9zMzNyNmdxNDlneGRvIn0.wjlI8r1S_-xxtq2d-W5qPA';

class CurbMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TimeValue:'10:00',
      DayValue:1,
      SelectedView:"Parking Rate"
    };
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() {

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/saadiqm/cjbjougmt08z72rsa7me1duoi',
      center: [-114.0708, 51.0486],
      zoom:15
    });

    let scaledWidth = (width) => {return {
        "type": "exponential",
        "base": 2,
        "stops": [
            [10, width * Math.pow(2, (10 - 16))],
            [16, width * Math.pow(2, (16 - 16))]
        ]
    }};

    this.map.on('load', () => {

      let geojson = 'https://pg7x2ae618.execute-api.us-west-2.amazonaws.com/dev/parking/rules?start='+this.state.TimeValue+'&day='+this.state.DayValue

      this.map.addSource('Curbs', {
        type: 'geojson',
        data: geojson
      });

      this.map.addLayer({
          "id": "Parking Class Right",
          "type": "line",
          "source": "Curbs",
          "layout":{
            "visibility":'none'
          },
          "paint": {
            "line-color": ['match', ['get', 'class',['get','who',['get','restrictions']]],
                     'Passenger Vehicle', '#4286f4',
                     'Taxi', 'red',
                     'Loading','yellow',
                     'Calgary Transit Access','orange',
                     'yellow'] ,
            "line-width": scaledWidth(12),
            "line-offset": scaledWidth(15),
            "line-opacity": 0.7
          },
          filter:["all",["match",['get',"side"],"right",true,false],["match",['get','activity',['get','what',['get','restrictions']]],"park", true,false]]
        });

      this.map.addLayer({
        "id": "Parking Class Left",
        "type": "line",
        "source": "Curbs",
        "layout":{
          "visibility":"none"
        },
        "paint": {
          "line-color": ['match', ['get', 'class',['get','who',['get','restrictions']]],
                   'Passenger Vehicle', '#4286f4',
                   'Taxi', 'red',
                   'Loading','green',
                   'Calgary Transit Access','orange',
                   'yellow'],
          "line-width": scaledWidth(12),
          "line-offset": scaledWidth(-15),
          "line-opacity": 0.7
        },
        filter:["all",["match",['get',"side"],"left",true,false],["match",['get','activity',['get','what',['get','restrictions']]],"park", true,false]]
      });

      this.map.addLayer({
          "id": "Parking Rate Right",
          "type": "line",
          "source": "Curbs",
          "layout":{
            "visibility":"none"
          },
          "paint": {
            "line-color": ["interpolate",
                ["linear"],
                ['*',['/',['get', 'rate',['get','payment',['get','restrictions']]] , ['number', ['get', 'interval',['get','payment',['get','restrictions']]], 1]],60],
                0,'#6105ff',
                3,'#ff780a',
                4.5,'#ffee00',
            ],
            "line-width": scaledWidth(12),
            "line-offset": scaledWidth(15),
            "line-opacity": 0.7
          },
          filter:["all",["match", ['get',"side"],"right",true,false],["match",['get', 'activity',['get','what',['get','restrictions']]],"park",true,false],["match",['get','class',['get','who',['get','restrictions']]],"Passenger Vehicle", true,false]]
        });

        this.map.addLayer({
            "id": "Parking Rate Left",
            "type": "line",
            "source": "Curbs",
            "layout":{
              "visibility":"none"
            },
            "paint": {
              "line-color": ["interpolate",
                  ["linear"],
                  ['*',['/',['get', 'rate',['get','payment',['get','restrictions']]] , ['number', ['get', 'interval',['get','payment',['get','restrictions']]], 1]],60],
                  0,'#6105ff',
                  3,'#ff780a',
                  4.5,'#ffee00',
              ],
              "line-width": scaledWidth(12),
              "line-offset": scaledWidth(-15),
              "line-opacity": 0.7
            },
            filter:["all",["match", ['get',"side"],"left",true,false],["match",['get', 'activity',['get','what',['get','restrictions']]],"park", true,false],["match",['get','class',['get','who',['get','restrictions']]],"Passenger Vehicle", true,false]]
          });

        this.map.setLayoutProperty(this.state.SelectedView+" Right", 'visibility', 'visible');
        this.map.setLayoutProperty(this.state.SelectedView+" Left", 'visibility', 'visible');
    });
  }

  handleTimeChange(e) {
    e.preventDefault();
    this.setState({TimeValue:e.target.value}, () => {
      let geojson = 'https://pg7x2ae618.execute-api.us-west-2.amazonaws.com/dev/parking/rules?start='+this.state.TimeValue+'&day='+this.state.DayValue
      this.map.getSource('Curbs').setData(geojson)
    });
  }

  handleDayChange(e) {
    e.preventDefault();
    this.setState({DayValue:e.target.value}, () => {
      let geojson = 'https://pg7x2ae618.execute-api.us-west-2.amazonaws.com/dev/parking/rules?start='+this.state.TimeValue+'&day='+this.state.DayValue
      this.map.getSource('Curbs').setData(geojson)
    });
  }

  handleViewChange(e) {
    let previousState = this.state.SelectedView
    this.setState({SelectedView:e.target.value}, () => {
      this.map.setLayoutProperty(this.state.SelectedView+" Right", 'visibility', 'visible');
      this.map.setLayoutProperty(this.state.SelectedView+" Left", 'visibility', 'visible');
      this.map.setLayoutProperty(previousState+" Right", 'visibility', 'none');
      this.map.setLayoutProperty(previousState+" Left", 'visibility', 'none');
    });
  }

  render(){



    return(
      <div>
        <Helmet>
          <link href="https://api.mapbox.com/mapbox-assembly/v0.23.2/assembly.min.css" rel="stylesheet"/>
        </Helmet>

       <div ref={el => this.mapContainer = el} style={{position: 'absolute',top: 0, bottom: 0, width: '100%',height: '100%'}}/>
       <RulesConatiner
         time={this.state.TimeValue}
         onTimeChange={this.handleTimeChange}
         day={this.state.DayValue}
         onDayChange={this.handleDayChange}
         view={this.state.SelectedView}
         onViewChange={this.handleViewChange}
         viewcontext={this.state.SelectedView}
       />
      </div>
    );
  }
}

export default CurbMap
