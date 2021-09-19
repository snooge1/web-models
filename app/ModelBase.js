import {
  ModelInputs
} from "./ModelInputs";

export class ModelBase {
  constructor() {

    /* Create inputs, this.getInputsConfig() should be implement in extended model class,
    if is not, this class method return empty object  */
    this.inputs = new ModelInputs(this.getInputsConfig());

    // List of methods to calculate data, should be implement in extended model class
    this.functionsArr = [];

    /* Numbers of indexes in this.data list for chart label and chart values,
    should be implement in extended model class */
    this.dataLabelArrayIndex = null;
    this.dataValueArrayIndex = null;

    this.data = [];
    this.chartLabel = [];
    this.chartDatatset = [];
  }

  generateData(numberOfData) {
    this.inputs.updateValues();
    this.data.push(this.getStartingValues());

    for (let i = 0; i < numberOfData - 1; i += 1) {
      this.data.push(this.calculateData(this.data[i]));
      this.chartLabel.push(this.data[i][this.dataLabelArrayIndex]);
      this.chartDatatset.push(this.data[i][this.dataValueArrayIndex]);
    }
  }

  calculateData(dataRow) {
    const newDataRow = [];
    for (let i = 0; i < dataRow.length; i += 1) {
      const newData = this.functionsArr[i].call(this, dataRow, newDataRow);
      newDataRow.push(newData);
    }

    return newDataRow;
  }

  setChartDataset() {
    this.chartConfig.data.labels = this.chartLabel;
    this.chartConfig.data.datasets[0].data = this.chartDatatset;
  }

  getStartingValues() {
    // Need to be implement in extended class. Shoud return starting values.
    return [];
  }

  getInputsConfig() {
    /* Need to be implement in extended class. Shoud return config object for inputs, for example:
    {
      input1: {
        name: 'i1',
        fullName: 'input1'
        defaultValue: 0,
        unit: 'u'
      },
      input2: {
        name: 'i2',
      },
    }
    fullName, defaultValue and unit are optional
    */
    return {};
  }

  getChartConfig() {
    // default chart config, can be overwrite in extended class
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
          text: '',
        }
      },
      y: {
        title: {
          display: true,
          text: '',
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