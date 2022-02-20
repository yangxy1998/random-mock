import { Attribute, AttributeType } from './Attribute'

export type Rule = {
    // rule like y = 3 * x + 1 ± 0.5
    dependent: string
    arguments: Array<string>
    filter?: (...args: any) => boolean
    effect: (...args: any) => any
    confidence?: number
}
export function GetRuleOrder(attributes: Attribute[], rules: Rule[]): Array<Rule | Attribute> {
    let leading = [] as string[]
    let following = [] as string[]
    let order: any[] = []
    function updateState() {
        following = []
        for (let rule of rules) {
            if (!following.includes(rule.dependent)) following.push(rule.dependent)
        }
        for (let attribute of attributes) {
            if (!following.includes(attribute.name) && !leading.includes(attribute.name)) {
                order.push(attribute)
                leading.push(attribute.name)
            }
        }
    }
    updateState()
    let i = 0
    while (rules.length > 0) {
        let rule = rules[i]
        let clear = true
        rule.arguments.forEach((argument) => {
            if (!leading.includes(argument)) {
                clear = false
            }
        })
        if (!clear) {
            i++
        } else {
            order.push(rule)
            rules.splice(i, 1)
        }
        if (i >= rules.length) {
            updateState()
            i = 0
        }
    }
    return order
}
