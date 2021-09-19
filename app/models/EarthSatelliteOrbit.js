import {
	ModelBase
} from "../ModelBase";


export class EarthSatelliteOrbit extends ModelBase {
	constructor() {
		super();
		this.name = 'Earth Satellite Orbit';
		this.chartConfig = this.getChartConfig();

		this.functionsArr = [
			this.vxFunction, this.vyFunction, this.xFunction, this.yFunction, this.rFunction,
			this.aFunction, this.axFunction, this.ayFunction, this.hFunction, this.tFunction
		];

		this.dataLabelArrayIndex = 2;
		this.dataValueArrayIndex = 3;
	}

	getStartingValues() {
		const {
			gravity,
			earthMass,
			earthRadius,
			startSpeed,
			startHeight,
		} = this.inputs.getInputsNumberValues();

		const vx = startSpeed;
		const y = earthRadius + startHeight;
		const a = (-gravity) * earthMass / (y ** 2);
		const h = startHeight;

		return [vx, 0, 0, y, y, a, 0, a, h, 0];
	}

	vxFunction(dataRow) {
		const {
			timeChange
		} = this.inputs.getInputsNumberValues();
		return dataRow[0] + (dataRow[6] * timeChange);
	}

	vyFunction(dataRow) {
		const {
			timeChange
		} = this.inputs.getInputsNumberValues();
		return dataRow[1] + (dataRow[7] * timeChange);
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

	rFunction([], newDataRow) {
		return Math.sqrt(newDataRow[2] ** 2 + newDataRow[3] ** 2);
	}

	aFunction([], newDataRow) {
		const {
			gravity,
			earthMass
		} = this.inputs.getInputsNumberValues();
		return -gravity * earthMass / (newDataRow[4] ** 2);
	}

	axFunction([], newDataRow) {
		return newDataRow[5] * newDataRow[2] / newDataRow[4];
	}

	ayFunction([], newDataRow) {
		return newDataRow[5] * newDataRow[3] / newDataRow[4];
	}

	hFunction([], newDataRow) {
		const {
			earthRadius
		} = this.inputs.getInputsNumberValues();
		return newDataRow[4] - earthRadius;
	}

	tFunction(dataRow, []) {
		const {
			timeChange
		} = this.inputs.getInputsNumberValues();
		return dataRow[9] + timeChange;
	}

	setChartDataset() {
		super.setChartDataset();
		const [earthUp, earthDown] = this.earthValues();
		this.chartConfig.data.datasets[1].data = earthUp;
		this.chartConfig.data.datasets[2].data = earthDown;
		this.setScale();
	}

	setScale() {
		const values = {
			max: Math.max(...this.chartDatatset),
			min: Math.min(...this.chartDatatset),
		};
		const label = {
			max: Math.max(...this.chartLabel),
			min: Math.min(...this.chartLabel),
		};
		const {
			x,
			y
		} = this.chartConfig.options.scales;

		this.changeScale(this.chartConfig.defaultScale);

		if (values.max > y.suggestedMax) {
			this.changeScale(values.max);
		}
		if (values.min < y.suggestedMin) {
			this.changeScale(-values.min);
		}
		if (label.max > x.suggestedMax) {
			this.changeScale(label.max);
		}
		if (label.min < x.suggestedMin) {
			this.changeScale(-label.min);
		}
	}

	changeScale(value) {
		this.chartConfig.options.scales.x.suggestedMax = value;
		this.chartConfig.options.scales.x.suggestedMin = -value;
		this.chartConfig.options.scales.y.suggestedMax = value;
		this.chartConfig.options.scales.y.suggestedMin = -value;
	}

	earthValues() {
		const earthUp = [];
		const earthDown = [];
		const {
			earthRadius
		} = this.inputs.getInputsNumberValues();

		for (let i = -earthRadius; i <= earthRadius; i += 20000) {
			const value = Math.sqrt(earthRadius ** 2 - i ** 2);
			earthUp.push({
				x: i,
				y: value
			});
			earthDown.push({
				x: i,
				y: -value
			});
		}

		return [earthUp, earthDown];
	}

	getInputsConfig() {
		const inputs = {
			gravity: {
				name: 'G',
				fullName: 'gravity constant',
				defaultValue: 6.6743e-11,
				unit: 'm/s<sup>2</sup>'
			},
			earthMass: {
				name: 'M<sub>Z</sub>',
				fullName: 'Earth mass',
				defaultValue: 5.972e+24,
				unit: 'kg',
			},
			earthRadius: {
				name: 'r<sub>Z</sub>',
				fullName: 'Earth radius',
				defaultValue: 6.371e+06,
				unit: 'm'
			},
			timeChange: {
				name: '\u0394t',
				fullName: 'time change',
				defaultValue: 22,
				unit: 's'
			},
			startSpeed: {
				name: 'V<sub>0</sub>',
				fullName: 'start speed',
				defaultValue: 5676,
				unit: 'm/s'
			},
			startHeight: {
				name: 'h<sub>0</sub>',
				fullName: 'start height',
				defaultValue: 6.00e+06,
				unit: 'm'
			}
		}

		return inputs;
	}

	getChartConfig() {
		const defaultMaxScale = 1.5e+7;
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
					fill: true,
					pointRadius: .5,
					borderWidth: .5,
					borderColor: '#ff0000',
					tension: 0.1,
					showLine: true,
					cubicInterpolationMode: 'monotone',
				},
				{
					data: null,
					fill: true,
					pointRadius: .5,
					borderWidth: .5,
					borderColor: '#ff0000',
					tension: 0.1,
					showLine: true,
				},
			],
		};

		const scales = {
			x: {
				suggestedMin: -defaultMaxScale,
				suggestedMax: defaultMaxScale,
				ticks: {
					callback: (val) => (val.toExponential()),
				}
			},
			y: {
				suggestedMin: -defaultMaxScale,
				suggestedMax: defaultMaxScale,
				ticks: {
					callback: (val) => (val.toExponential())
				},
			},
		};

		const plugins = {
			legend: {
				display: false,
			}
		};

		const options = {
			aspectRatio: 1,
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
			defaultScale: defaultMaxScale,
		};

		return chartConfig;
	}
}