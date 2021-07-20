import { Authority } from "./authority"

export class CurrentUser {
   authorities: Authority[];
   token?: string    
}