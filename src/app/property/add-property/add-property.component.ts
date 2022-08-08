import { Component, OnInit, ViewChild, ɵɵsetComponentScope } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Ipropertybase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
//@ViewChild('Form') addPropertyForm: NgForm;
@ViewChild('formTabs') formTabs: TabsetComponent;
nextClicked: boolean;
addPropertyForm: FormGroup;
property = new Property();

propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']

propertyView: Ipropertybase = {
  Id: null,
  Name: '',
  Price: null,
  SellRent: null,
  PType: null,
  FType: null,
  BHK: null,
  BuildArea: null,
  City: null,
  RTM: null,
};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private houseService: HousingService,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: [1, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
        BHK: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuildArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),
      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),
      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],
      })
    });
  }

  //Getter Methods
    //#region of code <FormGroup>
    get BasicInfo() {
      return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
    }

    get PriceInfo() {
      return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
    }

    get AddressInfo() {
      return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
    }

    get OtherInfo() {
      return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
    }
    //#endregion <FormGroup>

    //#region <FormControl>
    get SellRent() {
      return this.BasicInfo.controls['SellRent'] as FormControl;
    }

    get GetPrice() {
      return this.PriceInfo.controls['Price'] as FormControl;
    }

    get GetterPType() {
      return this.BasicInfo.controls['PType'] as FormControl;
    }

    get GetterBHK() {
      return this.BasicInfo.controls['BHK'] as FormControl;
    }

    get FType() {
      return this.BasicInfo.controls['FType'] as FormControl;
    }

    get Name() {
      return this.BasicInfo.controls['Name'] as FormControl;
    }

    get City() {
      return this.BasicInfo.controls['City'] as FormControl;
    }

    get BuildArea() {
      return this.PriceInfo.controls['BuildArea'] as FormControl;
    }

    get CarpetArea() {
      return this.PriceInfo.controls['CarpetArea'] as FormControl;
    }

    get Security() {
      return this.PriceInfo.controls['Security'] as FormControl;
    }

    get Maintenance() {
      return this.PriceInfo.controls['Maintenance'] as FormControl;
    }

    get FloorNo() {
      return this.AddressInfo.controls['FloorNo'] as FormControl;
    }

    get TotalFloor() {
      return this.AddressInfo.controls['TotalFloor'] as FormControl;
    }

    get Address() {
      return this.AddressInfo.controls['Address'] as FormControl;
    }

    get LandMark() {
      return this.AddressInfo.controls['LandMark'] as FormControl;
    }

    get RTM() {
      return this.OtherInfo.controls['RTM'] as FormControl;
    }

    get PossessionOn() {
      return this.OtherInfo.controls['PossessionOn'] as FormControl;
    }

    get AOP() {
      return this.OtherInfo.controls['AOP'] as FormControl;
    }

    get Gated() {
      return this.OtherInfo.controls['Gated'] as FormControl;
    }

    get MainEntrance() {
      return this.OtherInfo.controls['MainEntrance'] as FormControl;
    }

    get Description() {
      return this.OtherInfo.controls['Description'] as FormControl;
    }
    //#endregion <FormControl>

  onBack()
  {
    this.router.navigate(['/']);
  }

  onSubmit()
  {
    this.nextClicked = true;
    if (this.allTabsValid()){
      this.mapProperty();
      this.houseService.addProperty(this.property);
      console.log('Congrats Form Submitted');
      console.log('SellRent=' + this.addPropertyForm.value.BasicInfo.SellRent)
      console.log(this.addPropertyForm);

      if(this.SellRent.value === '2') {
        this.router.navigate(['/rent-property'])
      } else {
        this.router.navigate(['/buy-property'])
      }
    } else {
      this.alertifyService.error('Please review the form and provide all valid entries')
    }
  }

  mapProperty(): void {
    this.property.Id = this.houseService.newPropID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.GetterBHK.value;
    this.property.PType = this.GetterPType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.GetPrice.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuildArea = this.BuildArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if(IsCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
