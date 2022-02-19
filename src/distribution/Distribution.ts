export abstract class Distribution {
    constructor() {}
    abstract random(): any
    static Random(...args: any[]): any {}
}
