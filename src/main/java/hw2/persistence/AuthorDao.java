package hw2.persistence;

import hw2.exception.DaoException;
import hw2.model.Author;

import java.util.List;

public interface AuthorDao {
    int add(Author author) throws DaoException;
    List<Author> listAll();
    boolean delete(Author au) throws DaoException;
    boolean update(Author au) throws DaoException;
}