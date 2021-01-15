import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import Banner from "../components/Banner";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Alert from "../components/Alert";


class Employees extends Component {
  state = {
    search: "",
    results: [],
    filteredResults: [],
    error: ""
  };

  componentDidMount() {
    API.getRandomEmployee()
      .then(res => {
        this.setState({ results: res.data.results, filteredResults: res.data.results });
        console.log(this.state.results);
      })
      .catch(err => console.log(err));
  }

  handleInputChange = event => {

    const filter = event.target.value;
    const employees = this.state.results.filter(result => (result.name.first.toLowerCase() + " " + result.name.last.toLowerCase()).indexOf(filter.toLowerCase()) >= 0 );
    console.log(filter, employees);
      
    this.setState({ filteredResults: employees });
  };  

    render() {
      return (
        <div>
          <Banner backgroundImage="https://zascogps.com/wp-content/uploads/2018/03/EMPLOYEE-MANAGEMENTB-BANNER.jpg">
          <h1>Employee Directory</h1>
          <h2>Search your favorite employee!</h2>
          </Banner>
          <Container style={{ minHeight: "80%" }}>
            <Alert
              type="danger"
              style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
            >
              {this.state.error}
            </Alert>
            <SearchForm
              handleInputChange={this.handleInputChange}
            />
            <SearchResults results={this.state.filteredResults} />
          </Container>
        </div>
      );
    }
  };

  

export default Employees;
