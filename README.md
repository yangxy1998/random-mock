# random-mock

[中文](./README-CHINESE.md) | [English](./README.md)

Lightweight JavaScript random sample generator.

random-mock is a random variable generator that can generate multidimensional variables with specified distribution or correlation, which can be installed through NPM.

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
        distribution: new Distribution.Discrete.Discrete(['CN', 'US'], [0.8, 0.2])
    }
]
```

The above code defines a continuous variable x subject to standard normal distribution and a discrete variable subject to binomial distribution, in which the occurrence probability of CN is 0.8 and the occurrence probability of US is 0.2

## Rules Definition

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

The above code defines a rule about variable y, where dependent indicates the dependent variable, and its value is affected by the independent variables (i.e. region and x) indicated by arguments.

Filter is an optional parameter, which is used to specify the filter criteria. It filters all elements that meet the specified rules.

Effect is required to specify a correlation rule. The parameter should be an independent variable and the return value of the function is a dependent variable.

Confidence is used to specify the confidence of this rule, indicating the minimum rate of compliance with the specified rule in the sample filtered by the filter.

At present, you need to ensure that the parameter list in the function prototype of filter and effect corresponds to the property name.

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

```js
Distribution.Continuous.Uniform // uniform distribution
Distribution.Continuous.Normal // normal distribution
Distribution.Discrete.Discrete // specifies the discrete variable corresponding to the distribution rate
Distribution.Date.Uniform // uniformly distributed time parameters
Distribution.Date.Normal // time parameter of normal distribution
```

## Mocker

```js
let mocker = new Mocker({
    attributes,
    rules
})
```

A mocker configuration item should contain attribute list `attributes` and rule list `rules`.

```js
mocker.create({
    count: 1e5,
    mode: DataMode.Object
})
```

The above code will return a list with a length of 10000, and each item in the list is a sample generated according to the specified rules.
