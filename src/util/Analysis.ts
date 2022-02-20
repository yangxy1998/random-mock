export function AnalysisEffect(effect: Function, mapper?: { [key: string]: number }) {
    const str = effect.toString()
    const left = str.indexOf('(')
    const right = str.indexOf(')')
    const names = str
        .substring(left + 1, right)
        .replace(/\s/g, '')
        .split(',')
    return (item: { [x: string]: any }) => {
        const args = names.map((name) => item[mapper ? mapper[name] : name])
        return effect(...args)
    }
}
export function AnalysisFilter(filter: Function, mapper?: { [key: string]: number }) {
    const str = filter.toString()
    const left = str.indexOf('(')
    const right = str.indexOf(')')
    const names = str
        .substring(left + 1, right)
        .replace(/\s/g, '')
        .split(',')
    return (item: { [x: string]: any }, index?: number, items?: any[]) => {
        const args = names.map((name) => item[mapper ? mapper[name] : name])
        return filter(...args)
    }
}
