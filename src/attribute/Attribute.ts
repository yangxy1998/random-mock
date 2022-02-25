import { Attribute } from '.'
import { Distribution } from '../distribution'
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
}

export class AttributeConstructor {
    name: string
    type!: AttributeType
    distribution: DistributionConstructor
    constructor(name: string, distribution: DistributionConstructor) {
        this.name = name
        this.distribution = distribution
    }
    random(): any {
        return this.valueToFormat(this.distribution.random())
    }
    formatToValue(source: any) {
        // 自然语言数据转换成分布算法可执行的数据
        return source
    }
    valueToFormat(source: any) {
        // 算法数据转换成自然语言数据
        return source
    }
}
