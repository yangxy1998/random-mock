import { DistributionConstructor } from '../distribution/Distribution'
import { AnalysisEffect, AnalysisFilter } from './Analysis'
import { AttributeConstructor, AttributeConfig, AttributeCreater, Compound } from '../attribute'
import { Rule } from './Rule'
import { PrecedenceGraph } from './PrecedenceGraph'
import { AttributeType } from '../attribute/Attribute'
import { Primary } from '../attribute/Primary'
import { RegulationConstructor } from '../regulation/Regulation'
import { CreateRegulation, RegulationConfig } from '../regulation'
interface GeneratorConfiguation {
    attributes: Array<AttributeConfig>
    rules: Array<Rule | RegulationConfig> // rules like cause => effect
}
interface DataConfiguration {
    count?: number
    mode?: DataMode
    settings?: any
    format?: any
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
    precedence: PrecedenceGraph
    attributes: AttributeConstructor[]
    primaries: Primary[]
    compounds: Compound[]
    attributeMap: { [key: string]: AttributeConstructor }
    constructor(config: GeneratorConfiguation) {
        this.config = config
        this.attributes = []
        this.primaries = []
        this.compounds = []
        this.attributeMap = {}
        for (let attributeConfig of config.attributes) {
            const attribute = AttributeCreater(attributeConfig)
            if (attribute instanceof Primary) {
                this.primaries.push(attribute)
                this.attributes.push(attribute)
            } else if (attribute instanceof Compound) this.compounds.push(attribute)
            else {
                this.attributes.push(attribute)
            }
            this.attributeMap[attribute.name] = attribute
        }
        const rules = config.rules.map((rule: any) => {
            if (rule.regulation instanceof RegulationConstructor) return rule
            else {
                rule.regulation = CreateRegulation(rule)
                return rule
            }
        })
        this.precedence = new PrecedenceGraph(this.attributes, rules)
    }
    create(config: DataConfiguration) {
        config = {
            mode: DataMode.Object,
            ...config
        }
        if (config.mode === DataMode.Object) {
            return this._createObjectList(config.count)
        } else if (config.mode === DataMode.Table) {
            return this._createTable(config.count, config.settings)
        }
    }

    private _createObjectList(count?: number) {
        let items: { [name: string]: any }[] = []
        if (this.primaries.length > 0) {
            const cart = (target: any[], primary: Primary) => {
                if (target.length === 0) {
                    return primary.range.map((value) => {
                        return { [primary.name]: value }
                    })
                } else {
                    const result: { [name: string]: any }[] = []
                    target.forEach((element) => {
                        primary.range.forEach((value) => {
                            result.push({ [primary.name]: value, ...element })
                        })
                    })
                    return result
                }
            }
            this.primaries.forEach((primary) => {
                items = cart(items, primary)
            })
            if (count)
                if (count > items.length) console.warn('requested count greater than primary keys')
                else items = items.slice(0, count)
        } else {
            if (count)
                for (let i = 0; i < count; i++) {
                    items.push({})
                }
            else throw Error('count is needed while primary is not defined')
        }
        let sequence = this.precedence.getSequence()
        for (let singlerule of sequence) {
            if (singlerule instanceof AttributeConstructor) {
                const rule = singlerule
                //attribute
                items.forEach((item) => {
                    if (!item[rule.name])
                        // not initialized attribute
                        item[rule.name] = rule.random()
                })
            } else {
                //rule
                const rule = singlerule
                items.forEach((item) => {
                    if (Math.random() <= (rule.confidence ? rule.confidence : 1)) {
                        // not initialized attribute
                        const value = rule.regulation.getValue(item)
                        if (value) item[rule.target] = value
                    }
                })
            }
        }
        for (let compound of this.compounds) {
            items.forEach((item) => {
                item[compound.name] = compound.random(item)
                compound.args.forEach((name) => {
                    delete item[name]
                })
            })
        }
        return items
    }
    private _createTable(count?: number, settings = { head: true, mode: TableMode.ArrangeByRow }) {
        let items = this._createObjectList(count)
        let array = []
        const header = Object.keys(items[0])
        if (settings.head) array.push(header)
        items.forEach((item) => array.push(header.map((name) => item[name])))
        return array
    }
}
