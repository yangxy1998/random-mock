import { Attribute } from '.'
import { Distribution } from '../distribution'
import { DistributionConstructor } from '../distribution/Distribution'
export enum AttributeType {
    Category, // 类别型（无顺序的离散值）
    Discrete, // 离散型（具备大小顺序的离散值）
    Continuous, // 连续型（连续值，可取范围内任意值）
    Date, // 日期
    Compound, // 复合变量
    Unique, // 唯一型变量
    Primary // 作为主键的变量
}

export type AttributeConfig = {
    name: string
    type: Attribute
    distribution: Distribution
}

export class AttributeConstructor {
    name: string
    type!: AttributeType
    distribution: DistributionConstructor
    constructor(name: string, distribution: Distribution) {
        this.name = name
        this.distribution = distribution(this.format)
    }
    random() {
        return this.distribution.random()
    }
    format(source: any) {
        return source
    }
}
