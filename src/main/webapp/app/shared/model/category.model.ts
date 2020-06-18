import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { CategoryStatus } from 'app/shared/model/enumerations/category-status.model';

export interface ICategory {
  id?: number;
  description?: string;
  sortOrder?: number;
  dateAdded?: string;
  dateModified?: string;
  status?: CategoryStatus;
  parent?: ICategory;
  products?: IProduct[];
}

export const defaultValue: Readonly<ICategory> = {};
