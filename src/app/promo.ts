

export interface Promotion {
    id: number;
    libelle: string;
    date_debut: string;
    date_fin_prevue: string;
    date_fin_reel: string;
    is_ongoing: number;
    is_active: boolean;
    referentiels: Referentiel[];
  }

  interface Referentiel {
    id: number;
    libelle: string;
    description: string;
    is_active: boolean;
    user_id: number;
  }

  export interface ApiResponse {
    data: Promotion[];
  }
