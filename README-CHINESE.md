# random-mock

[中文](./README-CHINESE.md) | [English](./README.md)

轻量级 Javascript 随机样本生成器

Random mock 是一种随机变量生成器，可以生成具有指定分布或相关性的多维变量，可以通过 npm 进行安装。

```bash
npm install random-mock
```

# 使用方法

```js
const config = {
    attributes: [
        {
            name: 'x',
            type: AttributeType.Continuous,
            distribution: new Distribution.Continuous.Uniform([0, 10])
        },
        {
            name: 'y',
            type: AttributeType.Continuous,
            distribution: new Distribution.Continuous.Uniform([0, 10])
        },
        {
            name: 'region',
            type: AttributeType.Discrete,
            distribution: new Distribution.Discrete.Discrete(['CN', 'US'], [0.8, 0.2])
        }
    ],
    rules: [
        {
            dependent: 'y',
            arguments: ['region', 'x'],
            filter: (region) => region === 'US',
            effect: (x) => Distribution.Continuous.Normal.Random(-1 * x, 0.5),
            confidence: 0.98
        },
        {
            dependent: 'y',
            arguments: ['x'],
            filter: (x) => x >= 3,
            effect: (x) => Distribution.Continuous.Normal.Random(3 * x + 1, 0.5),
            confidence: 0.95
        }
    ]
}
let generator = new Mocker(config)
let items = generator.create({
    count: 100,
    mode: DataMode.Object
})
```

## 属性定义

```js
let attributes = [
    {
        name: 'x',
        type: AttributeType.Continuous,
        distribution: new Distribution.Continuous.Uniform()
    },
    {
        name: 'region',
        type: AttributeType.Discrete,
        distribution: new Distribution.Discrete.Discrete(['CN', 'US'], [0.8, 0.2])
    }
]
```

上述代码定义了一个服从标准正态分布的连续型变量 x，以及一个服从二项分布的离散型变量，其中 CN 出现概率为 0.8，US 出现概率为 0.2

## 规则定义

```js
let rules = [
    {
        dependent: 'y',
        arguments: ['region', 'x'],
        filter: (region) => region === 'US',
        effect: (x) => rmock.Distribution.Continuous.Normal.Random(-1 * x, 0.5),
        confidence: 0.98
    }
]
```

上述代码定义了一条关于变量 y 的规则，其中 dependent 指明的是因变量，其取值受到 arguments 指明的自变量（即 region 和 x）的影响。
filter 是一个可选参数，用于指定筛选条件，筛选的是所有符合指定规则的元素。
effect 是必需的，用于指定一条相关性规则，参数应是自变量，函数返回值为因变量。
confidence 用于指定这条规则的置信度，指示的是 filter 筛选后的样本中服从指定规则的最小比率。
目前，您需要确保 filter 和 effect 的函数原型当中的参数列表与属性名相对应。

## 分布 Distribution

```js
let distribution = new Distribution.Continuous.Uniform([0, 10])
```

上述函数定义了一个[0,10]范围内的均匀分布。

```js
distribution.random()
```

上述函数调用将返回一个服从[0,10]均匀分布的随机变量。

目前已实现的分布包括：

```js
Distribution.Continuous.Uniform // 均匀分布
Distribution.Continuous.Normal // 正态分布
Distribution.Discrete.Discrete // 指定对应分布率的离散型变量
Distribution.Date.Uniform // 均匀分布的时间参数
Distribution.Date.Normal // 正态分布的时间参数
```

## Mocker

```js
let mocker = new Mocker({
    attributes,
    rules
})
```

一个 Mocker 配置项应当包含属性列表 attributes 及规则列表 rules。

```js
mocker.create({
    count: 1e5,
    mode: DataMode.Object
})
```

上述代码将返回一个长度为 10000 的列表，列表当中每一项都是按照指定规则生成的样本。
