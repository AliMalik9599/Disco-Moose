package hw3.persistence;

import hw3.exception.DaoException;

import hw3.model.Book;

import java.util.List;

public interface BookDao {
    int add(Book author) throws DaoException;
    List<Book> listAll() throws DaoException;
    boolean delete(Book bo) throws DaoException;
    boolean update(Book bo) throws DaoException;
    public boolean clear() throws DaoException;
}