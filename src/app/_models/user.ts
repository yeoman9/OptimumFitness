
import { Role } from './role';
import { UserInfo } from './userInfo';

export class User {
    id: number;
    firstName: string;
    lastName: string;   
    userInfo: UserInfo; 
    userRoles: Role[];
}