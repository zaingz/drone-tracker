import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Table } from 'antd';
import {fetchDrones} from './actions/DroneActions'
import logo from './logo.svg';
import './App.css';

function mapStateToProps ({drones}) {
  return {
    drones
  }
}

class App extends Component {

  state = {
    poll: null
  }

  componentDidMount(){
     const poll = setInterval(()=>{
       this.props.dispatch(fetchDrones());
     }, 1000)
     this.setState({poll})
   }

  componentWillUnmount() {
    clearInterval(this.state.poll)
  }

  render() {
    const { Column } = Table

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Drone Dashboard</h1>
        </header>
        <div className="App-body">
          <Table dataSource={this.props.drones} bordered
           rowClassName={(x) => x.status === 'active'? 'active': 'inactive'}
          >
          <Column
           title="Drone ID"
           dataIndex="id"
           key="id"
          />
          <Column
           title="Drone Position"
           dataIndex="position"
           key="position"
          />
          <Column
           title="Drone Speed"
           dataIndex="speed"
           key="speed"
          />
          <Column
           title="Drone Status"
           key="status"
           dataIndex="status"
          />
          </Table>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App)
