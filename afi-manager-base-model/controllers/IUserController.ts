import { InfoMe } from '../model/InfoMe';
import { User, UserAccount } from '../model/User';
import { IBaseController } from 'luong-base-model';
export interface IUserController extends IBaseController<User> {
  login(params: { username: string; password: string }): Promise<User>;
  register(params: UserAccount): Promise<User>;
  getMe(): Promise<InfoMe>;
}
