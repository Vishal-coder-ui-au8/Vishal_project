import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Search.css';

const locationurl = "https://zomoapp.herokuapp.com/location";
const restUrl = "https://zomoapp.herokuapp.com/restaurant?stateId=";

class Search extends Component {
    constructor(props) {
        super(props)

        this.state={
            location:'',
            restaurant:''
        }
    }

    renderCity = (data) => {
        if(data){
            return data.map((item) => {
                return(
                   <option value={item.state_id} key={item.state_id}>
                       {item.state}
                   </option>
                )
            })
        }
    }

    renderRestaurants = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <><option value={item.state_id} key={item.state_id}>{item.restaurant_name} | {item.address}</option>
                    </>
                )
            })
        }
    }

    handleCity = (event) => {
        const stateId = event.target.value;
        fetch(`${restUrl}${stateId}`,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({restaurant:data})
        })
    }

    handleRest = (event) => {
        this.props.history.push(`details/${event.target.value}`)
    }

    render(){
        
        return(
            <>
            <div className="container-fluid maincontainer">      
            
                <div className="p-1 d-flex justify-content-center">
                    <span className="mb-3 d-flex justify-content-center logo">e!</span>
                </div>

                <div className="container d-flex justify-content-center heading">
                    Find The Best Reståurânts, Câfes and Bârs
                </div>

                <div className="row align-items-center justify-content-center">   
                    <div style={{float:'left'}}>
                        <select id="city" onChange={this.handleCity}>
                            <option>---Select Location---</option>
                            {this.renderCity(this.state.location)}
                        </select>
                    </div>
                    <div>
                        <select id="restaurants" onChange={this.handleRest}>
                        <option>---Select Restaurant---</option>
                            {this.renderRestaurants(this.state.restaurant)}
                        </select>
                    </div>
                </div>
                
            </div>
            <Link to="/viewOrderApi">Orders</Link>
            </>
        )
    }

     // on page load we have to call api
     componentDidMount(){
        fetch(locationurl,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({location:data})
        })
    }
}

export default withRouter(Search);