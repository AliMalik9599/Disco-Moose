package hw4.persistence;

import hw4.exception.DaoException;

import hw4.model.Book;

import java.util.List;

public interface BookDao {
    int add(Book author) throws DaoException;
    List<Book> listAll() throws DaoException;
    boolean update(Book book) throws DaoException;
    boolean delete(Book book) throws DaoException;
}