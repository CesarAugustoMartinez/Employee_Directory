import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import Banner from "../components/Banner";
import SearchForm from "../components/SearchForm";
import Table from "../components/Table"
import Alert from "../components/Alert";


class Employees extends Component {
  state = {
    search: "",
    results: [],
    filteredResults: [],
    order: "descend",
    headings: [
      { name: "Image", width: "10%", order: "descend" },
      { name: "name", width: "10%", order: "descend" },
      { name: "phone", width: "20%", order: "descend" },
      { name: "email", width: "20%", order: "descend" },
      { name: "dob", width: "10%", order: "descend" }
    ],
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

  handleSortClick = heading => {
    console.log(heading);
    
    let currentOrder = this.state.headings
    .filter(elem => elem.name === heading)
    .map(elem => elem.order)
    .toString();
    if (currentOrder === "descend") {
      currentOrder = "ascend";
    } else {
      currentOrder = "descend";
    }

    const compareEmployees = (a, b) => {
      if (currentOrder === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          console.log(a[heading].first.localeCompare(b[heading].first));
          return a[heading].first.localeCompare(b[heading].first);
        } else if (heading === "dob") {
          console.log(a[heading].age, b[heading].age);
          return a[heading].age - b[heading].age;
        } else {
          return a[heading].localeCompare(b[heading]);
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        }else if (heading === "dob") {
          return b[heading].age - a[heading].age;
        }  else {
          return b[heading].localeCompare(a[heading]);
        }
      }
    };

    const sortedEmployees = this.state.filteredResults.sort(compareEmployees);
    const updateHeadings = this.state.headings.map(elem => {
      elem.order = elem.name === heading ? currentOrder : elem.order;
      return elem;
    });

    this.setState({...this.state, filteredResults: sortedEmployees, headings: updateHeadings});

  }

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
            <Table state={this.state} handleSortClick={this.handleSortClick}/>

          </Container>
        </div>
      );
    }
  };

  

export default Employees;
