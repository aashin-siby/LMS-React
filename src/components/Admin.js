import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Admin.css";


const Admin = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    copiesAvailable: 1,
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  //Function to fetch the books
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

  //Function to remove the book
  const handleRemoveBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to remove this book?")) {
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }

      await axios.delete(
        `http://localhost:5027/api/AdminBooks/removeBook/${bookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Book removed successfully.");
      fetchBooks();
    } catch (error) {
      console.error("Error removing book:", error.response || error.message);
      alert("Failed to remove book.");
    }
  };

  //Function to increase the book count
  const increaseBookCount = async (bookId) => {
    if (!window.confirm("Are you sure you want to add one more copy?")) {
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }

      await axios.post(
        `http://localhost:5027/api/AdminBooks/increaseBookCopies/${bookId}/1`,
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

  //Function to handle the add book
  const handleAddBook = async (event) => {
    event.preventDefault();

    if (
      !newBook.title ||
      !newBook.author ||
      newBook.copiesAvailable <= 0 ||
      !newBook.imageUrl ||
      !newBook.description
    ) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    if (!window.confirm("Are you sure you want to add this book?")) {
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }

      await axios.post(
        "http://localhost:5027/api/AdminBooks/addBook",
        newBook,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Book added successfully.");
      setNewBook({
        title: "",
        author: "",
        copiesAvailable: 1,
        imageUrl: "",
        description: "",
      });
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
    <div className="admin-panel ">
      <h2 className="admin-title">Admin Panel</h2>
      <div className="admin-panel shadow-lg rounded">
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
                      setNewBook({
                        ...newBook,
                        copiesAvailable: event.target.value,
                      })
                    }
                    required
                    min="1"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Image URL"
                    value={newBook.imageUrl}
                    onChange={(event) =>
                      setNewBook({ ...newBook, imageUrl: event.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Book Description"
                    value={newBook.description}
                    onChange={(event) =>
                      setNewBook({
                        ...newBook,
                        description: event.target.value,
                      })
                    }
                    rows="3"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Add Book
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      {/* Books List */}
      <div className="admin-panel shadow-lg rounded">
        <div className="books-list ">
          <h3 className="books-list-title">Books List</h3>
          <ul className="books-ul">
            {books.map((book) => (
              <li key={book.bookId} className="book-item">
                <div className="book-info">
                  <h4 className="fw-bold text-primary">{book.title}</h4>
                  <p className="text-secondary fst-italic">
                    Author: {book.author}
                  </p>

                  <p className="text-muted fw-semibold">
                    📖 Copies: {book.copiesAvailable}
                  </p>
                  {book.imageUrl ? (
                    <img
                      src={decodeURIComponent(book.imageUrl)}
                      alt={book.title}
                      className="book-image"
                      width={"100px"}
                    />
                  ) : (
                    <img
                      src="https://media.istockphoto.com/id/466564401/vector/blank-vertical-book-template.jpg?s=612x612&w=0&k=20&c=8Sg5cQzhcqF40PHMmSbOCAr_q_c0HlU8qmQS5tH6wdc="
                      alt="No Image Available"
                      className="book-image"
                      width={"100px"}
                    />
                  )}
                  {book.description && (
                    <p className="book-description">{book.description}</p>
                  )}
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
    </div>
  );
};

export default Admin;
