export type PropsRubricCriterias = {
    placeholder: string,
    disabled: boolean,
}

export type StateRubricCriterias = {
    options: Array<number>,
    errorNoOptions: boolean,
    label: string,
}

export type PropsChoiceBase = {
    max?: number,
    placeholder: string,
    disabled: boolean,
    value: number,
    removeOption: () => {};
    resetValidator: () => {};
}

export type StateChoiceBase = {
    label: string,
    errorEmptyLabel: boolean,
    errorEmptyScore: boolean,
}