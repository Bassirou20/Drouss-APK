export interface Apprenant {
    id?: number;
    nom: string;
    prenom: string;
    email: string;
    date_naissance: Date;
    lieu_naissance: string;
    genre: string;
    telephone: string;
    cni?: string;
    user_id?: number;
    is_active?: boolean;
    matricule?: string;
    reserves?: string;
    photo?: string;
    
  }
