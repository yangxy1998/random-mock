import { Attribute } from './Attribute'
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
    sequence: Array<Attribute | Rule>
    constructor(attributes: Attribute[], rules: Rule[]) {
        let leading = [] as string[]
        let following = [] as string[]
        let order: any[] = []
        this.nodes = new Map(
            attributes.map((attribute) => [attribute.name, { name: attribute.name }])
        )
        this.links = []
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
                this.links.push(
                    ...rule.arguments.map((source) => {
                        return { source, target: rule.dependent, weight: rule.confidence }
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
