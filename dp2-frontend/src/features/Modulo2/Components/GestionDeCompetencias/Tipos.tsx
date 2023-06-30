export  type Competencia = {
    id: number;
    code: string;
    name: string;
    description: string;
    type: number;
    active: boolean;
  };

export  type tipoCompetencia = {
    id: number,
    abbreviation: string;
    name: string;
    description: string;
    active: boolean;
    upperType: boolean;
  }

export type CompetenciaTrabajador = {
  capacity_id: string,
  capacity_name: string,
  competence__type__name: string,
  levelCurrent: number,
  levelRequired: number,
  likeness: number
}
  
export type EmpleadoDeArea = {
  id: number,
  user__first_name: string,
  user__last_name: string,
  position__name: string,
  area__name: string,
  user__email: string,
  user__is_active: boolean
}

export type AreaActiva = {
  id: number,
  name: string
}

export type Posicion = {
  position__id: number,
  position__name: string
}
