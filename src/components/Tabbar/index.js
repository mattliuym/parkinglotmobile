import { TabBar } from 'antd-mobile';
import React,{Component} from 'react';
import './index.css';



export default class TabBarExample extends Component {
    constructor(props) {
        super(props);
        console.log(this);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
        };
    }
    // renderContent(pageText) {
    //     // return (
    //     //     <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
    //     //         <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
    //     //         <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
    //     //            onClick={(e) => {
    //     //                e.preventDefault();
    //     //                this.setState({
    //     //                    hidden: !this.state.hidden,
    //     //                });
    //     //            }}
    //     //         >
    //     //             Click to show/hide tab-bar
    //     //         </a>
    //     //         <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
    //     //            onClick={(e) => {
    //     //                e.preventDefault();
    //     //                this.setState({
    //     //                    fullScreen: !this.state.fullScreen,
    //     //                });
    //     //            }}
    //     //         >
    //     //             Click to switch fullscreen
    //     //         </a>
    //     //     </div>
    //     // );
    //     console.log(pageText);
    // }

    render() {
       // console.log(this.props.location.pathname);
        return (
            <div className={"app-tabbar"} style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 50 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="Parking"
                        key="Parking"
                        icon={<div className={"parking"} style={{
                            width: '22px',
                            height: '22px',
                            }}
                        />
                        }
                        selectedIcon={<div className={"parking-selected"} style={{
                            width: '22px',
                            height: '22px',
                           }}
                        />
                        }
                        selected={this.state.selectedTab === 'redTab'}
                        //badge={1}
                        //选项卡图标
                        onPress={() => {
                            //this.linkTo('/parking');
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                        //data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div className={"info"} style={{
                                width: '22px',
                                height: '22px',
                                }}
                            />
                        }
                        selectedIcon={
                            <div className={"info-selected"} style={{
                                width: '22px',
                                height: '22px',
                                }}
                            />
                        }
                        title="Information"
                        key="Information"
                        //badge={'new'}
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                            //this.props.history.push('/parking');
                        }
                        }
                        //data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div className={"settings"} style={{
                                width: '22px',
                                height: '22px',
                               }}
                            />
                        }
                        selectedIcon={
                            <div className={"settings-selected"} style={{
                                width: '22px',
                                height: '22px',
                                }}
                            />
                        }
                        title="Settings"
                        key="Settings"
                        //dot
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

// ReactDOM.render(<TabBarExample />, mountNode);
