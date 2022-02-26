import { RegulationConfig, RegulationType } from '../regulation'
import { RegulationConstructor } from '../regulation/Regulation'
export type Rule = {
    // rule like y = 3 * x + 1 ± 0.5
    target: string
    regulation: RegulationConstructor
    confidence?: number
    [argument: string]: any
}
