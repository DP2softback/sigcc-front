export type Level = {
    id: number,
    name: string,
}

export type Criteria = {
    id: number,
    name: string,
    level: Level,
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
    choice: Level,
    onChange: any,
    disabled: boolean,
}

export type StateChoiceBase = {
}