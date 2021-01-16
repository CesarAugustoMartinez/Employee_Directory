import React from "react";
import "./style.css";
import SearchResults from "../SearchResults"

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function Table(props) {
  console.log(props.state.headings);
  return (
    <div className="datatable mt-2">
      <span>Click on any heading to sort by it.</span>
      <table
        id="table"
        className="table  table-striped table-hover table-condensed"
      >
        <thead>
          <tr>
            {props.state.headings.map(({ name, width }) => {
              return (
                <th
                  className="col"
                  key={name}
                  style={{ width }}
                  onClick={() => {
                    props.handleSortClick(name);
                  }}
                >
                  {name.toUpperCase()}
                  <span className="pointer"></span>
                </th>
              );
            })}
          </tr>
        </thead>
        <SearchResults results={props.state.filteredResults} />
      </table>
    </div>
  );
}

export default Table;
