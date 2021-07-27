import React,{Component} from 'react'
import header from './index.module.css'

export default class Header extends Component{
    render() {
        return <header><h1 className={header.Myheader}>Waikato Car Park</h1></header>//this name is customized which will be read by ajax in the future.
    }
}
