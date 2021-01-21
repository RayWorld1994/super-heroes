import { Data } from './character/data.interface';

export interface IApiResponse<T> {
  code: string;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: Data<T>;
  etag: string;
}
