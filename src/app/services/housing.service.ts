import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Iproperty } from '../model/iproperty';
import { Observable } from 'rxjs';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.Id === id)
      })
    );
  }

  getAllProperties(SellRent?: number) : Observable<Iproperty[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<Iproperty> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp'));

        if (localProperties) {
          for (const id in localProperties) {
            if (SellRent) {
              if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
                propertiesArray.push(localProperties[id]);
              } else {
                propertiesArray.push(localProperties[id]);
              }
            }

          }
        }

        for (const id in data) {
          if (SellRent) {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id]);
            } else {
              propertiesArray.push(data[id]);
            }
          }
        }
        return propertiesArray;
      })
    );
  }

  addProperty(property: Property) {
    let newProp = [property]

    if (localStorage.getItem('newProp')) {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    }

    localStorage.setItem('newProp', JSON.stringify(newProp))
  }

  newPropID() {
    if (localStorage.getItem('PID')) {
      return +localStorage.getItem('PID') + 1;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
