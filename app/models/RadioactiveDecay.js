import {
  ModelBase
} from "../ModelBase";

export class RadioactiveDecay extends ModelBase {
  constructor() {
    super();
    this.name = 'Radioactive Decay';
    this.chartConfig = this.getChartConfig();

    this.functionsArr = [
      this.tFunction, this.nucleusesFunction, this.integerNucleusesFunction
    ];

    this.dataLabelArrayIndex = 0;
    this.dataValueArrayIndex = 2;

  }

  getStartingValues() {
    const {
      startingNucleuses
    } = this.inputs.getInputsNumberValues();

    return [
      0,
      startingNucleuses,
      startingNucleuses
    ];
  }

  tFunction(dataRow) {
    const {
      timeChange
    } = this.inputs.getInputsNumberValues();

    return dataRow[0] + timeChange;
  }

  nucleusesFunction(dataRow) {
    const {
      timeChange,
      halfLife,
    } = this.inputs.getInputsNumberValues();

    return (dataRow[1] * (2 ** (-timeChange / halfLife)));
  }

  integerNucleusesFunction(dataRow) {
    return Math.round(this.nucleusesFunction(dataRow));
  }

  getInputsConfig() {
    const inputs = {
      halfLife: {
        name: 'T<sub>1/2</sub>',
        fullName: 'half life time',
        defaultValue: 20,
        unit: 's'
      },
      startingNucleuses: {
        name: 'N<sub>0</sub>',
        fullName: 'starting nucleuses',
        defaultValue: 500,
        unit: 'pcs',
      },
      timeChange: {
        name: '\u0394t',
        fullName: 'time change',
        defaultValue: 0.02,
        unit: 's'
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
          text: 'Time [s]',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Nucleuses [pcs]',
        },
      },
    };

    const plugins = {
      legend: {
        display: false,
      },
    };

    const options = {
      scales,
      plugins,
      interaction: {
        mode: 'index',
      },
    };

    const chartConfig = {
      type: 'scatter',
      data,
      options,
    };

    return chartConfig;
  }
}