export const assertValue = <T>(
    value?: T,
    errorMessage: string = `Environment variable is not defined: ${value}`
): T => {
    if (value === undefined) {
        throw new Error(errorMessage)
    }

    return value
}
