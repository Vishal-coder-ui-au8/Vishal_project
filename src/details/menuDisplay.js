import React,{Component} from 'react';
import './details.css'
import {withRouter} from 'react-router-dom';

class MenuDisplay extends Component {
    orderId = []  
    placeOrder = (id) => {
        console.log("id",`${id}`)
        this.orderId.push(`${id}`)
        this.props.finalOrder(this.orderId)
    } 

    removeOrder = (id) => {
        this.orderId.splice(this.orderId.indexOf(id.toString()),1)
        this.props.finalOrder(this.orderId)
    }

    renderMenu = ({menudata}) => {
        if(menudata){
            return menudata.map((item) => {
                return(
                    <React.Fragment>
                        <div className="container" key={item.menu_id}>
                            <div className="row details">
                                <div className="col-sm-4">
                                    <img src={item.menu_image} alt="restaurant_image" className="restImage" />
                                </div>
                                <div className="col-md-5">
                                    <h3>{item.menu_id}. {item.menu_name}</h3>
                                    <p><span className="badge badge-success">{item.menu_type}</span></p>
                                    <p>Rs.{item.menu_price}</p>
                                </div>
                                <div className='col-sm-2'>
                                    <button type="button" className="btn btn-info" onClick={() => {this.placeOrder(item.menu_id)}}><i className="fas fa-plus"></i></button>
                                    <button type="button" className="btn btn-danger" onClick={() => {this.removeOrder(item.menu_id)}}><i className="fas fa-minus"></i></button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })
        }
    }

    renderCart = (orders) => {
        if(orders){
            return orders.map((item,index) => {
                return (
                    <>
                        <b key={index}> {item} &nbsp;&nbsp; </b> 
                    </>
                )
            })
        }
    }

    render(){
        return(
            <div>
                {this.renderMenu(this.props)}    
                <div>
                    <h4>Item {this.renderCart(this.orderId)} Added.</h4>
                </div>
            </div>
        )
    }  
}

export default withRouter(MenuDisplay);