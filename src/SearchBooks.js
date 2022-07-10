import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";
import DisplayBook from "./DisplayBook";

const SearchBooks = ({ books, UpdateBook }) => {
  //this useState stores the input user enters
  const [query, setQuery] = useState("");
  //this useState stores the results after API fetches data based on query
  const [results, setResults] = useState([]);

  //handle book shelf change and update book shelf field
  const handleSelected = (value, book) => {
    UpdateBook(book, value);
  };

  //this useEffect checks if user has input query and updates results accordingly
  useEffect(() => {
    let user_input = true;
    //if anything was entered into query
    if (query) {
      //uses books api to search the query
      const search = async () => {
        const res = await BooksAPI.search(query);
        //if api returns error as in no results found
        if (res.error) {
          setResults([]);
        } else {
          //if user still has input
          if (user_input) {
            //call set shelves function and set results
            let new_res = setShelves(res);
            setResults(new_res);
          }
        }
      };
      search();
    }
    //side effect clean up so when there is no data in query_
    return () => {
      user_input = false;
      setResults([]);
    };
  }, [query]);

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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {results.length === 0 ? (
            <div></div>
          ) : (
            <ol className="books-grid">
              {results.map((book) => (
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
