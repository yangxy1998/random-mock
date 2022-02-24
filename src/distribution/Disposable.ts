import { DistributionConstructor } from './Distribution'
export class Disposable extends DistributionConstructor {
    samples: any[]
    constructor(dataset: any[]) {
        super()
        this.samples = dataset
    }
    random() {
        if (this.samples.length === 0) throw Error('out of samples')
        let random = Math.floor(Math.random() * this.samples.length)
        if (random === this.samples.length) random--
        const sample = this.samples.splice(random, 1)[0]
        return sample
    }
    static Random(dataset: any[]) {
        let random = Math.floor(Math.random() * dataset.length)
        if (random === dataset.length) random--
        const sample = dataset.splice(random, 1)[0]
        return sample
    }
}
