export abstract class Distribution {
    constructor() {}
    abstract random(...args: any[]): any
    static Random(...args: any[]): any {}
}
