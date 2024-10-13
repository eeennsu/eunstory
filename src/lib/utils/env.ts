export const assertValue = <T>(value?: T, errorMessage: string = 'Environment variable is not defined'): T => {
    if (value === undefined) {
        throw new Error(errorMessage)
    }

    return value
}
