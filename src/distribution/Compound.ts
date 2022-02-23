import { Generator } from '../util/Generator'
import { Attribute } from '../util/Attribute'
import { Distribution } from './Distribution'
import { PrecedenceGraph } from '../util/PrecedenceGraph'
import { AnalysisEffect, AnalysisFilter } from '../util/Analysis'

export class Compound extends Distribution {
    orders: any
    constructor(confiurations: any) {
        super()
        this.orders = new PrecedenceGraph(
            confiurations.attributes,
            confiurations.rules
        ).getSequence()
    }
    random() {
        let item: { [key: string]: any } = {}
        for (let rule of this.orders) {
            if (rule.name) {
                //attribute
                if (!item[rule.name])
                    // not initialized attribute
                    item[rule.name] = rule.distribution.random()
            } else if (rule.filter) {
                //rule
                if (
                    AnalysisFilter(rule.filter)(item) &&
                    !item[rule.dependent] &&
                    Math.random() <= rule.confidence
                )
                    // not initialized attribute
                    item[rule.dependent] = AnalysisEffect(rule.effect)(item)
            } else {
                //rule
                if (!item[rule.dependent] && Math.random() <= rule.confidence)
                    // not initialized attribute
                    item[rule.dependent] = AnalysisEffect(rule.effect)(item)
            }
        }
        return item
    }
}
