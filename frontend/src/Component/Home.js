import React from "react";
import axios from "axios";
// import {Link} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Modal from '@material-ui/core/Modal';
import Pagination from "./Pagination";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      data: [],
      countries:[],
      new_data:[],
      city:"",
      country_id:"",
      population:"",
      avg_income:"",
      city_id:"",
      rows : 5,
      total_pages: "",
      pages: 1,
      limit: ""
    };
  }
  // handleSubmit(e) {
  //   e.preventDefault();
  //   axios.post(
  //     "http://localhost:5000/show_data?page=" + this.state.pages, {
  //       limit: this.state.limit
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //       this.setState({
  //         flag: true,
  //         data: response.data.data,
  //         total_pages: Math.ceil(response.data.total_city / this.state.limit)
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // };

  // apiCall = (currentPage = 1) => {
  //   axios
  //     .get("http://localhost:5000/show_data?page=" + currentPage, {
  //       headers : {rows: this.state.rows}
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //       this.setState({
  //         flag: true,
  //         data: response.data.data,
  //         total_pages: Math.ceil(response.data.total_city / this.state.limit)
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // };

  // componentDidMount() {
  //   this.apiCall();
  // }

  componentDidMount() {
    axios.get(
      "http://localhost:5000/show_data",
      {
        headers: {rows: this.state.rows}
      }
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          flag: true,
          data: response.data.data,
        //   total_pages: Math.ceil(response.data.total_feeds / 10)
        });
      })
      .catch(function(error) {
        console.log(error);
      });

      axios.get (
        "http://localhost:5000/show_countries",
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          countries: response.data.data,
        //   total_pages: Math.ceil(response.data.total_feeds / 10)
        });
        console.log(this.state)
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  all_countries() {
    axios.get (
      "http://localhost:5000/show_countries",
    )
    .then(response => {
      console.log(response.data);
      this.setState({
        countries: response.data.data,
      //   total_pages: Math.ceil(response.data.total_feeds / 10)
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


  country_filter(e) {
    console.log("Hello")
    let country = e.target.value
    console.log(country)
    e.preventDefault();
    axios
      .get(
        "http://localhost:5000/countries_cities",
        {
          headers: { country_id: country }
        }
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          flag: true,
          data: response.data.data,
        //   total_pages: Math.ceil(response.data.total_feeds / 10)
        });
      })

      .catch(err => console.log(err));
  }
  population_asc() {
    axios
      .get(
        "http://localhost:5000/data_sorted_population_asc",
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          flag: true,
          data: response.data.data,
        //   total_pages: Math.ceil(response.data.total_feeds / 10)
        });
      })

      .catch(err => console.log(err));
  }


  population_desc() {
    axios
      .get(
        "http://localhost:5000/data_sorted_population_desc",
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          flag: true,
          data: response.data.data,
        //   total_pages: Math.ceil(response.data.total_feeds / 10)
        });
      })

      .catch(err => console.log(err));
  }


  income_asc() {
    axios
      .get(
        "http://localhost:5000/data_sorted_income_asc",
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          flag: true,
          data: response.data.data,
        //   total_pages: Math.ceil(response.data.total_feeds / 10)
        });
      })

      .catch(err => console.log(err));
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
    [e.target.name]: e.target.value
    });
    console.log(this.state);
};

rows(e) {
  this.setState ({
      rows: e.target.value
  })
}

country(e) {
  this.setState ({
      country_id: e.target.value
  })
}

