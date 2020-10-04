package main.java.hw2.persistence;

import main.java.hw2.exception.DaoException;
import main.java.hw2.model.Author;
import main.java.hw2.model.Book;
import java.util.List;

public interface BookDao {
    int add(Book book) throws DaoException;
    List<Book> listAll();
    boolean delete(Book bo) throws DaoException;
    boolean update(Book bo) throws DaoException;
}