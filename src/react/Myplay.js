import React ,{Component} from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);
var stops = [
  [0, '#00ff00'],
  [0.5, '#ffff00'],
  [1, '#ff0000']
];

class Mychart extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          type: 'gauge',
          plotBackgroundColor: '#515151',
          plotBorderWidth: 0,
          plotShadow: false,
          spacing: 0,
          margin: [0, 0, 0, 0]
        },
        title: {
          text: null
        },
        credits: {
          enabled:false,
        },
        series: [{
          name: 'Speed',
          data: [40.1],
          dataLabels: {
            backgroundColor: '#ffffff',
            format: '{y} °C',
            // borderWidth: 0,
            color:'#000000',
            style:{
              fontSize:'12px',
            },
          },
          dial: {
            backgroundColor: '#ffffff',
            radius: '70%', // 指针半径
            baseLength: '10%', // 指针长度 
            baseWidth: 10, // 宽度
            rearLength: 0 // 尾部长度
          },
          pivot: { // 指针中心圆点
            radius: 2, // 半径
            backgroundColor: '#000' // 背景颜色
          }
        }],
        pane: {
          startAngle: -120,
          endAngle: 120,
          background: [{
            backgroundColor: null,
            borderWidth: 0
          }]
        },
        yAxis: {
            lineWidth: 0,
            minorTickInterval: null,
            title: {
              y: -70
            },
            min: 40,
            max: 80,
            minorTickWidth: 1,
            minorTickLength: 5,
            tickPixelInterval: 20,
            minorTickPosition: 'inside',
            minorTickColor: '#ccc',
            tickWidth: 1,
            tickLegnth: 10,
            offset: -10,
            labels: {//label文字
              step: 4,
              rotation: 'auto',
              style:{
                color:'#fff',
                fontSize:'12px',
              }
            },
            plotBands: [{
              from: 40,
              to: 80,
              color:  {
                linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                stops: stops
              }
            }]
          },
          tooltip: {
            enabled: false
          },
      },
      Gpu_t : 56,
    }
    this.timerNum1= null;
    this.value = this.props.value
  }
  componentDidMount() {
    function getColor(val) {
      let pos = (val-40) / (80-40),
        i = stops.length -1,
        startStop,
        endStop;
      for(; i >= 0; i--) {
        if(stops[i][0] <pos) {
          startStop = stops[i];
          endStop = stops[i +1];
          break;
        }
      }
      pos = (pos - startStop[0]) / (endStop[0] - startStop[0]);
      return new Highcharts.Color(startStop[1]).tweenTo(new Highcharts.Color(endStop[1]), pos);
    };
    this.timerNum1 = setInterval(() => {
      let color = getColor(this.value);

      // console.log('timer_interuput1', this.props.timerNum1)
      
      this.setState({
        options: {
          series: [{
            data: [this.value],
            dial: {
              backgroundColor: color,
            },
          }], 
        }
      })
    },1010);
    
  }
  componentWillUnmount(){
    clearInterval(this.timerNum1);
    console.log('CLR   timer_interuput1', this.props.timerNum1)
  }
  

  render() {
    
    let each = Highcharts.each,
    merge = Highcharts.merge,
    pInt = Highcharts.pInt,
    isNumber = Highcharts.isNumber,
    pick = Highcharts.pick;
    
    Highcharts.seriesTypes.gauge.prototype.translate = function () {
      
      var series = this,
        yAxis = series.yAxis,
        options = series.options,
        center = yAxis.center;
      series.generatePoints();
      each(series.points, function (point) {
        var dialOptions = merge(options.dial, point.dial),
          radius = (pInt(pick(dialOptions.radius, 80)) * center[2]) /
          200,
          baseLength = (pInt(pick(dialOptions.baseLength, 70)) * radius) /
          100,
          rearLength = (pInt(pick(dialOptions.rearLength, 10)) * radius) /
          100,
          baseWidth = dialOptions.baseWidth || 3,
          overshoot = options.overshoot,
          rotation = yAxis.startAngleRad +
          yAxis.translate(point.y, null, null, null, true);
        // Handle the wrap and overshoot options
        if (isNumber(overshoot)) {
          overshoot = overshoot / 180 * Math.PI;
          rotation = Math.max(
            yAxis.startAngleRad - overshoot,
            Math.min(yAxis.endAngleRad + overshoot, rotation)
          );
        } else if (options.wrap === false) {
          rotation = Math.max(
            yAxis.startAngleRad,
            Math.min(yAxis.endAngleRad, rotation)
          );
        }
        rotation = rotation * 180 / Math.PI;
        point.shapeType = 'path';
        // 主要修改了这里，自定义指针 path
        point.shapeArgs = {
          d: dialOptions.path || [
            'M',
            -rearLength, -baseWidth / 2,
            'L',
            baseLength, -baseWidth / 2,
            radius, 0,
            //radius, topWidth / 2,
            baseLength, baseWidth / 2,
            -rearLength, baseWidth / 2,
            -rearLength - baseWidth + 2, 0,
            'z'
          ],
          translateX: center[0],
          translateY: center[1],
          rotation: rotation
        };
        // Positions for data label
        point.plotX = center[0];
        point.plotY = center[1];
      });
    };
    

    return (
      <div>
        <HighchartsReact 
          containerProps={{ style: { height: "180px",width: "180px" } }}
          highcharts={Highcharts}
          options={this.state.options}
        /> 
      </div>

    )
  } 
}


export default Mychart;
