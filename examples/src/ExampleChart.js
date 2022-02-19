import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
} from 'chart.js'
Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
)
import { AttributeType } from 'random-mock'

export class ExampleChart {
    constructor() {
        this.context = document.getElementById('chart').getContext('2d')
        this.chart = new Chart(this.context, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Scatter Dataset',
                        data: [
                            {
                                x: -10,
                                y: 0
                            },
                            {
                                x: 0,
                                y: 10
                            },
                            {
                                x: 10,
                                y: 5
                            }
                        ]
                    }
                ]
            },
            options: {
                scales: {}
            }
        })
    }
    data(attributes, data) {
        this.dataset = data
        const menu = document.getElementById('menu')
        const coutinuous = attributes.filter(
            (attribute) => attribute.type === AttributeType.Continuous
        )
        this.discretes = attributes.filter((attribute) => attribute.type === AttributeType.Discrete)
        this.principle = this.discretes[0]
        this.discretes.forEach((discrete, index) => {
            const button = document.createElement('button')
            const label = `${discrete.name}|${index}`
            button.id = label
            button.innerHTML = label
            button.onclick = () => {
                const index = button.id.split('|')[1]
                this.principle = this.discretes[index]
            }
            menu.appendChild(button)
        })
        for (let left = 0; left < coutinuous.length - 1; left++) {
            for (let right = left + 1; right < coutinuous.length; right++) {
                const button = document.createElement('button')
                const label = `${coutinuous[left].name}-${coutinuous[right].name}`
                button.id = label
                button.innerHTML = label
                button.onclick = () => {
                    const attributes = button.id.split('-')
                    const xName = attributes[0]
                    const yName = attributes[1]
                    const datasets = this.principle.distribution.range.map((value) => {
                        const color = '#' + ((Math.random() * 0xffffff) << 0).toString(16)
                        return {
                            borderColor: color,
                            backgroundColor: color,
                            label: `${value}`,
                            data: this.dataset
                                .filter((item) => item[this.principle.name] === value)
                                .map((value) => {
                                    return {
                                        x: value[xName],
                                        y: value[yName]
                                    }
                                })
                        }
                    })
                    console.log(datasets)
                    this.chart.data.datasets = datasets
                    this.chart.update()
                }
                menu.appendChild(button)
            }
        }
    }
}
