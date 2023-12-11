export class Presence {
    id: number;
    date_heure_arriver: string;
    created_at: string;
    apprenants: Apprenant[];
  }
  
  export class Apprenant {
    cni?: string;
    date_naissance: string;
    email: string;
    genre: string;
    id: number;
    is_active: boolean;
    lieu_naissance: string;
    matricule: string;
    motif?: string;
    nom: string;
    photo: any;
    prenom: string;
    telephone: string;
    user?: {
      id: number;
      name: string;
      prenom: string;
      email: string;
      telephone: string;
    };
    created_at?: string;
    apprenant?: any;
    isPresent?: boolean;
  }
  