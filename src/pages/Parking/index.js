import React,{Component} from "react";
import './index.css';
import Parkimg from './images.jpeg'

import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';

export default class Parking extends Component {
    state = {
        value: '',
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
    getPlate = () =>{
        const {searchInput} = this;
        //console.log(searchInput.state.value);
        this.searchPlate(searchInput.state.value);
    }
    //this method is for searching plate by Ajax from the database
    searchPlate=(plate)=>{
        console.log(plate);
    }
    render() {
        return (<div>
            {/*<WingBlank><div className="sub-title">Normal</div></WingBlank>*/}
            <div className={'imgBox'}>
                <img src={Parkimg} />
            </div>
            <SearchBar placeholder="Please enter your plate"
                       maxLength={6}
                       cancelText={"Cancel"}
                       onSubmit={value=>this.searchPlate(value)}
                       ref={c=>this.searchInput=c}
            />
            <WhiteSpace />
            <WingBlank>
                <Button className={"searchButton"}
                    onClick={this.getPlate}
                >Click to Search</Button>
            </WingBlank>
            <WhiteSpace />
            {/*start from here*/}
            {/*<WingBlank><div className="sub-title">AutoFocus when enter page</div></WingBlank>*/}
            {/*<SearchBar placeholder="自动获取光标" ref={ref => this.autoFocusInst = ref} />*/}
            {/*<WhiteSpace />*/}
            {/*<WingBlank><div className="sub-title">Focus by operation</div></WingBlank>*/}
            {/*<SearchBar*/}
            {/*    placeholder="手动获取获取光标"*/}
            {/*    ref={ref => this.manualFocusInst = ref}*/}
            {/*/>*/}
            {/*<WhiteSpace />*/}
            {/*<WingBlank>*/}
            {/*    <Button*/}
            {/*        onClick={this.handleClick}*/}
            {/*    >click to focus</Button>*/}
            {/*</WingBlank>*/}
            {/*<WhiteSpace />*/}
            {/*<WingBlank><div className="sub-title">Show cancel button</div></WingBlank>*/}
            {/*<SearchBar*/}
            {/*    value={this.state.value}*/}
            {/*    placeholder="Search"*/}
            {/*    onSubmit={value => console.log(value, 'onSubmit')}*/}
            {/*    onClear={value => console.log(value, 'onClear')}*/}
            {/*    onFocus={() => console.log('onFocus')}*/}
            {/*    onBlur={() => console.log('onBlur')}*/}
            {/*    onCancel={() => console.log('onCancel')}*/}
            {/*    showCancelButton*/}
            {/*    onChange={this.onChange}*/}
            {/*/>*/}
        </div>);
    }
}

// ReactDOM.render(<SearchBarExample />, mountNode);