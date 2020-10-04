package persistence;

import exception.DaoException;
import model.Book;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;
import org.sql2o.*;
import java.sql.SQLException;
import java.util.List;

public class Sql2oBookDao implements BookDao {
    private final Sql2o sql2o;

    public Sql2oBookDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public int add(Book book) throws DaoException {
        try (Connection con = sql2o.open()) {
            String query = "INSERT INTO Books (id, title, isbn, publisher, year, authorId)"
                    + "VALUES (NULL, :title, :isbn, :publisher, :year, :authorId)";
            int id = (int) con.createQuery(query, true).bind(book).executeUpdate().getKey();
            book.setId(id);
            return id;
        } catch (Sql2oException ex) {
            throw new DaoException();
        }
    }

    @Override
    public List<Book> listAll() {
        String sql = "SELECT * FROM Books";
        try (Connection con = sql2o.open()) {
            return con.createQuery(sql).executeAndFetch(Book.class);
        } catch (Sql2oException ex) {
            throw new DaoException();
        }
    }

    @Override
    public boolean delete(Book bo) throws DaoException {
        String isbn = bo.getIsbn();
        String query = "DELETE FROM Books WHERE isbn = '" + isbn + "'";
        try (Connection con = sql2o.open()) {
            int id = (int) con.createQuery(query, true).executeUpdate().getResult();
            return true;
        }
    }

    @Override
    public boolean update(Book bo) throws DaoException {
        String query = "UPDATE Books SET year = :year, publisher = :publisher WHERE isbn = :isbn";
        try (Connection con = sql2o.open()) {
            int id = (int) con.createQuery(query, true).addParameter("year", bo.getYear())
                    .addParameter("publisher", bo.getPublisher()).addParameter("isbn", bo.getIsbn()).executeUpdate()
                    .getResult();
            return true;
        }
    }

    @Override
    public boolean clear() throws DaoException {
        String sql = "DROP TABLE IF EXISTS Books;";
        try (Connection con = sql2o.open()) {
            Query query = con.createQuery(sql);
            query.executeUpdate();
        }

        sql = "CREATE TABLE IF NOT EXISTS Books (id INTEGER PRIMARY KEY, title VARCHAR(200) NOT NULL," +
                " isbn VARCHAR(14) NOT NULL UNIQUE, publisher VARCHAR(14), year INTEGER, authorId INTEGER NOT NULL," +
                " FOREIGN KEY(authorId) REFERENCES Authors(id) ON UPDATE CASCADE ON DELETE CASCADE);";
        try (Connection con = sql2o.open()) {
            Query query = con.createQuery(sql);
            query.executeUpdate();
            return true;
        }
        
    }
}