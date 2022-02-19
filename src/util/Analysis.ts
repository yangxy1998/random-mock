export function AnalysisEffect(effect: Function) {
    const str = effect.toString()
    const left = str.indexOf('(')
    const right = str.indexOf(')')
    const names = str
        .substring(left + 1, right)
        .replace(/\s/g, '')
        .split(',')
    return (item) => {
        const args = names.map((name) => item[name])
        return effect(...args)
    }
}
export function AnalysisFilter(filter: Function) {
    const str = filter.toString()
    const left = str.indexOf('(')
    const right = str.indexOf(')')
    const names = str
        .substring(left + 1, right)
        .replace(/\s/g, '')
        .split(',')
    return (item, index?, items?) => {
        const args = names.map((name) => item[name])
        return filter(...args)
    }
}
