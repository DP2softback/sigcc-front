export type IError = {
	status: number
	message: string
}

export type GetResponse<T> = {
	status: number
	data: T
}

export type GetAllResponse<T> = {
	status: number
	data: T[]
}