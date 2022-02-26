# random-mock

轻量级 Javascript 样本生成器

Random mock 是一种优雅的样本生成器，可以根据预设的规则生成各种样本点，通过 npm 进行安装：

```bash
npm install random-mock
```

# 使用方法

![心形](/doc/heart.png '心形')
上图中的样本是通过以下代码生成的：

```js
const attributes = [
    {
        name: 'x',
        type: 'continuous',
        distribution: {
            type: 'uniform',
            begin: -5,
            end: 5
        }
    },
    {
        name: 'y',
        type: 'continuous',
        distribution: {
            type: 'uniform',
            begin: -5,
            end: 5
        }
    },
    {
        name: 'series',
        type: 'category',
        distribution: {
            type: 'standard',
            range: ['a', 'b']
        }
    }
]
const rules = [
    {
        source: ['x', 'y'],
        target: 'series',
        type: 'mappingtable',
        conditions: [
            {
                and: (item) =>
                    item.x * item.x + Math.pow(item.y - Math.pow(item.x * item.x, 1 / 2), 2) <= 5,
                value: 'a'
            },
            {
                and: (item) =>
                    item.x * item.x + Math.pow(item.y - Math.pow(item.x * item.x, 1 / 2), 2) > 5,
                value: 'b'
            }
        ]
    }
]
const config = {
    attributes,
    rules
}
let mocker = new RandMock.Mocker(config)
let data = mocker.create({
    count: 10000,
    mode: RandMock.DataMode.Object
})
```

上述代码定义了范围为[-5,5]的两个数值型变量 x、y，以及类别型变量 series，并定义了两条规则：

1. 当$x^2+(y-\sqrt[3]{x^2})^2\leq5$（此为心形线方程）时，series 被分为 a 类
2. 当$x^2+(y-\sqrt[3]{x^2})^2>5$时，series 被分为 b 类

你也可以根据需要，将规则进行如下调整：

```js
const rules = [
    {
        source: ['x', 'y'],
        target: 'series',
        type: 'mappingtable',
        conditions: [
            {
                and: (item) => item.x * item.x + item.y * item.y <= 9,
                value: 'a'
            },
            {
                and: (item) => item.x * item.x + item.y * item.y > 9,
                value: 'b'
            }
        ]
    }
]
```

1. 当$x^2+y^2\leq9$时，series 被分为 a 类
2. 当$x^2+y^2>9$时，series 被分为 b 类

生成 10000 个符合上述条件的样本，效果如下：
![示例](/doc/example.png '示例')

# 定义

Random-mock 中有四种主要的数据结构，属性`Attribute`、分布`Distribution`、规则`Regulation`以及样本生成器`Mocker`

## 属性定义

```js
let attributes = [
    {
        name: 'x',
        type: 'continuous',
        distribution: {
            type: 'uniform',
            begin: -5,
            end: 5
        }
    },
    {
        name: 'y',
        type: 'continuous',
        distribution: {
            type: 'uniform',
            begin: -5,
            end: 5
        }
    }
]
```

| 属性类型    | 说明                                         |
| ----------- | -------------------------------------------- |
| continuous  | 连续型变量（在任意区间内可能取得无数个值）   |
| date        | 时序型变量                                   |
| discrete 　 | 有序离散型变量　                             |
| category    | 无序类别型变量                               |
| unique 　   | 唯一型变量（确保所有样本中该变量是唯一的）　 |
| primary     | 主键型变量（确保所有主键变量的组合是唯一的） |

## 分布定义 Distribution

```js
let distribution = {
    type: 'uniform',
    begin: 0,
    end: 10
}
```

上述对象将定义一个[0,10]范围内的均匀分布。

目前已实现的分布包括：
| 分布类型 | 说明 | 示例 |
| --- | --- | --- |
| cauchy | 柯西分布 | ![柯西分布](/doc/cauchy.png '柯西分布')|
| disposable | 一次性分布 | |
| exponential| 指数分布 | ![指数分布](/doc/exponential.png '指数分布')|
| hypergeometric | 超几何分布 | |
| normal | 正态分布 | ![正态分布](/doc/normal.png '正态分布')|
| standard | 标准概率分布 | |
| uniform | 均匀分布 |![均匀分布](/doc/uniform.png '均匀分布') |
