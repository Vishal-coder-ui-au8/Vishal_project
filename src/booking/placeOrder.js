import React,{Component} from "react";
import {Link} from 'react-router-dom';
import Header from '../Header';
import './placeorder.css';

const url = "https://zomoapp.herokuapp.com/menuItem";
const PostUrl = "https://zomoapp.herokuapp.com/placeOrder";

class PlaceOrder extends Component{
    constructor(props){
        super(props)

        this.state={
            id:Math.floor(Math.random()*10000),
            details:'',
            hotel_name:this.props.match.params.restName,
            amount:'',
            name:sessionStorage.getItem('userData')?sessionStorage.getItem('userData').split(',')[0]:'',
            phone:sessionStorage.getItem('userData')?sessionStorage.getItem('userData').split(',')[2]:'',
            address:'',
            email:sessionStorage.getItem('userData')?sessionStorage.getItem('userData').split(',')[1]:'',
            status:'pending'
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }
    
    handleSubmit = () => {
        fetch(PostUrl,
            {
                method:'POST',
                headers:{
                    'accept':'application/json',
                    'content-type':'application/json'
                },
                body:JSON.stringify(this.state)
            }
        )
        .then(console.log("payment gateway"))
    }

    renderItems = (data) => {
        if(data){
           return data.map((item) => {
                return(
                    <>
                        <div className="menu card" >
                            <div className="card-image" key={this.menu_id}>
                                <img src={item.menu_image} alt="menuImage"/>
                            </div>
                            <div className="card-body">
                                <h4>{item.menu_name}</h4>
                                <p><span className="badge badge-success">{item.menu_type}</span></p>
                                <p>Rs. {item.menu_price}</p>
                            </div>
                        </div>
                    </>
                )
            })
        }else{
            return(
                <div>
                    <div className="spinner-border text-muted"></div>
                    <div className="spinner-grow text-muted"></div>
                    <div className="spinner-border text-success"></div>
                    <div className="spinner-grow text-success"></div>
                </div>
            )
        }
    }   

    render(){
        if(!sessionStorage.getItem('userData')){
            return(
                <div>
                    <h1>Login first to place booking</h1>
                    <Link to='/login'><button className="btn btn-danger">Login</button></Link>
                </div>
            )
        }
        return(
            <>
                <Header/>
                <div className="container" key={this.state.amount}>
                    <br/>
                    <div className="card">
                        <div className="card-heading" style={{backgroundColor:'powderblue'}}>
                            <h2 style={{Color:'midnightblue',fontWeight:'bold',margin:'8px 8px'}}>Your Order from {this.props.match.params.restName}</h2>
                        </div>
                       
                        <div className="card-body">
                            {this.renderItems(this.state.details)}
                        </div>
                        <div style={{marginLeft:'10px',color:'maroon'}}><b><h3> Total Price : {this.state.amount}</h3></b></div>
                    </div>    
                    <h4> please! click this.(after filling the address)</h4><button onClick={this.handleSubmit}>Submit</button>
                    <form method="POST"  action="http://localhost:4000/paynow">
                        <div className="form row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><b>Name</b></label>
                                    <input className="form-control" name="name" value={this.state.name} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><b>Email</b></label>
                                    <input className="form-control" name="email" value={this.state.email} onChange={this.handleChange}/>
                                </div> 
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><b>Phone</b></label>
                                    <input className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><b>Address</b></label>
                                    <input className="form-control" name="address" value={this.state.address} onChange={this.handleChange}/>
                                </div>
                            </div> 
                            
                            <input type="hidden" name="amount" value={this.state.amount}/>
                            <input type="hidden" name="id" value={this.state.id}/>
                            <div className="row">
                                <div className="col-md-4">
                                    <button className="btn btn-success" type="submit">Checkout</button>
                                </div>   
                            </div>
                        </div>     
                    </form>    
                </div>
            </>
        )
    }

    componentDidMount(){
        var menuItem =  sessionStorage.getItem('menu');
        var orderId = []
        menuItem.split(',').map((item) => {
            orderId.push(parseInt(item))
            return 'ok'
        })
        fetch(url,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'content-Type':'application/json'
            },
            body:JSON.stringify(orderId)
        })
        .then((res) => res.json())
        .then((data) => 
        {
            var Totalprice = 0;
            data.map((item) => {
                Totalprice = Totalprice+parseInt(item.menu_price)
                return 'ok'
            })
            this.setState({details:data,amount:Totalprice})
        })
    }
}

export default PlaceOrder;