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
            distribution: new Distribution.Discrete.Standard(['CN', 'US'], [0.8, 0.2])
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
        distribution: new Distribution.Discrete.Standard(['CN', 'US'], [0.8, 0.2])
    }
]
```

上述代码定义了一个服从标准正态分布的连续型变量 x，以及一个服从二项分布的离散型变量，其中 CN 出现概率为 0.8，US 出现概率为 0.2

| 定义                     | 说明         |
| ------------------------ | ------------ |
| AttributeType.Discrete   | 离散型变量   |
| AttributeType.Continuous | 连续型变量   |
| AttributeType.Date 　    | 时序型变量　 |
| AttributeType.Compound   | 复合变量     |

## 规则定义

```js
let rules = [
    {
        dependent: 'y',
        arguments: ['region', 'x'],
        filter: (region) => region === 'US',
        effect: (x) => Distribution.Continuous.Normal.Random(-1 * x, 0.5),
        confidence: 0.98
    }
]
```

上述代码定义了一条关于变量 `y` 的规则，其中 `dependent` 指明的是因变量，其取值受到 `arguments` 指明的自变量（即 `region` 和 `x`）的影响。
`filter` 是一个可选参数，用于指定筛选条件，筛选的是所有符合指定规则的元素。
`effect` 是必需的，用于指定一条相关性规则，参数应是自变量，函数返回值为因变量。
`confidence` 用于指定这条规则的置信度，指示的是 `filter` 筛选后的样本中服从指定规则的最小比率。
目前，您需要确保 `filter` 和 `effect` 的函数原型当中的参数列表与属性名相对应。

### 示例 1

生成 100 个样本对`{x,y}`，要求符合回归方程为 y=3x+1 的线性分布，置信度 0.99，其中 `x` 的定义域为[0,10]，且为均匀分布。

```js
const attributes = [
    {
        name: 'x',
        type: AttributeType.Continuous,
        distribution: new Distribution.Continuous.Uniform([0, 10])
    },
    {
        name: 'y',
        type: AttributeType.Continuous,
        distribution: new Distribution.Continuous.Uniform([1, 31])
    }
]
const rules = [
    {
        dependent: 'y',
        arguments: ['x'],
        effect: (x) => Distribution.Continuous.Normal.Random(3 * x + 1, 0.5),
        confidence: 0.99
    }
]
const config = {
    attributes,
    rules
}
const generator = new Mocker(config)
const data = generator.create({
    count: 100,
    mode: DataMode.Object
})
```

结果如下：
![示例1](/doc/example1.png '示例1')

### 示例 2

生成 1000 个样本`{x,y,z}`，各个属性要求如下：
`x` 是一个服从数学期望为 60，方差为 10 的正态分布的数值型变量。
`y` 在默认条件下，服从[0,100]均匀分布。
`z` 是一个离散型随机变量，其可能的取值为['a','b','c']，在自然条件下对应的概率为[0.3,0.6,0.1]
规则如下：
当 `x`>80 时，`z` 的取值应为 `'a'`，该规则置信度为 0.95
当 `x`>60 且 `x`<80 时，`z` 的取值应为 `'b'`，该规则置信度为 0.99
当 `x`>50 时，`y` 的分布遵循回归方程 y=100-x，且在该方程两侧遵循方差为 5 的正态分布，该规则置信度 0.9
当 `x`<50 时，`y` 的分布遵循回归方程 y=50+x，且在该方程两侧遵循误差范围为 ±5 的均匀分布，该规则置信度 0.97

```js
const attributes = [
    {
        name: 'x',
        type: AttributeType.Continuous,
        distribution: new Distribution.Continuous.Normal(60, 10)
    },
    {
        name: 'y',
        type: AttributeType.Continuous,
        distribution: new Distribution.Continuous.Uniform([0, 100])
    },
    {
        name: 'z',
        type: AttributeType.Discrete,
        distribution: new Distribution.Discrete.Standard(['a', 'b', 'c'], [0.3, 0.6, 0.1])
    }
]
const rules = [
    {
        dependent: 'z',
        arguments: ['x'],
        filter: (x) => x > 80,
        effect: () => 'a',
        confidence: 0.95
    },
    {
        dependent: 'z',
        arguments: ['x'],
        filter: (x) => x < 80 && x > 60,
        effect: () => 'b',
        confidence: 0.99
    },
    {
        dependent: 'y',
        arguments: ['x'],
        filter: (x) => x > 50,
        effect: (x) => Distribution.Continuous.Normal.Random(100 - x, 5),
        confidence: 0.9
    },
    {
        dependent: 'y',
        arguments: ['x'],
        filter: (x) => x < 50,
        effect: (x) => Distribution.Continuous.Uniform.Random([45 + x, 55 + x]),
        confidence: 0.97
    }
]
```

结果如下：
![示例2](/doc/example2.png '示例2')

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
| 类型 | 分布 | 包名 | 示例 |
| --- | --- | --- | --- |
| 连续型 | 均匀分布 | Distribution.Continuous.Uniform| ![均匀分布](/doc/uniform.png '均匀分布') |
| 连续型 | 正态分布 | Distribution.Continuous.Normal |![正态分布](/doc/normal.png '正态分布') |
| 连续型| 指数分布 | Distribution.Continuous.Exponential |![指数分布](/doc/exponential.png '指数分布') |
| 连续型 | 柯西分布 | Distribution.Continuous.Cauchy |![柯西分布](/doc/cauchy.png '柯西分布') |
| 离散型 | 标准概率分布 | Distribution.Discrete.Standard ||
| 离散型 | 超几何分布 | Distribution.Discrete.Hypergeometric ||
| 时序型 | 均匀时序分布 | Distribution.Date.Uniform ||
| 时序型 | 正态时序分布 | Distribution.Date.Normal ||

## Mocker

```js
let mocker = new Mocker({
    attributes,
    rules
})
```

一个 `Mocker` 配置项应当包含属性列表 `attributes` 及规则列表 `rules`。

```js
mocker.create({
    count: 1e5,
    mode: DataMode.Object
})
```

上述代码将返回一个长度为 10000 的列表，列表当中每一项都是按照指定规则生成的样本。
