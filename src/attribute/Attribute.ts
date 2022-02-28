import { Attribute } from '.'
import { Distribution, DistributionConfig, DistributionCreater } from '../distribution'
import { DistributionConstructor } from '../distribution/Distribution'
export enum AttributeType {
    Category = 'category', // 类别型（无顺序的离散值）
    Discrete = 'discrete', // 离散型（具备大小顺序的离散值）
    Continuous = 'continuous', // 连续型（连续值，可取范围内任意值）
    Date = 'date', // 日期
    Compound = 'compound', // 复合变量
    Unique = 'unique', // 唯一型变量
    Primary = 'primary' // 作为主键的变量
}

export type AttributeConfig = {
    name: string
    type: AttributeType
    distribution: DistributionConstructor
    [argument: string]: any
}
export class AttributeConstructor {
    name: string
    type!: AttributeType
    distribution: DistributionConstructor
    formatToValue: (source: any) => any
    valueToFormat: (source: any) => any
    constructor(
        name: string,
        distribution: DistributionConstructor | DistributionConfig,
        formatToValue = (source: any) => {
            // 自然语言数据转换成分布算法可执行的数据
            return source
        },
        valueToFormat = (source: any) => {
            // 算法数据转换成自然语言数据
            return source
        }
    ) {
        this.name = name
        this.formatToValue = formatToValue
        this.valueToFormat = valueToFormat
        this.distribution =
            distribution instanceof DistributionConstructor
                ? distribution
                : DistributionCreater(distribution, this.formatToValue)
    }
    random(...args: any[]): any {
        return this.distribution.random()
    }
}
