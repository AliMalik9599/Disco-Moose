package persistence;

import exception.DaoException;

import model.Book;

import java.util.List;

public interface BookDao {
    int add(Book author) throws DaoException;
    List<Book> listAll() throws DaoException;
    boolean delete(Book bo) throws DaoException;
    boolean update(Book bo) throws DaoException;
}