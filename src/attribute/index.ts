import { Continuous } from './Continuous'
import { Date } from './Date'
import { Discrete } from './Discrete'
import { Category } from './Category'
import { Unique } from './Unique'
import { Primary } from './Primary'
import { AttributeConstructor, AttributeConfig, AttributeType } from './Attribute'
import { Distribution } from '../distribution'
export type Attribute = (name: string, distribution: Distribution) => AttributeConstructor
export default {
    Continuous: (): Attribute => (name: string, distribution: Distribution) =>
        new Continuous(name, distribution),
    Date:
        (format?: string): Attribute =>
        (name: string, distribution: Distribution) =>
            new Date(name, distribution, format),
    Discrete:
        (step?: number): Attribute =>
        (name: string, distribution: Distribution) =>
            new Discrete(name, distribution, step),
    Category: (): Attribute => (name: string, distribution: Distribution) =>
        new Category(name, distribution),
    Unique:
        (format?: (source: any) => any, retryCount?: number): Attribute =>
        (name: string, distribution: Distribution) =>
            new Unique(name, distribution, format, retryCount),
    Primary:
        (count: number = 100, format?: (source: any) => any, retryCount?: number): Attribute =>
        (name: string, distribution: Distribution) =>
            new Primary(name, distribution, count, format, retryCount)
}
export {
    AttributeConfig,
    AttributeType,
    AttributeConstructor,
    Category,
    Continuous,
    Date,
    Discrete,
    Primary,
    Unique
}
