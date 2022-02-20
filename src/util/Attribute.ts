import { Distribution } from '../distribution/Distribution'

export enum AttributeType {
    Discrete,
    Continuous,
    Date,
    Compound
}

export type Attribute = {
    name: string
    type: AttributeType
    distribution: Distribution
}

export function isAttribute(attribute: any): attribute is Attribute {
    return 'name' in attribute && 'type' in attribute && 'distribution' in attribute
}
