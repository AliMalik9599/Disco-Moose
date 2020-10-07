package hw4.persistence;

import hw4.exception.DaoException;
import hw4.model.Author;

import java.util.List;

public interface AuthorDao {
    int add(Author author) throws DaoException;
    List<Author> listAll() throws DaoException;
    boolean update(Author author) throws DaoException;
    boolean delete(Author author) throws DaoException;
}