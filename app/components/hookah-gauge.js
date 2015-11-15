import Ember from 'ember';
import Highcharts from 'ember-highcharts/components/high-charts';

const { get, inject } = Ember;

export default Highcharts.extend({

  socketService: inject.service('websockets'),

  setupSocket: function () {
    this._super(...arguments);

    //192.168.1.8
    // let socket = this.get('socketService').socketFor('ws://192.168.1.3:8888');
    let socket = this.get('socketService').socketFor('ws://localhost:8001');


    socket.on('open', function() {
      this.attrs.serverConnected();
      console.log('This will be called');
    }, this);

    socket.on('message', this.updateChart, this);

    socket.on('close', function() {
      this.attrs.serverDisconnected();
      Ember.run.later(this, function() {
        /*
        * This will remove the old socket and try and connect to a new one on the same url.
        * NOTE: that this does not need to be in a Ember.run.later this is just an example on
        * how to reconnect every second.
        */
        socket.reconnect();
      }, 1000);
    }, this);
  }.on('init'),

  // Add some life
  updateChart(messageEvent) {
    let data = JSON.parse(messageEvent.data);
    if (data.action === 'changeUser') {
      this.attrs.changeUser(data.value);
      return;
    }
    let chart = get(this, 'chart');
    if (!chart.renderer.forExport) {
      let point = chart.series[0].points[0];
      point.update(data.value);
    }
  },
  // chartMode: '', // empty, 'StockChart', or 'Map'
  // chartOptions: {},
  // chartData: [],
  // theme: {}
  chartOptions: {
    chart: {
      type: 'gauge',
       plotBackgroundColor: null,
       plotBackgroundImage: null,
       plotBorderWidth: 0,
       plotShadow: false
     },
     title: {
       text: 'Speedometer'
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
      data: [80],
      tooltip: {
        valueSuffix: ' %'
      }
    }]

  }
});
