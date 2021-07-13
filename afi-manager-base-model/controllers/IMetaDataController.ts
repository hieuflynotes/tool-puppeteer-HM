import { IBaseController } from 'luong-base-model';
import { MetaData } from '../model/MetaData';
export interface IMetaDataController extends IBaseController<MetaData> {
  getByKey(params: { key: string }): Promise<MetaData>;
  saveByKey<T = any>(params: { key: string; data: T }): Promise<MetaData>;
}
