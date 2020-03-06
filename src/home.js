import React from 'react';
import './Home.css';
//home.js
 class Home extends React.Component {
     constructor(props){
         super(props);
         //初始化状态
         this.state = {
             currentUserName:'',
             userData:[]
         };
     }

     componentDidMount(){
         // 获取一个session
         var sessionUserName = sessionStorage.getItem("userName");
         console.log("222222");
         console.log(sessionUserName);
         //用户没有登录
         if (sessionUserName == null){
             this.props.history.replace('/');
         }else {
             //用户登录了
             console.log("开始");
             /*console.log(this.props.match.params);
             const currentUserName = this.props.match.params;*/
             this.setState({
                 currentUserName:sessionUserName
             });
             console.log(this.state.currentUserName);
             let myHeaders = new Headers({
                 'Access-Control-Allow-Origin': '*',
                 'Content-Type': 'text/plain'
             });
             const selectAllUserUrl = 'http://localhost:8080/selectAllUser';
             fetch(selectAllUserUrl,{
                 method:'GET',
                 headers:myHeaders,
             }).then(loginRes=>loginRes.json()).then(
                 data=>{
                     console.log(data[0].loginTime);
                     this.setState({userData:data})
                 }
             );
         }
     }

     render() {
         const aaa = this.state.userData;
         console.log(aaa);
         let params=aaa.map(params=>{
             return(
                 /*<div>
                     <span>{params.userName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <span>{params.loginTime}</span>
                 </div>*/
                 <tr key = {params.id}>
                     <td className="td_style">{params.id}</td>
                     <td className="td_style">{params.userName}</td>
                     <td className="td_style">{params.loginTime}</td>
                 </tr>

             )
         });
        return (
            <div>
                <h2 className="h2_style">当前登录的用户为：{this.state.currentUserName}</h2>
                <span className="h2_style">用户登录履历为</span>
                <table className="table_style">
                    <tbody>
                    <td className="td_style">序号</td>
                    <td className="td_style">用户名</td>
                    <td className="td_style">登陆时间</td>
                    {params}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Home;