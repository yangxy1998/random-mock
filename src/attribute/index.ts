import { Continuous } from './Continuous'
import { Date } from './Date'
import { Discrete } from './Discrete'
import { Category } from './Category'
import { Unique } from './Unique'
import { Primary } from './Primary'
import { AttributeConstructor, AttributeConfig, AttributeType } from './Attribute'
export const Attribute = {
    Continuous,
    Date,
    Discrete,
    Category,
    Unique,
    Primary
}
export function AttributeCreater(config: AttributeConfig) {
    if (config.type === AttributeType.Category) {
        return new Category(config.name, config.distribution)
    } else if (config.type === AttributeType.Continuous) {
        return new Continuous(config.name, config.distribution)
    } else if (config.type === AttributeType.Date) {
        return new Date(config.name, config.distribution, config.format, config.record, config.sort)
    } else if (config.type === AttributeType.Discrete) {
        return new Discrete(
            config.name,
            config.distribution,
            config.step,
            config.record,
            config.sort
        )
    } else if (config.type === AttributeType.Primary) {
        return new Primary(
            config.name,
            config.distribution,
            config.count,
            config.formatToValue,
            config.valueToFormat,
            config.retryCount
        )
    } else if (config.type === AttributeType.Unique) {
        return new Unique(
            config.name,
            config.distribution,
            config.formatToValue,
            config.valueToFormat,
            config.retryCount
        )
    } else return new AttributeConstructor(config.name, config.distribution)
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
