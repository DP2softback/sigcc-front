export type Criteria = {
    id: number,
    name: string,
}
export type PropsRubricCriterias = {
    criterias: Array<Criteria>,
}

export type StateRubricCriterias = {
    criterias: Array<Criteria>
}

export type PropsChoiceBase = {
    choice: Criteria,
    onChange: any,
    onDelete: any,
}

export type StateChoiceBase = {
}