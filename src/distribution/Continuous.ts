import { Distribution } from './Distribution'

export class Uniform extends Distribution {
    begin: number
    length: number
    constructor(range: [number, number]) {
        super()
        this.begin = range[0]
        this.length = range[1] - range[0]
    }
    random(): any {
        return this.begin + Math.random() * this.length
    }
    static Random(range: [number, number], ...args: any[]): any {
        let begin = range[0]
        let length = range[1] - range[0]
        return begin + Math.random() * length
    }
}
export class Normal extends Distribution {
    u: number
    sigma: number
    constructor(u: number, sigma: number) {
        super()
        this.u = u
        this.sigma = sigma
    }
    random(): any {
        //Box-Muller
        return this.u + Normal._BoxMuller() * this.sigma
    }
    static Random(u: number, sigma: number, ...args: any[]): any {
        return u + Normal._BoxMuller() * sigma
    }
    private static _BoxMuller() {
        var u = 0.0,
            v = 0.0,
            w = 0.0,
            c = 0.0
        do {
            //获得两个（-1,1）的独立随机变量
            u = Math.random() * 2 - 1.0
            v = Math.random() * 2 - 1.0
            w = u * u + v * v
        } while (w == 0.0 || w >= 1.0)
        //这里就是 Box-Muller转换
        c = Math.sqrt((-2 * Math.log(w)) / w)
        //返回2个标准正态分布的随机数，封装进一个数组返回
        //当然，因为这个函数运行较快，也可以扔掉一个
        //return [u*c,v*c];
        return u * c
    }
}

export class Exponential extends Distribution {
    begin: number
    lambda: number
    constructor(offset: number, lambda: number) {
        super()
        this.begin = offset
        this.lambda = lambda
    }
    random() {
        return this.begin - Math.log(Math.random()) / this.lambda
    }
    static Random(begin: number, lambda: number) {
        return begin - Math.log(Math.random()) / lambda
    }
}

export class Cauchy extends Distribution {
    begin: number
    theta: number
    constructor(x0: number, theta: number) {
        super()
        this.begin = x0
        this.theta = theta
    }
    random() {
        return Math.tan((Math.random() - 0.5) * Math.PI) * this.theta + this.begin
    }
    static Random(x0: number, theta: number) {
        return Math.tan((Math.random() - 0.5) * Math.PI) * theta + x0
    }
}

export default { Uniform, Normal, Exponential, Cauchy }
