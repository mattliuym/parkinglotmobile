import React,{Component} from "react";
import './index.css';
import Parkimg from './images.jpeg'
import axios from 'axios'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';

export default class Parking extends Component {
    state = {
        value: '',
        result:'',
    };
    componentDidMount() {
        //this.autoFocusInst.focus();
    }
    onChange= (value) => {
        this.setState({ value });
    };
    clear = () => {
        this.setState({ value: '' });
    };
    handleClick = () => {
        //this.manualFocusInst.focus();
    }
    //get the car information from backend
    getPlate = () =>{
        const {searchInput} = this;
        this.searchPlate(searchInput.state.value);
    }
    //reformat the date format into a readable style.
    getDate=(time)=>{
        let myDate = new Date(time);
        let year = myDate.getFullYear();
        let month = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1) ;//获取月
        let date = myDate.getDate();
        let  h = myDate.getHours();
        let m = myDate.getMinutes();
        let now = `${date}/${month}/${year} at ${h}:${m}`;
        return now
    }
    //this method is for searching plate by Axios from the database
    searchPlate=(plate)=>{
        //console.log(plate);
        axios.get('/api/SearchPlate/GetCarInfo',{params:{s:plate}}).then(
            response=>{
                if(!response.data[0])
                    return;
                this.setState({result:response.data[0]});
            },
            error=>{
                console.log(error);
            }
        )
    }
    render() {
        let plateinfo;
        if(this.state.result!=""){
            plateinfo=
                <div id={'plateInfo'}>
                    <table>
                        <tbody>
                            <tr><td>Plate Number: </td><td>{this.state.result.plate}</td></tr>
                            <tr><td>Entered Time: </td><td>{this.getDate(this.state.result.inTime)}</td></tr>
                        </tbody>
                    </table>
                </div>;
        }
        return (<div>
            {/*<WingBlank><div className="sub-title">Normal</div></WingBlank>*/}
            <div className={'imgBox'}>
                <img src={Parkimg} />
            </div>
            <SearchBar placeholder="Please enter your plate"
                       maxLength={6}
                       cancelText={"Cancel"}
                       onSubmit={value=>this.searchPlate(value.toUpperCase())}
                       ref={c=>this.searchInput=c}
            />
            <WhiteSpace />
            <WingBlank>
                <Button className={"searchButton"}
                    onClick={this.getPlate}
                >Click to Search</Button>
            </WingBlank>
            <WhiteSpace />
            {plateinfo}
        </div>);
    }
}

// ReactDOM.render(<SearchBarExample />, mountNode);