package main.java.hw3.persistence;

import main.java.hw3.exception.DaoException;
import main.java.hw3.model.Author;
import main.java.hw3.model.Book;

import java.util.List;

public interface AuthorDao {
    int add(Author author) throws DaoException;
    List<Author> listAll() throws DaoException;
    boolean delete(Author au) throws DaoException;
    boolean update(Author au) throws DaoException;
    public boolean clear() throws DaoException; 
}