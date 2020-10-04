package main.java.hw2.persistence;

import main.java.hw2.exception.DaoException;
import main.java.hw2.model.Author;

import java.util.List;

public interface AuthorDao {
    int add(Author author) throws DaoException;
    List<Author> listAll();
    boolean delete(Author au) throws DaoException;
    boolean update(Author au) throws DaoException;
}