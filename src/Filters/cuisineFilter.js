import React,{Component} from 'react';
import axios from 'axios';

const url = "https://zomoapp.herokuapp.com/filter"

class CuisineFilter extends Component{

    filterCuisine = (event) => {
        let mealId = sessionStorage.getItem('mealId');
        let cuisineId = event.target.value;
        let filterurl;
        if(cuisineId===""){
            filterurl = `${url}/${mealId}`
        }else{
            filterurl = `${url}/${mealId}?cuisine=${cuisineId}`
        }
        axios.get(filterurl)
        .then((res) => {this.props.restPerCuisine(res.data)})
    }

    render(){
        return(
            <>
                <hr/>
                <div style={{marginLeft:'20px'}}>
                <h4>Cuisine Filter</h4>
                    <div onChange={this.filterCuisine}>
                        <label className="radio">
                            <input type="radio" name="Cuisine" value=""/>All
                        </label><br/>
                        <label className="radio">
                            <input type="radio" name="Cuisine" value="1"/>North Indian
                        </label><br/>
                        <label className="radio">
                            <input type="radio" name="Cuisine" value="2"/>South Indian
                        </label><br/>
                        <label className="radio">
                            <input type="radio" name="Cuisine" value="3"/>Chinese
                        </label><br/>
                        <label className="radio">
                            <input type="radio" name="Cuisine" value="4"/>Fast Food
                        </label><br/>
                        <label className="radio">
                            <input type="radio" name="Cuisine" value="5"/>Street food
                        </label>
                    </div>
                    
                </div>
            </>
        )
    }
}

export default CuisineFilter;  