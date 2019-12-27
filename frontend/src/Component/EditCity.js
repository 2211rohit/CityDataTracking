import React from 'react';
import axios from "axios";


export default class ButtonAppBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            city: "",
            population: "",
            avg_income: "",
            country_id: ""
        };
    }

    componentDidMount() {
        axios.get (
            "http://localhost:5000/show_countries",
         )
        .then(response => {
            console.log(response.data);
            this.setState({
            countries: response.data.data,
        });
            console.log(this.state)
        })
        .catch(function(error) {
            console.log(error);
        });
    };


    handleChange = e => {
        e.preventDefault();
        this.setState({
        [e.target.name]: e.target.value
        });
        console.log(this.state);
    };

    country(e) {
        this.setState ({
            country_id: e.target.value
        })
    }

    add_city(e) {
        e.preventDefault();
        console.log(this.state.avg_income)
        console.log(this.state.city)
        console.log(this.state.population)
        console.log(this.state.country_id)
        axios
        .post(
            "http://localhost:5000/addCity",
            {
            country_id : this.state.country_id,
            population : this.state.population,
            avg_income : this.state.avg_income,
            city : this.state.city
            
            }
        )
        .then(response => {
            console.log(response.data);
            alert("The entry has been Added")
            // this.props.history.push("/");

        })

        .catch(err => {
            console.log(err);
            alert("There is some error in the request")
        }
            );
    }
    render(){
        return (
        <div className="">
            <div className="row mt-5">
            <div className="col-4"></div>
            <div className="col-4">
            <form onSubmit={e => this.add_city(e)}>
                <div className="form-group">
            <div className="col-2"></div>
            
            <div className="col-8">
              <p className="mt-5">Filter By Country:</p>
                <select name = "country_id" onChange={e => this.country(e)}>
                  <option value="" />
                  {this.state.countries.map(row => (
                  <option key={row.id} value={row.id}>{row.country}</option>
                  ))}
                </select>
              {/* </FormControl> */}
                
                
            </div>
                <label htmlFor="">City Name</label>
                <input name="city" type="text" className="form-control" onChange={e => this.handleChange(e)}/>
                <label htmlFor="">City Population</label>
                <input name="population" type="text" className="form-control" onChange={e => this.handleChange(e)}/>
                <label htmlFor="">City Avg Income</label>
                <input name="avg_income" type="text" className="form-control" onChange={e => this.handleChange(e)}/>
                <button type="submit" className="btn btn-primary">Add City</button>
                </div>
            </form>
            </div>
            <div className="col-4"></div>
            </div>
        </div>
        );
    }
}