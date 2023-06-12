export type Props = {
    disabled: boolean,
    rubric: {
        criterias: Array<
            {
                label: string,
                score: number
            }
        >,
        studentScore: number,
        score: number,
    },
}

export type State = {
    score: number,
}