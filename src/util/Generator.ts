import { DistributionConstructor } from '../distribution/Distribution'
import { AnalysisEffect, AnalysisFilter } from './Analysis'
import { AttributeConstructor, AttributeConfig, AttributeCreater } from '../attribute'
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
    attributeMap: { [key: string]: AttributeConstructor }
    constructor(config: GeneratorConfiguation) {
        this.config = config
        this.attributes = []
        this.primaries = []
        this.attributeMap = {}
        for (let attributeConfig of config.attributes) {
            const attribute = AttributeCreater(attributeConfig)
            if (attribute instanceof Primary) {
                this.primaries.push(attribute)
            }
            this.attributes.push(attribute)
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
        return items
    }
    private _createTable(count?: number, settings = { head: true, mode: TableMode.ArrangeByRow }) {
        if (settings.mode === TableMode.ArrangeByRow) {
            const header: string[] = []
            const mapper: { [name: string]: number } = {}
            let index = 0
            const cart = (target: Array<any[]>, primary: Primary) => {
                if (target.length === 0) {
                    return primary.range.map((value) => {
                        return [value]
                    })
                } else {
                    const result: any[][] = []
                    target.forEach((element) => {
                        primary.range.forEach((value) => {
                            result.push([...element, value])
                        })
                    })
                    return result
                }
            }
            let items: Array<any[]> = []
            if (this.primaries.length > 0) {
                this.primaries.forEach((primary) => {
                    mapper[primary.name] = index
                    header.push(primary.name)
                    items = cart(items, primary)
                    index++
                })
                if (count)
                    if (count > items.length)
                        console.warn('requested count greater than primary keys')
                    else items = items.slice(0, count)
                items = items.map((item) => item.concat(Array(this.config.attributes.length)))
            } else {
                if (count) {
                    for (let i = 0; i < count; i++) {
                        items.push(Array(this.config.attributes.length))
                    }
                } else throw Error('count is needed while primary is not defined')
            }
            this.config.attributes.forEach((attribute) => {
                mapper[attribute.name] = index
                header.push(attribute.name)
                index++
            })
            if (settings.head) items.unshift(header)
            let sequence = this.precedence.getSequence()
            for (let singlerule of sequence) {
                if (singlerule instanceof AttributeConstructor) {
                    //attribute
                    const rule = singlerule
                    const index = header.indexOf(rule.name)
                    items.forEach((item) => {
                        if (!item[index]) item[index] = rule.random()
                    })
                } else {
                    //rule
                    const rule = singlerule
                    const index = header.indexOf(rule.target)
                    items.forEach((item) => {
                        if (Math.random() <= (rule.confidence ? rule.confidence : 1)) {
                            // not initialized attribute
                            const value = rule.regulation.getValue(item)
                            if (value) item[index] = value
                        }
                    })
                }
            }
            return items
        }
    }
}
