export interface Role {
    id: string;
    libelle: string;
  }
  
  export interface User {
    id?: string;
    isActive?: boolean;
    name: string;
    prenom: string;
    email: string;
    password: string;
    adresse: string;
    role_id: Role;
    telephone: string;
  }