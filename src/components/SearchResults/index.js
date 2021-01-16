import React from "react";
import "./style.css";

function SearchResults(props) {

  function formatDate(date) {
    const dateArray = date.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const dayArray = dateArray[2].split("T");
    const day = dayArray[0];
    const formattedDate = [month, day, year].join("-");
    return formattedDate;
  }
  console.log(props.results);
  return (
    <tbody>
      {props.results[0] !== undefined && props.results[0].name !== undefined ? (
        props.results.map(result => {
          return (
            <tr key={result.email}>
              <td data-th="Image" className="align-middle">
                <img
                  src={result.picture.medium}
                  alt={"profile image for " + result.name.first + " " + result.name.last}
                  className="img-responsive"
                />
              </td>
              <td data-th="Name" className="name-cell align-middle">
                {result.name.first} {result.name.last}
              </td>
              <td data-th="Phone" className="align-middle">
                {result.phone}
              </td>
              <td data-th="Email" className="align-middle">
                <a href={"mailto:" + result.email} target="__blank">
                  {result.email}
                </a>
              </td>
              <td data-th="DOB" className="align-middle">
                {formatDate(result.dob.date)}
              </td>
            </tr>
          );        
        })
      ) : (
        <></>
      )}
    </tbody>
  );
}

export default SearchResults;
