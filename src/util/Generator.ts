import { AnalysisEffect, AnalysisFilter } from './Analysis'
import { Attribute } from './Attribute'
import { GetRuleOrder, Rule } from './Rule'

interface GeneratorConfiguation {
    attributes: Array<Attribute>
    rules: Array<Rule> // rules like cause => effect
}
interface DataConfiguration {
    count: number
    mode: DataMode
    settings?: any
}
export enum DataMode {
    Object,
    Table
}
export enum Table {
    ArrangeByRow,
    ArrangeByCol
}
interface TableSettings {
    head: boolean
    mode: Table
}
export class Generator {
    config: GeneratorConfiguation
    attributes: {}
    constructor(config: GeneratorConfiguation) {
        this.config = config
        this.attributes = {}
        for (let attribute of config.attributes) {
            this.attributes[attribute.name] = {
                type: attribute.type,
                distribution: attribute.distribution
            }
        }
    }
    create(
        config: DataConfiguration = {
            count: 100,
            mode: DataMode.Object
        }
    ) {
        if (config.mode === DataMode.Object) {
            return this._createObjectList(config.count)
        } else if (config.mode === DataMode.Table) {
            return this._createTable(config.count, config.settings)
        }
    }
    private _createObjectList(count: number) {
        let items = []
        for (let i = 0; i < count; i++) {
            items.push({})
        }
        let rules = GetRuleOrder(this.config.attributes, this.config.rules)
        for (let rule of rules) {
            if (rule.name) {
                //attribute
                items.forEach((item) => {
                    if (!item[rule.name])
                        // not initialized attribute
                        item[rule.name] = rule.distribution.random()
                })
            } else if (rule.filter) {
                //rule
                items.filter(AnalysisFilter(rule.filter)).forEach((item) => {
                    if (!item[rule.dependent] && Math.random() <= rule.confidence)
                        // not initialized attribute
                        item[rule.dependent] = AnalysisEffect(rule.effect)(item)
                })
            } else {
                //rule
                items.forEach((item) => {
                    if (!item[rule.dependent] && Math.random() <= rule.confidence)
                        // not initialized attribute
                        item[rule.dependent] = AnalysisEffect(rule.effect)(item)
                })
            }
        }
        return items
    }
    private _createTable(count: number, settings = { head: true, mode: Table.ArrangeByRow }) {
        if (settings.mode === Table.ArrangeByRow) {
            let header = this.config.attributes.map((attribute) => attribute.name)
            let items = settings.head ? [header] : []
            for (let i = 0; i < count; i++) {
                items.push(Array(this.config.attributes.length))
            }
            let rules = GetRuleOrder(this.config.attributes, this.config.rules)
            for (let rule of rules) {
                if (rule.type) {
                    //attribute
                    const index = header.indexOf(rule.name)
                    items.forEach((item) => {
                        if (!item[index]) item[index] = rule.distribution.random()
                    })
                } else {
                    //rule
                    const index = header.indexOf(rule.dependent)
                    items.filter(AnalysisFilter(rule.filter)).forEach((item) => {
                        item[index] =
                            Math.random() <= rule.confidence
                                ? AnalysisEffect(rule.effect)
                                : this.attributes[index].distribution.random()
                    })
                }
            }
            return items
        }
    }
}
