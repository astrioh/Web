import { Chart, Filler } from 'chart.js'
Chart.register(Filler)

export const chartColors = {
  default: {
    primary: '#00D1B2',
    info: '#209CEE',
    danger: '#FF3860',
    success: '#198754'
  },
  aboveLine: {
    success: '#1CA34514',
    danger: '#F1482114'
  }
}

const daysRU = {
  Sun: 'Вс',
  Mon: 'Пн',
  Tue: 'Вт',
  Wed: 'Ср',
  Thu: 'Чт',
  Fri: 'Пт',
  Sat: 'Сб'
}

export const generateDaysLablesNDaysAgo = (days = 7) => {
  const data = []
  const now = new Date()
  for (let i = 0; i <= days; i++) {
    const iDay = new Date().setDate(now.getDate() - i)
    data.unshift(new Date(iDay).toDateString())
  }
  return data
}

export const fillDaysDataSet = (arr) => {
  const labels = generateDaysLablesNDaysAgo()
  const values = []
  for (const label of labels) {
    let counter = 0
    for (const item of arr) {
      if (label === new Date(item.creation_date).toDateString()) {
        console.log(label, new Date(item.creation_date).toDateString())
        counter++
      }
    }
    values.push(counter)
  }
  return { labels, values }
}

const datasetObject = (color, points) => {
  return {
    fill: {
      target: 'origin',
      above: chartColors.aboveLine[color]
    },
    backgroundColor: chartColors.default[color],
    borderColor: chartColors.default[color],
    borderWidth: 3,
    borderDash: [],
    borderDashOffset: 0.0,
    hoverBackgroundColor: 'black',
    pointRadius: 1,
    data: points,
    tension: 0.2,
    cubicInterpolationMode: 'default'
  }
}

export const karmaChartData = (arr, color, aboveLineColor) => {
  const data = fillDaysDataSet(arr)

  for (let i = 0; i < data.labels.length; i++) {
    data.labels[i] = daysRU[data.labels[i].split(' ')[0]]
  }

  return {
    labels: data.labels,
    datasets: [datasetObject(color, data.values)]
  }
}

export const sampleChartData = (points = 7) => {
  const labels = []

  for (let i = 1; i <= points; i++) {
    labels.push(`0${i}`)
  }

  return {
    labels,
    datasets: [datasetObject('danger', points)]
  }
}
