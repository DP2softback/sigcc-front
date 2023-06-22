export type Criteria = {
    id: number,
}
export type PropsRubricCriterias = {
    criterias: Array<Criteria>,
}

export type StateRubricCriterias = {
    criterias: Array<{
        id: number,
    }>
}

export type PropsChoiceBase = {
    choice: Criteria,
    onChange: any,
    onDelete: any,
}

export type StateChoiceBase = {
}