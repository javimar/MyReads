import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component
{
    state =
    {
        books: []
    }

    componentDidMount()
    {
        // Get books from the backend server when page is loaded
        // This collection represents the books currently in the bookshelves in your app
        BooksAPI.getAll().then((books) => //
        {
            this.setState({ books })
        })
    }

    changeShelf = (newBook, newShelf) =>
    {
        // a book:object and a shelf:string
        BooksAPI.update(newBook, newShelf).then(res => // update the backend
        {
            newBook.shelf = newShelf
            const updatedBooks = this.state.books.filter(book => book.id !== newBook.id).concat(newBook);
            // update the books and trigger render
            this.setState({ books: updatedBooks })
        })
    }

    render()
    {
        const { books } = this.state
        const shelfCategories =
        [
            { cat: 'currentlyReading', name: 'Currently Reading' },
            { cat: 'wantToRead',  name: 'Want to Read' },
            { cat: 'read', name: 'Read'}
        ]

        return (
            <div className="app">

                <Route
                    exact path="/" render={ () => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        { /* Book Listing */ }
                        <div className="list-books-content">
                        {
                            shelfCategories.map((shelf, index) =>
                            {
                                const bookListings = books.filter( book => book.shelf === shelf.cat)
                                  return  (
                                      <div className="bookshelf" key={ shelf.cat }>
                                            <h2 className="bookshelf-title">{ shelf.name }</h2>
                                            <div className="bookshelf-books">
                                                <BookShelf
                                                    books={ bookListings }
                                                    changeShelf={ this.changeShelf }
                                                />
                                            </div>
                                      </div>
                                  )
                            })
                          }
                          </div>

                        { /* Search */ }
                        <div className="open-search">
                            <Link to="/search">Search</Link>
                        </div>
                    </div>
                    )}
                />

                <Route path="/search" render={ ({ history }) => (
                    <SearchBooks
                        books={ books }
                        changeShelf={ this.changeShelf }
                     />
                    )}
                />

          </div>
        )
    }
} // End class BooksApp

export default BooksApp
