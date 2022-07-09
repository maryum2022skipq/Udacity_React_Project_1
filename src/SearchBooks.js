import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";
import DisplayBook from "./DisplayBook";

const SearchBooks = ({ books, UpdateBook }) => {
  //this useState stores the input user enters
  const [query_, setQuery] = useState("");
  //this useState stores the results after API fetches data based on query
  const [results, setResults] = useState([]);

  //this stores what data should be displayed based on query
  const showingBooks = query_ === "" ? [] : results;

  //this function is called when user writes something into the input field
  //and calls search book api function
  const updateQuery = (query) => {
    if (query === "") {
      setQuery("");
    } else {
      setQuery(query.trim());
      SearchBooksAPI(query.trim());
    }
  };

  //handle book shelf change and update book shelf field
  const handleSelected = (value, book) => {
    UpdateBook(book, value);
  };

  //this function uses books api to search the query and calls
  //set shelves function
  const SearchBooksAPI = (query) => {
    const search = async () => {
      const res = await BooksAPI.search(query);
      if (res.error) {
        setResults([]);
      } else {
        let new_res = setShelves(res);
        setResults(new_res);
      }
    };
    search();
  };

  //this function adds shelf field to each book in the result
  const setShelves = (res) => {
    //add shelf field to results books
    res.forEach((r) => {
      for (let index = 0; index < books.length; index++) {
        let book = books[index];
        //compare res books id to books id
        if (book.id === r.id) {
          //this book exists in our shelf
          r["shelf"] = book.shelf;
          break;
        } else {
          r["shelf"] = "none";
        }
      }
    });
    return res;
  };

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={query_}
              onChange={(e) => updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {showingBooks.length === 0 ? (
            <div></div>
          ) : (
            <ol className="books-grid">
              {showingBooks.map((book) => (
                <DisplayBook
                  key={book.id}
                  book={book}
                  handleSelected={handleSelected}
                />
              ))}
            </ol>
          )}
        </div>
      </div>
      ;
    </div>
  );
};

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
};

export default SearchBooks;
