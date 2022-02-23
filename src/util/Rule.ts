export type Rule = {
    // rule like y = 3 * x + 1 ± 0.5
    dependent: string
    arguments: Array<string>
    filter?: (...args: any) => boolean
    effect: (...args: any) => any
    confidence?: number
}
