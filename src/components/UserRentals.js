import React, { useEffect, useState } from "react";
import axios from "axios";

//Function defining the User Rental Details component
export default function UserRentals() {
  const [rentals, setRentals] = useState([]);
  const [groupedRentals, setGroupedRentals] = useState({});

  useEffect(() => {
    fetchRentalDetails();
  }, []);

  // Function to fetch rental details from the API
  const fetchRentalDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }
      const response = await axios.get(
        "http://localhost:5027/api/AdminBooks/rentalDetails",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data);

      setRentals(response.data);
      groupRentalsByUser(response.data);
    } catch (error) {
      console.error(
        "Error fetching rental details:",
        error.response?.data || error.message
      );
      alert("Failed to fetch rental details.");
    }
  };

  // Function to group rental details by userId - converting array into object
  const groupRentalsByUser = (rentals) => {
    const grouped = rentals.reduce((acc, rental) => {
      if (!acc[rental.userId]) {
        acc[rental.userId] = [];
      }
      acc[rental.userId].push(rental);
      return acc;
    }, {});
    setGroupedRentals(grouped);
  };

  return (
    <div className="container mt-4 bg-light p-4 s">
      <h2 className="text-center mb-4">User Rentals</h2>
      {Object.keys(groupedRentals).length === 0 ? (
        <p className="text-center">No rental details available.</p>
      ) : (
        <div className="accordion" id="rentalAccordion">
          {Object.keys(groupedRentals).map((userId, index) => (
            <div className="card mb-2  shadow-lg rounded" key={userId}>
              <div className="card-header" id={`heading${index}`}>
                <h5 className="mb-0">
                  <button
                    className="btn fw-bold "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="true"
                    aria-controls={`collapse${index}`}
                  >
                    User : {groupedRentals[userId][0].username}{" "}
                    <span className="ms-2">
                      <i className="bi bi-chevron-down transition"></i>
                    </span>
                  </button>
                </h5>
              </div>
              <div
                id={`collapse${index}`}
                className="collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#rentalAccordion"
              >
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Borrow ID</th>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedRentals[userId].map((rental) => (
                        <tr key={rental.borrowId}>
                          <td>{rental.borrowId}</td>
                          <td>{rental.bookId}</td>
                          <td>{rental.title}</td>
                          <td>{rental.payment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
