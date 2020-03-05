import React from 'react';
import './App.css';
import { Component } from 'react';
/*import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';*/
import moment from 'moment'

class App extends Component {
    constructor(props){
        super(props);
        //初始化状态
        this.state = {
            userName:'',
            password:'',
            nameHelp: '',
            passwordHelp: ''
        };
        console.log("1页面");
        //绑定this
        this.login = this.login.bind(this);
        this.userNameChange = this.userNameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }
    userNameChange(event){
        //读取输入的值
        const  userName =event.target.value;
        //更新状态(方法一：需要名字一样)
        this.setState({userName})

        //方法二（名字不一样的时候，大括号里边第一个参数是要设置的状态，第二个参数是给第一个参数的状态设置的值）
        // this.setState({userName:userName1});
        console.log("读取的值"+this.state.userName)
        this.setState({
            // nameHelp: ""
            help:""
        });
    }
    passwordChange(event){
        const password = event.target.value;
        this.setState({password});
        this.setState({
            // passwordHelp: ""
            help:""
        })
    }
    login(event){
        //var isRight = false;
        const userName = this.state.userName;
        const password = this.state.password;
        //alert(`用户名为：${userName},密码为：${password}`)
        //阻止默认行为（对于submit按钮来说即阻止表单的提交）
        event.preventDefault();

        //数据验证
        if (!userName){
            this.setState({
                help:'* 用户名不能为空'
            });
            //alert("用户名不能为空");
        }else  if (!password){
            this.setState({
                help:'* 密码不能为空'
            });
            // alert("密码不能为空");
        }else {
            /*//去查询数据库
            var xhr = new XMLHttpRequest();
            xhr.withCredentials=true;
            var url = "http://localhost:8080/selectUserByUserNameAndPassword?userName="+userName+"&password="+password;
            console.log(url);
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send();
            xhr.onreadystatechange = function() {
                /!*
                xhr.readyState 的值 (未验证，先写在这)
                0：请求未初始化，还没有调用 open()。
                1：请求已经  建立，但是还没有发送，还没有调用 send()。
                2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
                3：请求在处理中；通常响应中已有部分数据可用了，没有全部完成。
                4：响应已完成；您可以获取并使用服务器的响应了。
                xhr.status 的值
                https://blog.csdn.net/liu050604/article/details/78464500
                * *!/
                console.log(xhr.readyState);
                //alert(xhr.readyState);
                //alert(xhr.status);
                if (xhr.readyState == 4 && xhr.status === 200) {
                    /!*alert(xhr.responseText);
                    console.log(xhr.responseText);*!/
                    if ("" === xhr.responseText){
                        //未查询到指定用户
                        alert("用户名或密码不对");
                        //isRight = true;
                        //alert(isRight);
                    }else {
                        //正常，可以登录
                        alert("正确");

                    }
                }
            };*/


            //修改请求头
            let myHeaders = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain'
            });
            const url ="http://localhost:8080/selectUserByUserNameAndPassword?userName="+userName+"&password="+password;
            fetch(url,{
                method:'GET',
                headers: myHeaders,
                //转或称字符串格式
            }).then(res=>res.json()).then(
                data=>{
                    console.log(data);
                    console.log(data.id);
                    if (data.id === undefined){
                        //未查询到指定用户
                        //alert("用户名或密码不对");
                        //清空用户名和密码
                        this.setState({userName:'',password:'',help:'* 用户名或密码错误，请重新输入'});
                        console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
                    }else {
                        //正确
                        //alert(`正确`);
                        /*const win = window.open("_self");
                        win.location.href="main.html";*/
                        /*更新用户登陆时间*/
                        const loginTime = moment().format('YYYY-MM-DD HH:mm:ss');
                        const loginTimeUrl = 'http://localhost:8080/updateLoginTimeById?loginTime='+loginTime+'&id='+data.id;
                        console.log(loginTimeUrl);
                        console.log(loginTime);
                        fetch(loginTimeUrl,{
                            method:'GET',
                            headers:myHeaders,
                        }).then(loginRes=>loginRes.json()).then(
                            data=>{
                                console.log(data);
                            }
                        );
                        this.props.history.replace('/home/'+userName);
                    }
                }
            )
        }
    }
    render() {
        return (
            <div className="App">
                <div className="app_body_style">
                    <form name="login-form" onSubmit={this.login} className="from_style">
                        <div className="help_div_style">
                            {/*<span className="help_block">{this.state.passwordHelp}</span>
                            <span className="help_block">{this.state.nameHelp}</span>*/}
                            <span className="help_block">{this.state.help}</span>
                        </div>
                        <div>
                            <label className="text">用&nbsp;户&nbsp;名：</label>
                            <input placeholder="请输入你的用户名" type="text" value={this.state.userName}
                                   onChange={this.userNameChange} className="input_style"/>
                        </div>
                        <div className="password_div_style">
                            <label className="text">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                            <input placeholder='请输入密码' type="password" value={this.state.password}
                                   onChange={this.passwordChange} className="input_style"/>
                        </div>
                        <div>
                            <div className="bottom_div_style">
                                <input className="bottom_btn_style" type="submit" value="登录" />
                            </div>
                           {/* <div className="bottom_div_style">
                                <input  className="bottom_btn_style" type="button" value="注册" />
                            </div>*/}
                        </div>
                    </form>

                </div>
            </div>
        );
    };
}
export default App;
