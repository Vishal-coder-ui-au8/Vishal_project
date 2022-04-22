import React,{Component} from 'react';
import './Header.css';
import {Link,withRouter} from 'react-router-dom';

const url = 'https://user-login-api.herokuapp.com/api/auth/userInfo';
class Header extends Component{
  constructor(){
    super()

    this.state={
        userData:''
    }
}

handleLogout = () => {
    this.setState({userData:''});
    sessionStorage.removeItem('ltk');
    sessionStorage.removeItem('userData');
    this.props.history.push('/')

}

conditionalHeader = () => {
    if(this.state.userData.name){
        let data = this.state.userData;
        let outputArry = [data.name,data.email,data.phone,data.role];
        sessionStorage.setItem('userData', outputArry);
        return(
            <>
                <button className="btn btn-info">Hi {this.state.userData.name}</button>
                &nbsp;
                <button className="btn btn-warning" onClick={this.handleLogout}>Logout</button>
            </>
        )
    }else{
        return(
            <>
                <Link to="/login" className="btn btn-success">
                     LogIn
                </Link> &nbsp;
                <Link to="/register" className="btn btn-warning">
                   Register
                </Link>
            </>
        )  
    }
}

  changeMode = () => {
      var mybody = document.body;
      // if body have class mybody it will remove the class else add
      mybody.classList.toggle('myDark');
  }

  render(){
    return(
      <>
      <header id="headings">
        <div className="divisions row justify-content-center">
            <Link to="/"><span>e!</span></Link>
        </div>
        <div className="clearfix">  
          <div className="p-3 float-right">
            {this.conditionalHeader()}
          </div>
          <button onClick={this.changeMode}>Dark Mode</button>
        </div> 
      </header>
      </>
    )
  }

  componentDidMount(){
    fetch(url, {
      method:'GET',
      headers:{
        'x-access-token':sessionStorage.getItem('ltk')
      }
    })
    .then((res) => res.json())
    .then((data) => {
      this.setState({userData:data})
    })
  }

}

export default withRouter(Header);