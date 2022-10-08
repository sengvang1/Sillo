import { Ipropertybase } from './ipropertybase';
import { Photo } from './photo';

export class Property implements Ipropertybase {
  id: number;
  sellRent: number;
  name: string;
  propertytypeId: number;
  propertyType: string;
  bhk: number;
  furnishingTypeId: number;
  furnishingType: string;
  price: number;
  builtArea: number;
  carpetArea?: number;
  address: string;
  address2?: string;
  cityId: number;
  city: string;
  floorNo?: string;
  totalFloors?: string;
  readyToMove: boolean;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: boolean;
  maintenance?: number;
  estPossessionOn?: Date;
  image?: string;
  description?: string;
  photos?: Photo[];
}
