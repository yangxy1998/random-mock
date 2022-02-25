import { AttributeConstructor } from 'src/attribute'

export abstract class RegulationConstructor {
    args: string[]
    constructor(args: string[]) {
        this.args = args
    }
    abstract getValue(item: any): any
}
