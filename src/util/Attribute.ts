import { Distribution } from 'src/distribution/Distribution'

export enum AttributeType {
    Discrete,
    Continuous,
    Date,
    Compound
}

export interface Attribute {
    name: string
    type: AttributeType
    distribution: Distribution
}
