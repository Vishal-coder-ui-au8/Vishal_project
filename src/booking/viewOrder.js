import React from 'react';
import './placeorder.css';

const ViewOrder = (props) => {

    const renderTable = ({orderData}) => {
        console.log("orderData0",orderData)
        if(orderData){
            return orderData.map((item) => {
                return(
                    <tr style={{border:'1px solid black'}}>
                        <td className="id">{item.id}</td>
                        <td>{item.hotel_name}</td>
                        <td className="id">{item.name}</td>
                        <td className="id">{item.phone}</td>
                        <td className="id">{item.email}</td>
                        <td className="id">{item.address}</td>
                        <td>Rs.{item.amount}</td>
                        <td>{item.status}</td>
                        <td>{item.bank}</td>
                        <td className="id">{item.bank_status}</td>
                    </tr>
                )
            })
        }
    }
    return(
        <div>
            <center><h1 style={{color:'brown',fontWeight:'bold'}}>Orders</h1></center>
            <table className="table">
                <thead>
                    <tr style={{backgroundColor:'black',color:'white'}}>
                        <th className="id">Id</th>
                        <th>Rest Name</th>
                        <th className="id">Name</th>
                        <th className="id">Phone</th>
                        <th className="id">Email</th>
                        <th className="id">Address</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Bank</th>
                        <th className="id">Bank Status</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable(props)}
                </tbody>
            </table>
        </div>
    )
}

export default ViewOrder;