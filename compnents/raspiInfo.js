import React, {Component} from "react";
import "antd/dist/antd.css";
import './raspiInfo.css';
import { Button, Card, Space, Progress, Drawer, Descriptions} from "antd";
import {HomeTwoTone, LeftOutlined } from '@ant-design/icons';
import * as d3 from 'd3';

const scale_t = d3.scaleLinear().domain([40, 70]).range([150, 360 + 30])
const ticks_t = scale_t.ticks(50) // 200 / 4 => 50
const scale_m = d3.scaleLinear().domain([0, 100]).range([150, 360 + 30])
const ticks_m = scale_m.ticks(50) // 200 / 4 => 50

function Chart(props) {
  const { width, height, margin } = props
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
          props.children
        }
      </g>
    </svg>
  )
}
function LArcT(props) {
  const { start, end, color } = props
  let _arc = d3.arc()({
    innerRadius: 67,
    outerRadius: 75,
    startAngle: Math.PI * 2 * (scale_t(start) + 90) / 360,
    endAngle: Math.PI * 2 * (scale_t(end) + 90) / 360
  })
  
  return (
    <path d={_arc} fill={color}></path>
  )
}
function LArcM(props) {
  const { start, end, color } = props
  let _arc = d3.arc()({
    innerRadius: 67,
    outerRadius: 75,
    startAngle: Math.PI * 2 * (scale_m(start) + 90) / 360,
    endAngle: Math.PI * 2 * (scale_m(end) + 90) / 360
  })
  
  return (
    <path d={_arc} fill={color}></path>
  )
}
const config = {
  width: 180,
  height: 180,
  margin: {
    left: 90,
    top: 90,
  },
  c_w: 84,
  c_h: 54
}
class MeterT extends React.Component {   
  constructor(props) {
    super(props)
    this.state = {
      speed: props.value
    }
  }
  render () {
      // config => {width: xxx, height: xxx, margin: xxx}
      return (
          <div className={'container'} style={{height: '180px',width: '180px'}}>
            <Chart {...config}>
              <g >
                <circle cx={0} cy={0} r={82} fill={'rgba(158, 158, 158, .4)'}></circle>
                <circle cx={0} cy={0} r={78} fill={'#515151'}></circle>
                <circle cx={0} cy={0} r={80} fill={'transparent'} stroke={'#fff'}></circle>
                <LArcT start={40} end={55} color={'#00FF00'}></LArcT>
                <LArcT start={55} end={65} color={'#FFFF00'}></LArcT>
                <LArcT start={65} end={70} color={'#FF0000'}></LArcT>
              </g>
              <g fill={'transport'} stroke={'#000000'}>
                {
                  ticks_t.map((tick1) => {
                    let IS_20_TIME = tick1 % 5 === 0
                    let title = IS_20_TIME ? <text  x={65} dominantBaseline={'middle'} textAnchor={'end'} stroke={'#ffff'}>{tick1}</text> : ''
                    return (
                      <g transform={`rotate(${scale_t(tick1)})`} key={tick1}>
                        <path d={`M67, 0L75,0`} strokeWidth={IS_20_TIME ? 2 : 1}></path>
                        {title}
                      </g>
                    )
                  })
                }
              </g>
              <circle cx={0} cy={0} r={7} fill={'rgb(7, 255, 243)'}></circle>
              <path d={`M-26, 3L-26, -5L70, 0Z`} fill={'rgb(7, 255, 243)'} transform={`rotate(${scale_t(this.props.value)})`}>
                <animateTransform ></animateTransform>
              </path> 
            </Chart>
   
          </div>
      )
  }
}
class MeterM extends React.Component {   
  constructor(props) {
    super(props)
    this.state = {
      speed: props.value
    }
  }
  render () {
      // config => {width: xxx, height: xxx, margin: xxx}
      return (
          <div className={'container'} style={{height: '180px',width: '180px'}}>
            <Chart {...config}>
              <g >
                <circle cx={0} cy={0} r={82} fill={'rgba(158, 158, 158, .4)'}></circle>
                <circle cx={0} cy={0} r={78} fill={'#515151'}></circle>
                <circle cx={0} cy={0} r={80} fill={'transparent'} stroke={'#fff'}></circle>
                <LArcM start={0} end={60} color={'#00FF00'}></LArcM>
                <LArcM start={60} end={80} color={'#FFFF00'}></LArcM>
                <LArcM start={80} end={100} color={'#FF0000'}></LArcM>
              </g>
              <g fill={'transport'} stroke={'#000000'}>
                {
                  ticks_m.map((tick2) => {
                    let IS_20_TIME = tick2 % 20 === 0
                    let title = IS_20_TIME ? <text  x={65} dominantBaseline={'middle'} textAnchor={'end'} stroke={'#ffff'}>{tick2}</text> : ''
                    return (
                      <g transform={`rotate(${scale_m(tick2)})`} key={tick2}>
                        <path d={`M67, 0L75,0`}  strokeWidth={IS_20_TIME ? 2 : 1}></path>
                        {title}
                      </g>
                    )
                  })
                }
              </g>
              <circle cx={0} cy={0} r={7} fill={'rgb(7, 255, 243)'}></circle>
              <path d={`M-26, 3L-26, -5L70, 0Z`} fill={'rgb(7, 255, 243)'} transform={`rotate(${scale_m(this.props.value)})`}>
                <animateTransform ></animateTransform>
              </path> 
            </Chart>
   
          </div>
      )
  }
}
class AppRspi extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      boardOpen : false,
    }
  }
  close (){
    this.props.Close() 
  }
  render(){
    const   boardToggle =  () => {
      if(this.state.boardOpen){
        this.setState({boardOpen: false})
      }else
        this.setState({boardOpen: true})
    }
    return(

      <Space
        direction="vertical"
        size="small"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position:'relative',
          top: "auto",
          right: "auto",
          left: "auto",
          // marginRight: "50%"
        }}
      >
        {this.props.openState?
          <Button icon={<HomeTwoTone style={{fontSize: 'inherit'}} /> } style={{ fontSize: '64px'}} className="raspi-exit-Button" onClick={() => this.close()}></Button>
          :<div></div>
        }      
        {this.state.boardOpen?
          <></>:
          <Button 
            icon={<LeftOutlined   style={{fontSize: 'inherit',}} /> } 
            style={{position:'absolute',height: '64px', width: '64px',top:'50%',marginTop: '-32px',right: '0', fontSize: '64px', zIndex:'1008'}} 
            onClick={boardToggle}
            type="link"
          ></Button>
          
        }
        <p className="title-name">Raspi-info</p>
        <Space className="raspi-info-Space" size={25}>
          <Card  className="raspi-info-Cpu" size="small">
            <MeterT value={this.props.RaspiInfo.Cpu_t}/>
            {/* <Progress
              showInfo={false}
              type="dashboard"
              gapDegree={70}//仪表盘进度条缺口角度，可取值 0 ~ 295
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068"
              }}
              percent={((this.props.RaspiInfo.Cpu_t-30)*100/(75-30)).toFixed(1)}
              width={160}
              trailColor="#DCDCDCBF"//缺省颜色 透明灰
              strokeLinecap="butt"//缺口形状
            /> */}
            <p className="cpu-text">{this.props.RaspiInfo.Cpu_t}°C</p>
            <p className="cpu-name"  style={{marginLeft: "56px"}}>CPU</p>
          </Card>
          <Card   className="raspi-info-Cpu" size="small">
            {/* <Progress
              showInfo={false}
              type="dashboard"
              gapDegree={70}//仪表盘进度条缺口角度，可取值 0 ~ 295
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068"
              }}
              percent={((this.props.RaspiInfo.Gpu_t-30)*100/(75-30)).toFixed(1)}
              width={160}
              trailColor="#DCDCDCBF"//缺省颜色 透明灰
              strokeLinecap="butt"//缺口形状
            /> */}
            <MeterT value={this.props.RaspiInfo.Gpu_t}/>
            <p className="cpu-text">{this.props.RaspiInfo.Gpu_t}°C</p>
            <p className="cpu-name" style={{marginLeft: "60px"}}>GPU</p>
          </Card>
          <Card  className="raspi-info-Cpu" size="small">
            {/* <Progress
              showInfo={false}
              type="dashboard"
              gapDegree={70}//仪表盘进度条缺口角度，可取值 0 ~ 295
              strokeColor={{
                "0%": "#43c732",
                "100%": "#c73232"
              }}
              percent={parseFloat(this.props.RaspiInfo.Ram_useage).toFixed(1)}
              width={160}
              trailColor="#DCDCDCBF"//缺省颜色 透明灰
              strokeLinecap="butt"//缺口形状
            /> */}
            <MeterM value={parseFloat(this.props.RaspiInfo.Ram_useage).toFixed(1)}/>
            <p className="cpu-text">{this.props.RaspiInfo.Ram_useage}%</p>
            <p className="cpu-name" style={{marginLeft: "60px"}}>RAM</p>
          </Card>
        </Space>   
        <Drawer 
          title="Raspi"
          placement="right" 
          visible={this.state.boardOpen}
          closable={false}
          width="40%"
          zIndex = '1007'
          mask={true}
          // bodyStyle={{backgroundColor: '#515151'}}
          destroyOnClose="true"
          onClose={boardToggle}
          
        > 
          <Descriptions    bordered>
            <Descriptions.Item label="Model" contentStyle={{backgroundColor:'#CCFFFF'}} span={3}>
              <code style={{color: '#0022ff',fontSize: '20px'}}>{this.props.boardInfo.Model}</code>  
            </Descriptions.Item>
            <Descriptions.Item label="Hardware" contentStyle={{backgroundColor:'#CCFFFF'}} span={3}>
              <code style={{color: '#0022ff',fontSize: '20px'}}>{this.props.boardInfo.Hardware} </code> 
            </Descriptions.Item>
            <Descriptions.Item label="Revision" contentStyle={{backgroundColor:'#CCFFFF'}} span={3}>
              <code style={{color: '#0022ff',fontSize: '20px'}}>{this.props.boardInfo.Revision}</code>
            </Descriptions.Item>
            <Descriptions.Item label="OSversion" contentStyle={{backgroundColor:'#CCFFFF'}} span={3}>
              <code style={{color: '#0022ff',fontSize: '20px'}}>{this.props.boardInfo.Osversion} </code>
            </Descriptions.Item>
          </Descriptions>
        </Drawer> 
      </Space>
    )
  }
}
export default AppRspi;
