
export enum IStatus {
  DISPONIBLE="Disponible",
  VENDIDO= "Vendido"
}

export enum IType {
  ALQUILER="Alquiler",
  VENTA="Venta"
}

export interface PropertyForm{
  name?: string;
  status?: IStatus; // enum
  type?: IType;     // enum
  address?: string;
  city?: string;
  price?: number;
  m2?: number;
  bathrooms?: number;
  rooms?: number;
  description?: string;
  images?: string[];
  type_of_property_id?: string;   
  agency?: string;              
} 

export interface IPropertyForm {
  name: string;
  status: IStatus; // enum
  type: IType;     // enum
  address: string;
  city: string;
  price: number;
  m2: number;
  bathrooms: number;
  rooms: number;
  description: string;
  id_images?: string[];
  type_of_property_id: string;   
  agency: string;                
}

