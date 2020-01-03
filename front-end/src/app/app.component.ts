import { Component } from '@angular/core';
import { WeatherService } from './weather.service'
import { Chart } from 'chart.js';
import cities from './resources/city.list.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'charts-project';
  chart = [];
  public citiesList:{name:string, country:string}[] = cities;

  constructor(private _weather: WeatherService) {}

  requestCity(value) {
    this._weather.city = value
  }

  ngOnInit(): void {
    this._weather.forecast()
      .subscribe(response => {
        let temp_max = response['list'].map(response => response.main.temp_max)
        let temp_min = response['list'].map(response => response.main.temp_min)
        let everyDate = response['list'].map(response => response.dt)
        
        console.log('temp_max data',temp_max)
        console.log('temp_min data',temp_min)
        console.log('everyDate data',everyDate)
        
        let weatherDates = []
        everyDate.forEach((response) => {
          let jsdate = new Date(response * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('pt', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }))
        })
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        })
      })
  }
}
