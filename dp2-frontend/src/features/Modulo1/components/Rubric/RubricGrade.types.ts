export type Score = {
        id: number,
        name: string,
        score: number
}
export type Criteria = {
    id: number,
    name: string,
    score: Score,
}

export type PropsRubricCriterias = {
    criterias: Array<Criteria>,
    disabled: boolean
}

export type StateRubricCriterias = {
    criterias: Array<Criteria>
}

export type PropsChoiceBase = {
    name: string,
    onChange: any,
    disabled: boolean,
    choice: Score,
}

export type StateChoiceBase = {
}