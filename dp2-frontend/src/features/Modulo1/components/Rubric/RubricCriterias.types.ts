export type Level = {
    id?: number,
    name?: string,
}

export type Criteria = {
    id: number,
    name: string,
}

export type Proficiency = {
    code: string,
    description: string,
    id: number,
    isActive: boolean,
    name: string,
    type: number,
}

export type PropsRubricCriterias = {
    criterias: Array<Criteria>,
}

export type StateRubricCriterias = {
    criterias: Array<Criteria>,
    proficiencies: Array<Proficiency>
}

export type PropsChoiceBase = {
    choice: Criteria,
    onChange: any,
    onDelete: any,
    proficiencies: Array<Proficiency>,
}

export type StateChoiceBase = {
}