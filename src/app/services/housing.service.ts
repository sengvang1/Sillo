import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { environment } from '../../environments/environment'
import { Ikeyvaluepair } from '../model/ikeyvaluepair';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllCities() : Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + '/city');
  }

  getPropertyTypes() : Observable<Ikeyvaluepair[]> {
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/propertytype/list');
  }

  getFurnishingTypes() : Observable<Ikeyvaluepair[]> {
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/furnishingtype/list');
  }

  getProperty(id: number) {
    return this.http.get<Property>(this.baseUrl + '/property/detail/' + id.toString());
    // for old local fetch property data
    // return this.getAllProperties().pipe(
    //   map(propertiesArray => {
    //     // throw new Error('Seome error');
    //     return propertiesArray.find(p => p.id === id)
    //   })
    // );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
      return this.http.get<Property[]>(this.baseUrl + '/property/list/' + SellRent.toString());

    // for old local property list
    // return this.http.get('data/properties.json').pipe(
    //   map(data => {
    //   const propertiesArray: Array<Property> = [];
    //   const localProperties = JSON.parse(localStorage.getItem('newProp'));

    //   if (localProperties) {
    //     for (const id in localProperties) {
    //       if (SellRent) {
    //       if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
    //         propertiesArray.push(localProperties[id]);
    //       }
    //     } else {
    //       propertiesArray.push(localProperties[id]);
    //     }
    //     }
    //   }

    //   for (const id in data) {
    //     if (SellRent) {
    //       if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
    //         propertiesArray.push(data[id]);
    //       }
    //       } else {
    //         propertiesArray.push(data[id]);
    //     }
    //   }
    //   return propertiesArray;
    //   })
    // );

    // return this.http.get<Property[]>('data/properties.json');
  }
  addProperty(property: Property) {
    let newProp = [property];

    // Add new property in array if newProp alreay exists in local storage
    if (localStorage.getItem('newProp')) {
      newProp = [property,
                  ...JSON.parse(localStorage.getItem('newProp'))];
    }

    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

  getPropertyAge(dateofEstablishment: Date): string {
    const today = new Date();
    const estDate = new Date(dateofEstablishment);
    let age = today.getFullYear() - estDate.getFullYear();
    const month = today.getMonth() - estDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < estDate.getDate())){
      age --;
    }

    if (today < estDate) {
      return '0';
    }

    if (age === 0) {
      return 'Less than a year';
    }

    return age.toString();
  }
}
