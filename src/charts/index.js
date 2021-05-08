/**
 * @typedef {Object} ChartData
 * @param {('line'|'bubble')} type Chart type/design
 * @param {object} data The chart's data
 * @param {string[]} data.labels An array of chart labels
 * @param {Dataset[]} data.datasets The chart entries data as datasets
 * @param {object} [options] Other chart options
 * @param {boolean} [options.responsive] Wether to make the chart responsive
 * @param {number} [options.lineTension]
 * @param {object[]} [options.scales]
 */

/**
 * @typedef {Object} Dataset
 * @param {string} label
 * @param {number[]} data
 * @param {string[]} [backgroundColor] Optional background color
 * @param {string[]} [borderColor] Optional border color
 * @param {number} [borderWidth] Optional border width
 */

/**
 * @typedef {Object} Record
 * @param {string} day Day when the data was recorded
 * @param {number} id
 * @param {number} inside_temp The temperature inside the hive
 * @param {number} inside_hum The humidity inside the hive
 * @param {number} outside_temp The temperature outside the hive
 * @param {number} outside_hum The humidity outside the hive
 */

export const planetChartData = {
  type: 'line',
  data: {
    labels: [
      'Mercury',
      'Venus',
      'Earth',
      'Mars',
      'Jupiter',
      'Saturn',
      'Uranus',
      'Neptune',
    ],
    datasets: [
      {
        // one line graph
        label: 'Number of Moons',
        data: [0, 0, 1, 2, 67, 62, 27, 14],
        backgroundColor: [
          'rgba(54,73,93,.5)', // Blue
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
        ],
        borderColor: [
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
        ],
        borderWidth: 3,
      },
      {
        // another line graph
        label: 'Planet Mass (x1,000 km)',
        data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
        backgroundColor: [
          'rgba(71, 183,132,.5)', // Green
        ],
        borderColor: ['#47b784'],
        borderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25,
          },
        },
      ],
    },
  },
};

/**
 *
 * @param {Record[]} records An array of records to process
 * @returns {ChartData} Generated temperature chart data
 */
export function temperaturesLineal(records) {
  let outsideTemperatures = [];
  let insideTemperatures = [];
  let uniqueDays = [];
  records.forEach(record => {
    outsideTemperatures.push(record.outside_temp);
    insideTemperatures.push(record.inside_temp);
    if (!(record.day in uniqueDays)) uniqueDays.push(record.day);
  });
  return {
    type: 'line',
    data: {
      labels: uniqueDays,
      datasets: [
        {
          label: 'Temperature outside',
          data: outsideTemperatures,
          backgroundColor: [
            'rgba(71, 183,132,.5)', // Green
          ],
          borderColor: ['#47b784'],
          borderWidth: 3,
        },
        {
          label: 'Temperature inside',
          data: insideTemperatures,
          backgroundColor: [
            'rgba(54,73,93,.5)', // Blue
          ],
          borderColor: ['#36495d'],
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      lineTension: 1,
    },
  };
}

/**
 * Return the chart object for the humidities as a linear chart
 * @param {Record[]} records An array of records to process
 * @returns {ChartData} Generated temperature chart data
 */
export function humiditiesLineal(records) {
  let outsideHumidities = [];
  let insideHumidities = [];
  let uniqueDays = [];
  records.forEach(record => {
    outsideHumidities.push(record.outside_hum);
    insideHumidities.push(record.inside_hum);
    if (!(record.day in uniqueDays)) uniqueDays.push(record.day);
  });
  return {
    type: 'line',
    data: {
      labels: uniqueDays,
      datasets: [
        {
          label: 'Temperature outside',
          data: outsideHumidities,
          backgroundColor: [
            'rgba(71, 183,132,.5)', // Green
          ],
          borderColor: ['#47b784'],
          borderWidth: 3,
        },
        {
          label: 'Temperature inside',
          data: insideHumidities,
          backgroundColor: [
            'rgba(54,73,93,.5)', // Blue
          ],
          borderColor: ['#36495d'],
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      lineTension: 1,
    },
  };
}
