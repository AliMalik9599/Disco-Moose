package hw3.persistence;

import hw3.exception.DaoException;
import hw3.model.Author;
import hw3.model.Book;

import java.util.List;

public interface AuthorDao {
    int add(Author author) throws DaoException;
    List<Author> listAll() throws DaoException;
    boolean delete(Author au) throws DaoException;
    boolean update(Author au) throws DaoException;
    public boolean clear() throws DaoException; 
}