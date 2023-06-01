export function getStorageItem(
	key: string,
	isPrimitive?: boolean,
) {
	return isPrimitive
		? window.localStorage.getItem(key)
		: window.localStorage.getItem(key)
		? JSON.parse(window.localStorage.getItem(key) as string)
		: null
}

export const setStorage = (items: Record<string, string>) => {
	for (const key in items) {
		window.localStorage.setItem(key, items[key])
	}
}

export const cleanStorage = () => {
	const localStorage = Object.entries(window.localStorage)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	for (const [key, _value] of localStorage) {
		window.localStorage.removeItem(key)
	}
}