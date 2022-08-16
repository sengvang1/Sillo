import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jaLocale } from 'ngx-bootstrap/chronos';
import { Ipropertybase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';



@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: Ipropertybase[];
  Today = new Date();
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';

  constructor(private route: ActivatedRoute, private housingService: HousingService) {
    this.properties = [];
  }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data=>{
        this.properties = data;
        console.log(data);
        console.log(this.route.snapshot.url.toString());
      }, error => {
        console.log('httperror:');
        console.log(error);
      }
    )
  }

  onCityFilter() {
    this.SearchCity = this.City;
  }

  clearCityFilter() {
    this.City = '';
    this.SearchCity = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc')
    {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    };
  }

}
