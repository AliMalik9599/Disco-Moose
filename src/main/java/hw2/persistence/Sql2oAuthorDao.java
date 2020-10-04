package hw2.persistence;

import hw2.exception.DaoException;
import hw2.model.Author;
import java.util.List;
import org.sql2o.*;

public class Sql2oAuthorDao implements AuthorDao {

    private final Sql2o sql2o;

    public Sql2oAuthorDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }


    @Override
    public int add(Author author) throws DaoException {
        try (Connection con = sql2o.open()) {
            String query = "INSERT INTO Authors (name, numOfBooks, nationality)" +
                    "VALUES (:name, :numOfBooks, :nationality)";
            int id = (int) con.createQuery(query, true)
                    .bind(author)
                    .executeUpdate().getKey();
            author.setId(id);
            return id;
        }
    }

    @Override
    public List<Author> listAll() {
        String sql = "SELECT * FROM Authors";
        try (Connection con = sql2o.open()) {
            return con.createQuery(sql).executeAndFetch(Author.class);
        }
    }


    //would be great if someone can test this!
    @Override
    public boolean delete(Author au) throws DaoException {
        String query = "DELETE FROM Authors WHERE name = :name";
        try (Connection con = sql2o.open()) {
            int id = (int) con.createQuery(query, true)
                    .addParameter("name", au.getName())
                    .executeUpdate().getResult();
            
            //Just testing out sql2o - can use the query method in delete(book)
            //if this doesn't work
            return true;
        }
    }

    //test needed
    @Override
    public boolean update(Author au) throws DaoException {
        String query = "UPDATE Authors SET nationality = :nationality, numOfBooks = :numOfBooks WHERE name = :name";
        try (Connection con = sql2o.open()) {
            //not sure if we even need id for these methods
            int id = (int) con.createQuery(query, true)
                    .addParameter("nationality", au.getNationality())
                    .addParameter("numOfBooks", au.getNumOfBooks())
                    .addParameter("name", au.getName())
                    .executeUpdate().getResult();
            return true;
        }
    }

}
