package persistence;

import exception.DaoException;
import model.Author;
import model.Book;

import java.util.List;

public interface AuthorDao {
    int add(Author author) throws DaoException;
    List<Author> listAll() throws DaoException;
    boolean delete(Author au) throws DaoException;
    boolean update(Author au) throws DaoException;
}