export interface Model {
}


export interface User {
  id?: number;
  name: string;
  prenom: string;
  email: string;
  password: string;
  role_id: number;
  telephone: string;
  is_active: boolean;
  token: string;
  user_id:number;
  isFirstlyConnected:string;
  photo:string;
  adresse:string;
}
