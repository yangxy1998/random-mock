import { Distribution } from '../distribution/Distribution'
import { AnalysisEffect, AnalysisFilter } from './Analysis'
import { Attribute, AttributeType, isAttribute } from './Attribute'
import { Rule } from './Rule'
import { Unique } from './Unique'
import { PrecedenceGraph } from './PrecedenceGraph'
interface GeneratorConfiguation {
    attributes: Array<Attribute>
    primary?: Unique[]
    rules: Array<Rule> // rules like cause => effect
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
    attributes: { [name: string]: { type: AttributeType; distribution: Distribution } }
    constructor(config: GeneratorConfiguation) {
        this.config = config
        this.attributes = {}
        this.precedence = new PrecedenceGraph(config.attributes, config.rules)
        for (let attribute of config.attributes) {
            this.attributes[attribute.name] = {
                type: attribute.type,
                distribution: attribute.distribution
            }
        }
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
        if (this.config.primary) {
            const cart = (target: any[], unique: Unique) => {
                if (target.length === 0) {
                    return unique.range.map((value) => {
                        return { [unique.name]: value }
                    })
                } else {
                    const result: { [name: string]: any }[] = []
                    target.forEach((element) => {
                        unique.range.forEach((value) => {
                            result.push({ [unique.name]: value, ...element })
                        })
                    })
                    return result
                }
            }
            this.config.primary.forEach((unique) => {
                items = cart(items, unique)
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
    private _createTable(count?: number, settings = { head: true, mode: TableMode.ArrangeByRow }) {
        if (settings.mode === TableMode.ArrangeByRow) {
            const header: string[] = []
            const mapper: { [name: string]: number } = {}
            let index = 0
            const cart = (target: Array<any[]>, unique: Unique) => {
                if (target.length === 0) {
                    return unique.range.map((value) => {
                        return [value]
                    })
                } else {
                    const result: any[][] = []
                    target.forEach((element) => {
                        unique.range.forEach((value) => {
                            result.push([...element, value])
                        })
                    })
                    return result
                }
            }
            let items: Array<any[]> = []
            if (this.config.primary) {
                this.config.primary.forEach((unique) => {
                    mapper[unique.name] = index
                    header.push(unique.name)
                    items = cart(items, unique)
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
