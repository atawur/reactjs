import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  state =({
    hour:'00',
    min:'00',
    sec:'00',
    milisec:'00',
    timerIsOn:0,
    lapArray:[]
  })
  
  startCount=()=>{
   
    if(!this.state.timerIsOn){
      this.setState({
        timerIsOn:1
      })
      
     let intervalCOunt= setInterval(()=>{
        if(!this.state.timerIsOn){
          clearInterval(intervalCOunt);
        }
        //let addingMiliSec=this.state.milisec+1;
        //console.log(addingMiliSec);
        const {hour,min,sec,milisec}= this.state;
        //let 
        this.setState({
          milisec:(parseInt(milisec)+1).toString().length===1?'0'+(parseInt(milisec)+1):parseInt(milisec)+1
          //sec:this.state.milisec==99?this.state.sec+1:0
        });

        if(milisec==99){
          this.setState({
            milisec:'00',
            sec:parseInt(sec)+1
          });
        }
        if(sec==59){
          this.setState({
            sec:'00',
            min:parseInt(min)+1
          });
          
        }
        if(min==59){
          this.setState({
            min:'00',
            hour:parseInt(hour)+1
          });
          
        }
      },10)
    }
    
  }
  pause =()=>{
    this.setState({
      
      timerIsOn:0
    });
  }
  lap=()=>{
    const {hour,min,sec,milisec,lapArray}= this.state;
    let lap={
       hour,
       min
      ,sec
      ,milisec
    }
    let laps=lapArray;
    laps.push(lap);
    this.setState({
      lapArray:laps
    })
    console.log(this.state.lapArray)
  }
  remove = (index)=>{
    let filterArray=this.state.lapArray.filter((lap,i)=>{
      return index!=i;
    })
    this.setState({
      lapArray:filterArray
    })
  }
  render() {
    const {lapArray}= this.state;
    var lapsString='<tr><td></td></tr>';
    
    return (
      <div className="App container">
        <div>{ this.state.hour}:{ this.state.min}:{ this.state.sec}:{ this.state.milisec}</div>
        <div>
          <button onClick={this.startCount.bind(this)}>Start</button>
          <button onClick={this.lap.bind(this)}>Lap</button>
          <button onClick={this.pause.bind(this)}>Pause</button>
          <button onClick={()=>this.setState({hour:'00',
    min:'00',
    sec:'00',
    milisec:'00',
    timerIsOn:0,lapArray:[]})}>Reset</button>
   
        </div>
        <div className='center-text col-lg-4'></div>
        <div className='center-text col-lg-4'>
        <table className="table table-bordered">
        <thead>
          <tr>
            
            <th className='text-center'>Laps</th>
            <th className='text-center'>Actions</th>
          </tr>
        </thead>
    <tbody>
        {
         
            this.state.lapArray.map((lap,index)=>{
                return( 
                <tr key={index}>
                   <td>{lap.hour+':'+lap.min+':'+lap.sec+':'+lap.milisec}</td>
                   <td><i className='fa fa-trash pointer' onClick={()=>this.remove(index)} ></i></td>
                </tr>
                )
              }) 
            
           
        }
        </tbody>
        </table>
        </div>
        <div className='center-text col-lg-4'></div>
      </div>
    );
  }
}

export default App;
