import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Admin.css";

//Function which handle all the admin modules
const Admin = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    copiesAvailable: 1,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  //Get all the books from Library
  const fetchBooks = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }

      const response = await axios.get(
        "http://localhost:5027/api/UserBooks/books",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error.response || error.message);
      alert("Failed to fetch books.");
    }
  };

  //Delete the Book from Library
  const handleRemoveBook = async (bookId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }

      await axios.delete(
        `http://localhost:5027/api/AdminBooks/removeBook/${bookId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Book removed successfully.");
      fetchBooks();
    } catch (error) {
      console.error("Error removing book:", error.response || error.message);
      alert("Failed to remove book.");
    }
  };

  //Function to increase the count of book by 1
  const increaseBookCount = async (bookId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }
      const count = 1;
      await axios.post(
        `http://localhost:5027/api/AdminBooks/increaseBookCopies/${bookId}/${count}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Book count increased successfully.");
      fetchBooks();
    } catch (error) {
      console.error(
        "Error increasing book count:",
        error.response?.data || error.message
      );
      alert("Failed to increase book count.");
    }
  };

  //Function to add new book to the Library
  const handleAddBook = async (event) => {
    event.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }

      if (!newBook.title || !newBook.author || newBook.copiesAvailable <= 0) {
        alert("Please fill in all fields correctly.");
        return;
      }

      const apiUrl = `http://localhost:5027/api/AdminBooks/addBook/${encodeURIComponent(
        newBook.title
      )}/${encodeURIComponent(newBook.author)}/${newBook.copiesAvailable}`;

      await axios.post(apiUrl, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Book added successfully.");
      setNewBook({ title: "", author: "", copiesAvailable: 1 });
      fetchBooks();
    } catch (error) {
      console.error(
        "Error adding book:",
        error.response?.data || error.message
      );
      alert("Failed to add book.");
    }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-title">Admin Panel</h2>

      {/* Add Book Form */}
      <div className="add-book-container">
        <button
          className="btn btn-primary mb-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#addBookForm"
          aria-expanded="false"
          aria-controls="addBookForm"
        >
          Add a New Book
        </button>

        <div className="collapse" id="addBookForm">
          <div className="card card-body">
            <h3>Add a New Book</h3>
            <form onSubmit={handleAddBook}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={newBook.title}
                  onChange={(event) =>
                    setNewBook({ ...newBook, title: event.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Author"
                  value={newBook.author}
                  onChange={(event) =>
                    setNewBook({ ...newBook, author: event.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Copies Available"
                  value={newBook.copiesAvailable}
                  onChange={(event) =>
                    setNewBook({ ...newBook, copiesAvailable: event.target.value })
                  }
                  required
                  min="1"
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="books-list">
        <h3 className="books-list-title">Books List</h3>
        <ul className="books-ul">
          {books.map((book) => (
            <li key={book.bookId} className="book-item">
              <div className="book-info">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">Author: {book.author}</p>
                <p className="book-copies">Copies: {book.copiesAvailable}</p>
              </div>
              <div className="book-actions">
                <button
                  className="increase-book-btn"
                  onClick={() => increaseBookCount(book.bookId)}
                >
                  + Add Copy
                </button>
                <button
                  className="remove-book-btn"
                  onClick={() => handleRemoveBook(book.bookId)}
                >
                  Remove Book
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
