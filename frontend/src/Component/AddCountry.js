import React from 'react';
import axios from "axios";


export default class ButtonAppBar extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      country: ""
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  add_country(e) {
    e.preventDefault();
    console.log(this.state.country)
    axios
      .post(
        "http://localhost:5000/addCountry",
        {country : this.state.country}
        
      )
      .then(response => {
        console.log(response.data);
        // alert("The entry has been deleted")
        this.props.history.push("/");

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
          <form onSubmit={e => this.add_country(e)}>
            <div className="form-group">
              <label htmlFor="">Country Name</label>
              <input name="country" type="text" className="form-control" onChange={e => this.handleChange(e)}/>
            <button type="submit" className="btn btn-primary">Add Country</button>
            </div>
          </form>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    );
  }
}