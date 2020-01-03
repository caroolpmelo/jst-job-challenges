import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  appid = 'acd3959ca4bd63ec28bba357e759863d'
  city: 'Tyuzler,UA'

  constructor(private _http: HttpClient) {}

  forecast() {
    return this._http
      .get('http://samples.openweathermap.org/data/2.5/history/city', {
        params: {
          appid: this.appid,
          q: this.city
        }
      })
      .map(result => result);
  }
}
