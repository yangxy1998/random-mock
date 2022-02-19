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
import { AttributeType } from '../../build/random-mock'

export class ExampleChart {
    constructor() {
        const context = document.getElementById('chart').getContext('2d')
        this.chart = new Chart(context, {
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
                scales: {
                    xAxes: [
                        {
                            type: 'linear',
                            position: 'bottom'
                        }
                    ]
                }
            }
        })
    }
    data(attributes, data) {
        const datasets = []
        for (let left = 0; left < attributes.length - 1; left++) {
            for (let right = left + 1; right < attributes.length; right++) {
                if (
                    attributes[left].type === AttributeType.Continuous &&
                    attributes[right].type === AttributeType.Continuous
                ) {
                    const color = '#' + ((Math.random() * 0xffffff) << 0).toString(16)
                    datasets.push({
                        borderColor: color,
                        backgroundColor: color,
                        label: `${attributes[left].name}-${attributes[right].name}`,
                        data: data.map((value) => {
                            return {
                                x: value[attributes[left].name],
                                y: value[attributes[right].name]
                            }
                        })
                    })
                }
            }
        }
        this.chart.data.datasets = datasets
        this.chart.update()
    }
}
