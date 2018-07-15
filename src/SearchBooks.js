import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component
{
    static propTypes =
    {
        changeShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }

    state =
    {
        query: '',
        newBooks: [],
    }

    getBooks = (evt) =>
    {
        let query = evt.target.value
        this.setState({ query: query })

        // run the search if user types something
        if(query)
        {
            BooksAPI.search(query.trim(), 30).then((books) =>
            {
                if(books.length > 0)
                {
                    this.setState({ newBooks: books })
                }
                else
                {
                    this.setState({ newBooks: [] })
                }
            })
        }
        else
        {
            this.setState({ newBooks: [], query: '' })
        }
      }

    render()
    {
        // destructuring properties from objects  ES6
        const { query, newBooks } = this.state
        const { books, changeShelf } = this.props

        return (
            <div className="search-books">

                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close search</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={ query }
                            onChange={ this.getBooks }
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {
                        newBooks.map((book) => (
                            <Book
                                book={ book }
                                books={ books }
                                key={ book.id }
                                changeShelf={ changeShelf }
                            />
                        ))
                    }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
