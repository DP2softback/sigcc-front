export type Props = {
    rate: number,
    disabled: boolean,
    size: 'small' | 'medium',
    className?: string,
}

export type State = {
    rateValue: number
}