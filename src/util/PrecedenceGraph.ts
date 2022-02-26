import { RegulationConstructor } from '../regulation/Regulation'
import { AttributeConstructor, AttributeType } from '../attribute'
import { Rule } from './Rule'

interface Node {
    name: string
}

interface Link {
    source: string
    target: string
    weight?: number
}

export class PrecedenceGraph {
    nodes: Map<string, Node>
    links: Link[]
    sequence: Array<AttributeConstructor | Rule>
    constructor(attributes: AttributeConstructor[], rules: Rule[]) {
        let leading = attributes
            .filter((attribute) => attribute.type === AttributeType.Primary)
            .map((attribute) => attribute.name)
        let following = [] as string[]
        let order: any[] = []
        this.nodes = new Map(
            attributes.map((attribute) => [attribute.name, { name: attribute.name }])
        )
        this.links = []
        function updateState() {
            following = []
            for (let rule of rules) {
                if (!following.includes(rule.target)) following.push(rule.target)
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
            const args: string[] = rule.regulation.args
            args.forEach((argument) => {
                if (!leading.includes(argument)) {
                    if (!following.includes(argument))
                        throw Error(
                            `attribute ${argument} has not be defined or cyclic dependence detected`
                        )
                    clear = false
                }
            })
            if (!clear) {
                i++
            } else {
                order.push(rule)
                this.links.push(
                    ...args.map((source) => {
                        return { source, target: rule.target, weight: rule.confidence }
                    })
                )
                rules.splice(i, 1)
            }
            if (i >= rules.length) {
                updateState()
                i = 0
            }
        }
        this.sequence = order
    }
    getSequence() {
        return this.sequence
    }
    getGraph() {
        return { nodes: this.nodes, links: this.links }
    }
}
