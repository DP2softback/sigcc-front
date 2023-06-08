export type Props = {
    rubric: {
        criterias: Array<
            {
                label: string,
                score: number,
                studentScore: number,
            }
        >,
        studentScore: number,
        score: number,
    },
}

export type State = {
}