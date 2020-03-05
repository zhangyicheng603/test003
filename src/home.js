import React from 'react';
//home.js
 class Home extends React.Component {
     /*
     let myHeaders = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain'
            });
     fetch(loginTimeUrl,{
                            method:'GET',
                            headers:myHeaders,
                        }).then(loginRes=>loginRes.json()).then(
                            data=>{
                                console.log(data);
                            }
                        );
     * */

     constructor(props){
         super(props);
         //初始化状态
         this.state = {
             currentUserName:'',
             userData:[]
         };
     }

     componentDidMount(){
         console.log("开始");
         console.log(this.props.match.params);
         const currentUserName = this.props.match.params;
         this.setState({
             currentUserName:currentUserName.userName
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

     render() {
         /*let datas=[
             {'frstName':'第一个名字1','twoName':'第二个名字1','threeName':'第三个名字1'},
             {'frstName':'第一个名字2','twoName':'第二个名字2','threeName':'第三个名字2'},
             {'frstName':'第一个名字3','twoName':'第二个名字3','threeName':'第三个名字3'}
         ];*/
         const aaa = this.state.userData;
         console.log(aaa);
         let params=aaa.map(params=>{
             return(
                 <div>
                     <span>{params.userName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <span>{params.loginTime}</span>
                 </div>
             )
         });
        return (
            <div>
                <h2>当前登录的用户为：{this.state.currentUserName}</h2>
                {/*<table>
                    <tbody>
                    <tr>
                        <td>用户名</td>
                        <td>登陆时间</td>
                    </tr>
                    </tbody>
                </table>*/}
                {params}
            </div>
        )
    }
}
export default Home;