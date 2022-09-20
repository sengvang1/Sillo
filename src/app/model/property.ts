import { Ipropertybase } from './ipropertybase';

export class Property implements Ipropertybase {
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  bhk: number;
  furnishingType: string;
  price: number;
  builtArea: number;
  carpetArea?: number;
  address: string;
  address2?: string;
  city: string;
  floorNo?: string;
  totalFloors?: string;
  readyToMove: number;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: number;
  maintenance?: number;
  estPossessionOn?: Date;
  image?: string;
  description?: string;
}
