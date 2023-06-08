export const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)
export const noSideSpace = (value: string) => !value.startsWith(' ') && !value.endsWith(' ')