import {
	ModelBase
} from "../ModelBase";


export class DampedHarmonicOscilator extends ModelBase {
	constructor() {
		super();
		this.name = 'Damped Harmonic Oscilator';
		this.chartConfig = this.getChartConfig();

		this.functionsArr = [this.aFunction, this.vFunction, this.tFunction, this.xFunction];
		this.dataLabelArrayIndex = 2;
		this.dataValueArrayIndex = 3;
	}

	getStartingValues() {
		const {
			startSpeed,
			startPosition
		} = this.inputs.getInputsNumberValues();

		return [
			0,
			startSpeed,
			0,
			startPosition
		];
	}

	aFunction(dataRow) {
		const {
			dampingConstant,
			springConstant,
			mass
		} = this.inputs.getInputsNumberValues();
		return ((-dampingConstant * dataRow[1]) - (springConstant * dataRow[3])) / mass;
	}

	vFunction(dataRow, newDataRow) {
		const {
			timeChange
		} = this.inputs.getInputsNumberValues();
		return dataRow[1] + (newDataRow[0] * timeChange);
	}

	tFunction(dataRow) {
		const {
			timeChange
		} = this.inputs.getInputsNumberValues();
		return dataRow[2] + timeChange;
	}

	xFunction(dataRow, newDataRow) {
		const {
			timeChange
		} = this.inputs.getInputsNumberValues();
		return dataRow[3] + (newDataRow[1] * timeChange);
	}

	setChartDataset() {
		super.setChartDataset();
		this.chartConfig.data.datasets[1].data = new Array(this.chartLabel.length).fill(0);
	}

	getInputsConfig() {
		const inputs = {
			springConstant: {
				name: 'k',
				fullName: 'spring constant',
				defaultValue: 16,
				unit: 'N/m',
			},
			dampingConstant: {
				name: '\u03b2',
				fullName: 'damping constant',
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
				defaultValue: 0,
				unit: 'm/s'
			},
			startPosition: {
				name: 'x<sub>0</sub>',
				fullName: 'start position',
				defaultValue: 1,
				unit: 'm'
			},
		}

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
					pointRadius: .5,
					borderWidth: .5,
					borderColor: '#ff0000',
					tension: 0.1,
					showLine: true,
				}
			],
		}

		const scales = {
			x: {
				title: {
					display: true,
					text: 'Time [s]',
				}
			},
			y: {
				title: {
					display: true,
					text: 'Swing [m]',
				}
			}
		}

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
			},
		};

		const chartConfig = {
			type: 'scatter',
			data: data,
			options: options,
		}

		return chartConfig;
	}
}