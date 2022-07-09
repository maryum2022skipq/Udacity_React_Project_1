import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import DisplayShelves from "./DisplayShelves";
import SearchBooks from "./SearchBooks";

function App() {
  /*
   * allBooks is a useState that stores the books api gets from database
   * shelves is a useState that stores the books divided into their shelves in a dictionary
   */
  const [allBooks, setAllBooks] = useState([]);
  const [shelves, setAllShelves] = useState([]);

  /**
   * @param {array} book
   * @param {string} new_shelf
   * This function uses BooksAPI to update
   * the shelf parameter of the book given
   */
  const UpdateBook = (book, new_shelf) => {
    const update = async () => {
      await BooksAPI.update(book, new_shelf);
    };
    update();
  };

  /**
   * This useEffect gets all books from API and divides them into shelves
   */
  useEffect(() => {
    //get all books from api
    const getAllBooks = async () => {
      const res = await BooksAPI.getAll();

      setAllBooks(res);

      //divide books according to shelves
      let shelf_names = ["currentlyReading", "wantToRead", "read"];
      let all_shelves = [];
      shelf_names.forEach((shelf) => {
        let shelf_name = shelf;
        let books = allBooks.filter((book) => book.shelf === shelf_name);
        all_shelves.push({ name: shelf_name, books: books });
      });
      setAllShelves(all_shelves);
    };

    getAllBooks();
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <DisplayShelves
            shelves={shelves}
            UpdateBook={UpdateBook}
            books={allBooks}
          />
        }
      />
      <Route
        path="/search"
        element={<SearchBooks books={allBooks} UpdateBook={UpdateBook} />}
      />
    </Routes>
  );
}

export default App;
