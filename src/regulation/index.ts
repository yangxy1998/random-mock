import { DistributionConstructor, DistributionCreater, DistributionType } from '../distribution'
import { Expression } from './Expression'
import { ConditionMap, MappingTable } from './MappingTable'
import { RegulationConstructor } from './Regulation'
export const Regulation = {
    Expression,
    MappingTable
}
export enum RegulationType {
    Expression = 'expression',
    MappingTable = 'mappingtable'
}
export type RegulationConfig = {
    type: RegulationType
    source: string[]
    target: string
    [argument: string]: any
}
function CreateExpression(source: string[], config: any) {
    const expression = new Expression(source, config.expression)
    if (config.distribution) {
        const type = config.distribution
        if (type === DistributionType.Cauchy) expression.Cauchy(config.theta)
        else if (type === DistributionType.Normal) expression.Normal(config.sigma)
        else if (type === DistributionType.Uniform) expression.Uniform(config.difference)
        else
            throw Error(
                'only cauchy | normal | uniform type of distribution is avaliable for expression'
            )
    }
    return expression
}
export function CreateRegulation(config: RegulationConfig) {
    if (config.type === RegulationType.Expression) {
        return CreateExpression(config.source, config)
    } else if (config.type === RegulationType.MappingTable) {
        const conditions: ConditionMap[] = config.conditions.map((condition: any) => {
            const value = condition.value
            if (
                value instanceof DistributionConstructor ||
                value instanceof Expression ||
                typeof value === 'string' ||
                typeof value === 'number'
            )
                return condition
            else {
                if (value.type === RegulationType.Expression) {
                    condition.value = CreateExpression(config.source, value)
                } else if (
                    value.type === DistributionType.Cauchy ||
                    value.type === DistributionType.Disposable ||
                    value.type === DistributionType.Exponential ||
                    value.type === DistributionType.Hypergeometric ||
                    value.type === DistributionType.Normal ||
                    value.type === DistributionType.Standard ||
                    value.type === DistributionType.Uniform
                ) {
                    condition.value = DistributionCreater(value)
                } else {
                    throw Error('value type should be expression or distribution')
                }
                return condition
            }
        })
        return new MappingTable(config.source, conditions)
    }
    throw Error('type of regulation should be defined')
}
export default {
    Expression,
    MappingTable,
    RegulationConstructor
}
