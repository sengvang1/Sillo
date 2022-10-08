export interface Ipropertybase {
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  furnishingType: string;
  price: number;
  bhk: number;
  builtArea: number;
  city: string;
  readyToMove: boolean;
  isPrimaryPhotoUrl?: string;
  estPossessionOn?: Date;
}
