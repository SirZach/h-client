import Ember from 'ember';
import Highcharts from 'ember-highcharts/components/high-charts';
import SocketOpener from 'hookah-client/mixins/socket-opener';
import SocketInterfaceComponent from 'hookah-client/mixins/socket-interface-component';

const { get } = Ember;

export default Highcharts.extend(SocketOpener, SocketInterfaceComponent, {
  // Add some life
  messageReceived(data) {
    let chart = get(this, 'chart');
    if (!chart || !chart.renderer) {
      return;
    }

    if (!chart.renderer.forExport) {
      let point = chart.series[0].points[0];
      point.update(data.value);
    }
  },

  chartOptions: {
    chart: {
      credits: false,
      type: 'gauge',
       plotBackgroundColor: null,
       plotBackgroundImage: null,
       plotBorderWidth: 0,
       plotShadow: false
     },
     title: {
       text: 'Hookah Meter'
     },
     plotOptions: {
       series: {
         enableMouseTracking: false
       }
     },
     pane: {
      startAngle: -150,
      endAngle: 150,
      background: [{
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#FFF'],
              [1, '#333']
            ]
        },
        borderWidth: 0,
        outerRadius: '109%'
      }, {
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#333'],
              [1, '#FFF']
            ]
        },
        borderWidth: 1,
        outerRadius: '107%'
      }, {
          // default background
      }, {
        backgroundColor: '#DDD',
        borderWidth: 0,
        outerRadius: '105%',
        innerRadius: '103%'
      }]
    },

    // the value axis
    yAxis: {
      min: 0,
      max: 100,

      minorTickInterval: 'auto',
      minorTickWidth: 1,
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickColor: '#666',

      tickPixelInterval: 30,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      labels: {
        step: 2,
        rotation: 'auto'
      },
      title: {
        text: 'Pull Strength'
      },
      plotBands: [{
        from: 0,
        to: 20,
        color: '#E91E63' // pink
      }, {
        from: 20,
        to: 40,
        color: '#F44336' // red
      }, {
        from: 40,
        to: 60,
        color: '#FF9800' // orange
      }, {
        from: 60,
        to: 80,
        color: '#4CAF50' // green
      }, {
        from: 80,
        to: 100,
        color: '#2196F3' // blue
      }]
    },

    series: [{
      name: 'Hookah',
      data: [0],
      tooltip: {
        valueSuffix: ' %'
      }
    }]

  }
});
