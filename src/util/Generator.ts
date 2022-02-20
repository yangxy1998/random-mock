import { Distribution } from '../distribution/Distribution'
import { AnalysisEffect, AnalysisFilter } from './Analysis'
import { Attribute, AttributeType, isAttribute } from './Attribute'
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
export enum TableMode {
    ArrangeByRow,
    ArrangeByCol
}
interface TableSettings {
    head: boolean
    mode: TableMode
}
export class Generator {
    config: GeneratorConfiguation
    attributes: { [name: string]: { type: AttributeType; distribution: Distribution } }
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
        let items: { [name: string]: any }[] = []
        for (let i = 0; i < count; i++) {
            items.push({})
        }
        let rules = GetRuleOrder(this.config.attributes, this.config.rules)
        for (let singlerule of rules) {
            if (isAttribute(singlerule)) {
                const rule = singlerule
                //attribute
                items.forEach((item) => {
                    if (!item[rule.name])
                        // not initialized attribute
                        item[rule.name] = rule.distribution.random()
                })
            } else if (singlerule.filter) {
                //rule
                const rule = singlerule
                items.filter(AnalysisFilter(singlerule.filter)).forEach((item) => {
                    if (
                        !item[rule.dependent] &&
                        Math.random() <= (rule.confidence ? rule.confidence : 1)
                    )
                        // not initialized attribute
                        item[rule.dependent] = AnalysisEffect(rule.effect)(item)
                })
            } else {
                //rule
                const rule = singlerule
                items.forEach((item) => {
                    if (
                        !item[rule.dependent] &&
                        Math.random() <= (rule.confidence ? rule.confidence : 1)
                    )
                        // not initialized attribute
                        item[rule.dependent] = AnalysisEffect(rule.effect)(item)
                })
            }
        }
        return items
    }
    private _createTable(count: number, settings = { head: true, mode: TableMode.ArrangeByRow }) {
        if (settings.mode === TableMode.ArrangeByRow) {
            const header: string[] = []
            const mapper: { [name: string]: number } = {}
            this.config.attributes.forEach((attribute, index) => {
                mapper[attribute.name] = index
                header.push(attribute.name)
            })
            const items = settings.head ? [header] : []
            for (let i = 0; i < count; i++) {
                items.push(Array(this.config.attributes.length))
            }
            let rules = GetRuleOrder(this.config.attributes, this.config.rules)
            for (let singlerule of rules) {
                if (isAttribute(singlerule)) {
                    //attribute
                    const rule = singlerule
                    const index = header.indexOf(rule.name)
                    items.forEach((item) => {
                        if (!item[index]) item[index] = rule.distribution.random()
                    })
                } else if (singlerule.filter) {
                    //rule
                    const rule = singlerule
                    const index = header.indexOf(rule.dependent)
                    items.filter(AnalysisFilter(singlerule.filter, mapper)).forEach((item) => {
                        if (
                            !item[index] &&
                            Math.random() <= (rule.confidence ? rule.confidence : 1)
                        )
                            item[index] = AnalysisEffect(rule.effect, mapper)(item)
                    })
                } else {
                    //rule
                    const rule = singlerule
                    const index = header.indexOf(rule.dependent)
                    items.forEach((item) => {
                        if (
                            !item[index] &&
                            Math.random() <= (rule.confidence ? rule.confidence : 1)
                        )
                            item[index] = AnalysisEffect(rule.effect, mapper)(item)
                    })
                }
            }
            return items
        }
    }
}
