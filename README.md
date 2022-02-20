# random-mock

[中文](./README-CHINESE.md) | [English](./README.md)

Lightweight JavaScript random sample generator

Random mock is a random variable generator that can generate multidimensional variables with specified distribution or correlation, which can be installed through NPM.

```bash
npm install random-mock
```

# Usage

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

## Attribute Definition

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

The above code defines a continuous variable x subject to standard normal distribution and a discrete variable subject to binomial distribution, in which the occurrence probability of CN is 0.8 and the occurrence probability of us is 0.2

| Definition                | description         |
| ------------------------- | ------------------- |
| AttributeType. Discrete   | discrete variable   |
| AttributeType. Continuous | continuous variable |
| AttributeType. Date       | sequential variable |
| AttributeType. Compound   | compound variable   |

## Rules Definition

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

The above code defines a rule about variable `y`, where `dependent` indicates the dependent variable, and its value is affected by the independent variables (i.e. region and x) indicated by `arguments`.

`filter` is an optional parameter, which is used to specify the filter criteria. It filters all elements that meet the specified rules.

`effect` is required to specify a correlation rule. The parameter should be an independent variable and the return value of the function is a dependent variable.

`confidence` is used to specify the confidence of this rule, indicating the minimum rate of compliance with the specified rule in the sample filtered by the filter.

At present, you need to ensure that the parameter list in the function prototype of `filter` and `effect` corresponds to the property name.

### Example 1

Generate 100 sample pairs `{x, y}`, which are required to comply with the linear distribution with the regression equation of y = 3x + 1, with a confidence of 0.99, where the definition domain of `x` is [0,10], and is uniformly distributed.

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

The results are as follows:
![Example 1](/doc/example1.png 'Example 1')

### Example 2

Generate 1000 samples `{x, y, z}`, and the requirements for each attribute are as follows:

`x` is a numerical variable that obeys a normal distribution with a mathematical expectation of 60 and a variance of 10.

`y` follows the uniform distribution of [0100] by default.

`z` is a discrete random variable whose possible values are ['a','b','c'], and the corresponding probability under natural conditions is [0.3,0.6,0.1]

The rules are as follows:

When `x` > 80, the value of `z` should be `'a'`, and the confidence of the rule is 0.95

When `x` > 60 and `x` < 80, the value of `z` should be `'b'`, and the confidence of this rule is 0.99

When `x` > 50, the distribution of Y follows the regression equation y = 100 - x, and follows the normal distribution with variance of 5 on both sides of the equation, and the confidence of the rule is 0.9

When x < 50, the distribution of Y follows the regression equation y = 50 + X, and follows a uniform distribution with an error range of ± 5 on both sides of the equation. The confidence of the rule is 0.97

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

The results are as follows:
![Example 2](/doc/example2.png 'Example 2')

## Distribution

```js
let distribution = new Distribution.Continuous.Uniform([0, 10])
```

The above function defines a uniform distribution in the range of [0,10].

```js
distribution.random()
```

The above function call will return a random variable that obeys the uniform distribution of [0,10].

At present, the realized distribution includes:

| Type          | distribution                      | package name                         | example                                                                      |
| ------------- | --------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| Continuous    | Uniform distribution              | Distribution.Continuous.Uniform      | ![Uniform distribution](/doc/uniform.png 'Uniform distribution')             |
| Continuous    | Normal distribution               | Distribution.Continuous.Normal       | ![Normal distribution](/doc/normal.png 'Normal distribution')                |
| Continuous    | Exponential distribution          | Distribution.Continuous.Exponential  | ![Exponential distribution](/doc/exponential.png 'Exponential distribution') |
| Continuous    | Cauchy distribution               | Distribution.Continuous.Cauchy       | ![Cauchy distribution](/doc/cauchy.png 'Cauchy distribution')                |
| Discrete      | Standard probability distribution | Distribution.Discrete.Standard       |                                                                              |
| Discrete      | Hypergeometric distribution       | Distribution.Discrete.Hypergeometric |                                                                              |
| Chronological | Uniform time series distribution  | Distribution.Date.Uniform            |                                                                              |
| Chronological | Normal time series distribution   | Distribution.Date.Normal             |                                                                              |

## Mocker

```js
let mocker = new Mocker({
    attributes,
    rules
})
```

A `Mocker` configuration item should contain attribute list `attributes` and rule list `rules`.

```js
mocker.create({
    count: 1e5,
    mode: DataMode.Object
})
```

The above code will return a list with a length of 10000, and each item in the list is a sample generated according to the specified rules.
