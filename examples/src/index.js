import { Mocker, AttributeType, Distribution, DataMode } from 'random-mock'
import { ExampleChart } from './ExampleChart'
ExampleChart.Mocker = Mocker
ExampleChart.AttributeType = AttributeType
ExampleChart.Distribution = Distribution
ExampleChart.DataMode = DataMode
window.ExampleChart = ExampleChart
