import React from 'react';
import Button from './Button.js';
import OutputScreen from './OutputScreen';


class Calculator extends React.Component{
    constructor(){
        super();
        this.state = {
            question : '', answer : ''
        }
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(event){
        const value = event.target.value;

        switch(value){
            case '=':{
                if(this.state.question!==''){
                    var ans = '';
                    var flag = false;
                    try{
                        ans = eval(this.state.question);
                    }
                    catch(err){
                        this.setState({answer : 'Error', question:''});
                        flag = true;
                    }
                    if(flag === false)
                        this.setState({answer : ans, question : ''});
                }
                break;
            }
            case 'C':{
                this.setState({question:'', answer : ''});
                break;
            }
            case 'Del':{
                var str = this.state.question;
                str = str.substr(0, str.length-1);
                this.setState({question:str});
                break;
            }
            default:{
                var ques = this.state.question;
                ques = ques + value;
                this.setState({question:ques, answer:''});
                break;
            }
        }
    }

    render(){
        return <div className="mainCalc">
            <div className="calculator-title">
                <h1>CALCULATOR</h1>
            </div>
            <OutputScreen question={this.state.question}
            answer={this.state.answer}/>
            <div className="btn-row">
                <Button label={'C'} handleClick={this.handleClick}/>
                <Button label={'Del'} handleClick={this.handleClick}/>
                <Button label={'.'} handleClick={this.handleClick}/>
                <Button label={'/'} handleClick={this.handleClick}/>
            </div>
            <div className="btn-row">
                <Button label={'7'} handleClick={this.handleClick}/>
                <Button label={'8'} handleClick={this.handleClick}/>
                <Button label={'9'} handleClick={this.handleClick}/>
                <Button label={'*'} handleClick={this.handleClick}/>                
            </div>
            <div className="btn-row">
                <Button label={'4'} handleClick={this.handleClick}/>
                <Button label={'5'} handleClick={this.handleClick}/>
                <Button label={'6'} handleClick={this.handleClick}/>
                <Button label={'-'} handleClick={this.handleClick}/>                   
            </div>    
            <div className="btn-row">
                <Button label={'1'} handleClick={this.handleClick}/>
                <Button label={'2'} handleClick={this.handleClick}/>
                <Button label={'3'} handleClick={this.handleClick}/>
                <Button label={'+'} handleClick={this.handleClick}/>                 
            </div>
            <div className="btn-row">
                <Button label={'0'} handleClick={this.handleClick}/>
                <Button label={'='} handleClick={this.handleClick}/>              
            </div>
        </div>
    }
}

export default Calculator;