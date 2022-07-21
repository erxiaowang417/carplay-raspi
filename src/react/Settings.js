import React, {Component} from "react";
import "antd/dist/antd.css";
import './raspiInfo.css';
import { Button, Card, Space, Progress, Drawer, Descriptions} from "antd";
import {HomeTwoTone, LeftOutlined } from '@ant-design/icons';


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
        size="middle"
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
            style={{position:'absolute',height: '64px', width: '64px',top:'50%',marginTop: '-32px',right: '0', fontSize: '64px'}} 
            onClick={boardToggle}
            type="link"
          ></Button>
          
        }
        <p className="title-name">Raspi-info</p>
        <Space className="raspi-info-Space" size={40}>
          <Card  className="raspi-info-Cpu" size="small">
            <Progress
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
            />
            <p className="cpu-text">{this.props.RaspiInfo.Cpu_t}°C</p>
            <p className="cpu-name">CPU</p>
          </Card>
          <Card   className="raspi-info-Cpu" size="small">
            <Progress
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
            />
            <p className="cpu-text">{this.props.RaspiInfo.Gpu_t}°C</p>
            <p className="cpu-name">GPU</p>
          </Card>
          <Card  className="raspi-info-Cpu" size="small">
            <Progress
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
            />
            <p className="cpu-text">{this.props.RaspiInfo.Ram_useage}%</p>
            <p className="cpu-name">RAM</p>
          </Card>
        </Space>   
        <Drawer 
          title="Raspi"
          placement="right" 
          visible={this.state.boardOpen}
          closable={false}
          width="40%"
          zIndex = '1002'
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
