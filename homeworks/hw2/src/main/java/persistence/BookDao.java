package persistence;

import exception.DaoException;
import model.Author;
import model.Book;

import java.util.List;

public interface BookDao {
    int add(Book book) throws DaoException;
    List<Book> listAll();
    boolean delete(Book bo) throws DaoException;
    boolean update(Book bo) throws DaoException;
}