import { AttributeConstructor } from '../attribute'
import { DistributionConstructor } from '../distribution'
import { Expression } from './Expression'
import { RegulationConstructor } from './Regulation'

type Filter = (item: any) => boolean
type ConstantValue = string | number
type Value = ConstantValue | DistributionConstructor | Expression
export interface ConditionMap {
    and?: Filter
    or?: Filter
    value: Value
    [key: string]: ConstantValue[] | any
}

export class MappingTable extends RegulationConstructor {
    conditions: ConditionMap[]
    constructor(args: string[], conditions: ConditionMap[]) {
        super(args)
        this.conditions = conditions
    }
    getValue(item: any) {
        for (let condition of this.conditions) {
            let passed = true
            this.args.forEach((name) => {
                if (condition[name]) {
                    passed = passed && condition[name].includes(item[name])
                }
            })
            if (condition.and) passed = passed && condition.and(item)
            if (condition.or) passed = passed || condition.or(item)
            if (passed) return this._getValue(condition.value)(item)
        }
        return null
    }
    private _getValue(value: Value): (item: any) => ConstantValue {
        if (value instanceof Expression) {
            return (item) => value.getValue(item)
        } else if (value instanceof DistributionConstructor) {
            return () => value.random()
        } else return () => value
    }
}