city(e) {
  this.setState ({
      city_id: e.target.value
  })
  console.log(this.state)
}

  income_desc() {
    axios
      .get(
        "http://localhost:5000/data_sorted_income_desc",
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          flag: true,
          data: response.data.data,
        //   total_pages: Math.ceil(response.data.total_feeds / 10)
        });
      })

      .catch(err => console.log(err));
  }

  edit_city(e) {
    e.preventDefault();
    console.log(this.state.avg_income)
    console.log(this.state.city)
    console.log(this.state.population)
    console.log(this.state.country_id)
    axios
    .patch(
        "http://localhost:5000/editCity",
        {
        country_id : this.state.country_id,
        population : this.state.population,
        avg_income : this.state.avg_income,
        city : this.state.city,
        city_id: this.state.city_id
        }
    )
    .then(response => {
        console.log(response.data);
        alert("The entry has been Updated")
        // this.props.history.push("/");

    })

    .catch(err => {
        console.log(err);
        alert("There is some error in the request")
    }
        );
}
  delete_entry(e) {
    let city = e.target.value
    console.log(city)
    axios
      .delete(
        "http://localhost:5000/delCity",
        {
          headers: { city_id: city }
        }
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


  render() {

    if (this.state.flag) {
      return (
        <div>
          <div className="row">
            <div className="col-2"></div>
              
            <div className="col-8">
              <p className="mt-5">Sort By:</p>
                  
              <Button
              className="mr-5"
              variant="contained"
              color="primary"
              onClick={e => this.population_asc(e)}
              >
                Population (Asc)
              </Button>
              
              <Button 
              className="mr-5" 
              variant="contained" 
              color="primary"
              onClick={e => this.population_desc(e)}
              >
                Population (Desc)
              </Button>
              
              <Button 
              className="mr-5" 
              variant="contained" 
              color="primary"
              onClick={e => this.income_asc(e)}
              >
                Income (Asc)
              </Button>
              
              <Button 
              variant="contained" 
              color="primary"
              onClick={e => this.income_desc(e)}
              >
                Income (Desc)
              </Button>
              
            </div>
            <div className="col-2"></div>
          </div>

          <div className="row">
            <div className="col-2"></div>
            
            <div className="col-8">
              <p className="mt-5">Filter By Country:</p>
              <FormControl variant="filled">
                <InputLabel htmlFor="filled-age-native-simple">Select</InputLabel>
                <Select
                  native
                  onChange={e => this.country_filter(e)}
                  inputProps={{
                    name: 'age',
                    id: 'filled-age-native-simple',
                  }}
                >
                  <option value="" />
                  {this.state.countries.map(row => (
                  <option key={row.id} value={row.id}>{row.country}</option>
                  ))}
                </Select>
              </FormControl>
                
                
            </div>
            <div className="col-2"></div>
          </div>

          
          {/* <div className="row">
            <div className="col-2"></div>
            
            <div className="col-8">
              <p className="mt-5">Filter By Country:</p> */}
              {/* <FormControl variant="filled">
                <InputLabel htmlFor="filled-age-native-simple">Select</InputLabel>
                <Select
                  native
                  onChange={e => this.rows(e)}
                >
                  <option value=""/>
                  <option value="5">Rows 5</option>
                  <option value="10">Rows 10</option>
                  <option value="15">Rows 15</option>
                </Select>
              </FormControl> */}
                
{/*                 
            </div>
            <div className="col-2"></div>
          </div> */}

          <div className=" m-5">
            <div className="row">
              <div className="col-2"></div>

              <div className="col-8">
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead className="bg-info">
                      <TableRow>
                        <TableCell className="font-weight-bold text-white">Country</TableCell>
                        <TableCell className="font-weight-bold text-white" >City</TableCell>
                        <TableCell className="font-weight-bold text-white" >Population</TableCell>
                        <TableCell className="font-weight-bold text-white" >Avg income</TableCell>
                        <TableCell className="font-weight-bold text-white" >Edit</TableCell>
                        <TableCell className="font-weight-bold text-white" >Delete</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {this.state.data.map(row => (
                        <TableRow key={row.city_id}>
                          <TableCell className="font-weight-bold" component="th" scope="row">
                            {row.country}
                          </TableCell>
                          <TableCell >{row.city}</TableCell>
                          <TableCell >{row.population}</TableCell>
                          <TableCell >{row.avg_income}</TableCell>
                          <TableCell value={row.city_id} onClick={e => this.city(e)}  className="text-primary bg-light btn" data-toggle="modal" data-target="#exampleModal1" ><EditIcon /></TableCell>
                          <div className="modal fade" id="exampleModal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h3 className="modal-title text-danger" id="exampleModalLabel">Edit Window</h3>
                                  {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button> */}
                                </div>
                                <div className="modal-body">
                                <form onSubmit={e => this.edit_city(e)}>
                                  <div className="form-group">
                                  <div className="col-2"></div>
                                  
                                  <div className="col-8">
                                  <h3 className="modal-title text-primary" >Edit {row.city_id}</h3>
                                    
                                      <select name = "country_id" onChange={e => this.country(e)}>
                                        <option value="" />
                                        {this.state.countries.map(row => (
                                        <option key={row.id} value={row.id}>{row.country}</option>
                                        ))}
                                      </select>
                                      
                                  </div>
                                  <label htmlFor="">City Name</label>
                                        <input name="city" type="text" className="form-control" onChange={e => this.handleChange(e)}/>
                                  <label htmlFor="">City Population</label>
                                  <input name="population" type="text" className="form-control" onChange={e => this.handleChange(e)}/>
                                  <label htmlFor="">City Avg Income</label>
                                  <input name="avg_income" type="text" className="form-control" onChange={e => this.handleChange(e)}/>
                                  <button type="submit" className="btn btn-primary">Update City</button>
                                  </div>
                              </form>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                  {/* <button type="button" value={row.city_id} onClick={e => this.edit_entry(e)} className="btn btn-success">Update?</button> */}
                                </div>
                              </div>
                            </div>
                          </div>


                          
                          <TableCell data-toggle="modal" data-target="#exampleModal" className="text-danger bg-light btn"><DeleteIcon /></TableCell>
                          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h3 className="modal-title text-danger" id="exampleModalLabel">Warning!</h3>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  Are you Sure?
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                  <button type="button" value={row.city_id} onClick={e => this.delete_entry(e)} className="btn btn-danger">Delete?</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* <Pagination
                  apiCall={this.apiCall}
                  total_pages={this.state.total_pages}
                /> */}
                {/* <form onSubmit={e => this.handleSubmit(e)}>
                  <div class="form-group">
                    <label for="inputAddress">pages</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputAddress"
                      placeholder="pages"
                      name="limit"
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                  <button type="submit">get</button>
                </form> */}
              </div>
              <div className="col-2"></div>
            </div>

          </div>
        </div>
      );
    }
    else {
      return  (
        <div>
          <LinearProgress variant="query" />
          <LinearProgress variant="query" color="secondary" />
        </div>
      );
    }
  }
}
