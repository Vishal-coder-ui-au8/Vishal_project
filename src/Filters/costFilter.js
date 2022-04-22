import React,{Component} from 'react';
import axios from 'axios';

const url = "https://zomoapp.herokuapp.com/filter"

class CostFilter extends Component{
    filterCost = (event) => {
        let mealId = sessionStorage.getItem('mealId');
        let cost = (event.target.value).split('-');
        let lcost = cost[0];
        let hcost = cost[1];
        let filterurl;
        if(event.target.value===""){
            filterurl = `${url}/${mealId}`
        }else{
            filterurl = `${url}/${mealId}?lcost=${lcost}&hcost=${hcost}`
        }
        axios.get(filterurl)
        .then((res) => {this.props.restPerCost(res.data)})
    }

    render(){
        return(
            <>
                <div style={{marginLeft:'20px'}}>
                    <h4>Cost for two</h4>
                    <div onChange={this.filterCost}>
                        <label className="radio">
                            <input type="radio" name="cuisine" value=""/>All
                        </label><br/>
                        <label className="radio">
                            <input type="radio" name="cuisine" value="151-300"/>151rs to 300rs
                        </label><br/>
                        <label className="radio">
                            <input type="radio" name="cuisine" value="301-450"/>300rs to 450rs
                        </label><br/>
                        <label className="radio">
                                <input type="radio" name="cuisine" value="451-600"/>450rs to 600rs
                        </label><br/>
                        <label className="radio">
                            <input type="radio" name="cuisine" value="601-1200"/>upto 600rs
                        </label><br/>
                    </div> 
                </div> 
            </>
        )
    }
}

export default CostFilter;  