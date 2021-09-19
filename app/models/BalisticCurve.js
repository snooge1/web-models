import {
  ModelBase
} from "../ModelBase"

export class BalisticCurve extends ModelBase {
  constructor() {
    super();
    this.name = 'Balistic Curve';
    this.chartConfig = this.getChartConfig();

    this.functionsArr = [
      this.vxFunction, this.vyFunction, this.xFunction, this.yFunction, this.axFunction, this.ayFunction
    ];
    this.dataLabelArrayIndex = 2;
    this.dataValueArrayIndex = 3;
  }

  getStartingValues() {
    const {
      startSpeed,
      angle
    } = this.inputs.getInputsNumberValues();

    const angleInRadians = (Math.PI * angle / 180);
    return [
      startSpeed * Math.cos(angleInRadians),
      startSpeed * Math.sin(angleInRadians),
      0,
      0,
      this.axFunction([], [startSpeed * Math.cos(angleInRadians)]),
      this.ayFunction([], [0, startSpeed * Math.sin(angleInRadians)])
    ];
  }

  vxFunction(dataRow) {
    const {
      timeChange
    } = this.inputs.getInputsNumberValues();
    return dataRow[0] + (dataRow[4] * timeChange);
  }

  vyFunction(dataRow) {
    const {
      timeChange
    } = this.inputs.getInputsNumberValues();
    return dataRow[1] + (dataRow[5] * timeChange);
  }

  xFunction(dataRow, newDataRow) {
    const {
      timeChange
    } = this.inputs.getInputsNumberValues();
    return dataRow[2] + (newDataRow[0] * timeChange);
  }

  yFunction(dataRow, newDataRow) {
    const {
      timeChange
    } = this.inputs.getInputsNumberValues();
    return dataRow[3] + (newDataRow[1] * timeChange);
  }

  axFunction([], newDataRow) {
    const {
      drag,
      mass
    } = this.inputs.getInputsNumberValues();
    return -(drag * newDataRow[0]) / mass;
  }

  ayFunction([], newDataRow) {
    const {
      drag,
      mass,
      gravity
    } = this.inputs.getInputsNumberValues();
    return ((-drag * newDataRow[1]) / mass) - gravity;
  }

  setChartDataset() {
    super.setChartDataset();
    this.chartConfig.data.datasets[1].data = new Array(this.chartLabel.length).fill(0);
  }

  getInputsConfig() {
    const inputs = {
      gravity: {
        name: 'g',
        fullName: 'gravity',
        defaultValue: 9.8,
        unit: 'm/s<sup>2</sup>'
      },
      drag: {
        name: '\u03b2',
        fullName: 'drag',
        defaultValue: 0,
      },
      mass: {
        name: 'm',
        fullName: 'mass',
        defaultValue: 10,
        unit: 'kg'
      },
      timeChange: {
        name: '\u0394t',
        fullName: 'time change',
        defaultValue: 0.02,
        unit: 's'
      },
      startSpeed: {
        name: 'V<sub>0</sub>',
        fullName: 'start speed',
        defaultValue: 60,
        unit: 'm/s'
      },
      angle: {
        name: '\u03b1',
        fullName: 'angle',
        defaultValue: 45,
        unit: '\u0366'
      },
    };

    return inputs;
  }

  getChartConfig() {
    const data = {
      labels: null,
      datasets: [{
          data: null,
          fill: false,
          pointRadius: 1,
          borderColor: '#1895aa',
          tension: 0.1,
          showLine: false,
        },
        {
          data: null,
          fill: false,
          pointRadius: 0,
          borderWidth: .5,
          borderColor: '#ff0000',
          tension: 0.1,
          showLine: true,
        }
      ],
    };

    const scales = {
      x: {
        title: {
          display: true,
          text: 'Distance [m]',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Height [m]',
        }
      }
    };

    const plugins = {
      legend: {
        display: false,
      },
    };

    const options = {
      scales: scales,
      plugins: plugins,
      interaction: {
        mode: 'index',
      }
    };

    const chartConfig = {
      type: 'scatter',
      data: data,
      options: options,
    }

    return chartConfig;
  }
}