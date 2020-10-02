import okhttp3.*;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.Before;
import java.io.IOException;
import java.sql.*;
import static org.junit.Assert.*;

public class RESTAPITest {

    static OkHttpClient client;

    @BeforeClass
    public static void beforeClassTests() throws SQLException {
        client = new OkHttpClient();
    }

    @Before
    public void beforeEach() throws IOException {
        Request request = new Request.Builder()
                .url("http://localhost:7000/newTables")
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(200, response.code());
    }

    @Test
    public void testListAuthors() throws IOException {      //Don't even need this tbh as checked in test function below
        RequestBody postBody = new FormBody.Builder()
                .add("name", "Ali Hedayat")
                .add("numOfBooks", "26")
                .add("nationality", "Iranian")
                .build();
        Request request1 = new Request.Builder()
                .url("http://localhost:7000/addauthor")
                .post(postBody)
                .build();
        Response response1 = client.newCall(request1).execute();
        assertEquals(201, response1.code());


        Request request = new Request.Builder()
                .url("http://localhost:7000/authors")
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(200, response.code());
        String text = response.body().string();
        System.out.println(text);
        assert (text.contains("Ali"));
    }

    @Test
    public void testAddAuthor_and_ListAuthors() throws IOException {
        RequestBody postBody = new FormBody.Builder()
                .add("name", "Ali Hedayat")
                .add("numOfBooks", "26")
                .add("nationality", "Iranian")
                .build();
        Request request1 = new Request.Builder()
                .url("http://localhost:7000/addauthor")
                .post(postBody)
                .build();
        Response response1 = client.newCall(request1).execute();
        assertEquals(201, response1.code());

        RequestBody postBody1 = new FormBody.Builder()
                .add("name", "Sadegh Hedayat")
                .add("numOfBooks", "26")
                .add("nationality", "Iranian")
                .build();
        Request request2 = new Request.Builder()
                .url("http://localhost:7000/addauthor")
                .post(postBody1)
                .build();
        Response response2 = client.newCall(request2).execute();
        assertEquals(201, response2.code());


        Request request = new Request.Builder()
                .url("http://localhost:7000/authors")
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(200, response.code());
        String text = response.body().string();
        System.out.println(text);
        assert (text.contains("Ali"));
        assert (text.contains("Sadegh"));

    }

    @Test
    public void testDelAuthor() throws IOException {
        RequestBody postBody = new FormBody.Builder()
                .add("name", "Ali Hedayat")
                .add("numOfBooks", "26")
                .add("nationality", "Iranian")
                .build();
        Request request1 = new Request.Builder()
                .url("http://localhost:7000/addauthor")
                .post(postBody)
                .build();
        Response response1 = client.newCall(request1).execute();
        assertEquals(201, response1.code());

        RequestBody postBody1 = new FormBody.Builder()
                .add("name", "Sadegh Hedayat")
                .add("numOfBooks", "26")
                .add("nationality", "Iranian")
                .build();
        Request request2 = new Request.Builder()
                .url("http://localhost:7000/addauthor")
                .post(postBody1)
                .build();
        Response response2 = client.newCall(request2).execute();
        assertEquals(201, response2.code());


        Request request = new Request.Builder()
                .url("http://localhost:7000/authors")
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(200, response.code());
        String text = response.body().string();
        System.out.println(text);
        assert (text.contains("Ali"));
        assert (text.contains("Sadegh"));

        //where the delete part starts

        RequestBody delPostBody = new FormBody.Builder()
                .add("name", "Ali Hedayat")
                .build();
        Request request3 = new Request.Builder()
                .url("http://localhost:7000/delauthor")
                .post(delPostBody)
                .build();
        Response response3 = client.newCall(request3).execute();
        assertEquals(201, response3.code());
        String text3 = response3.body().string();
        System.out.println(text3);
        assert (text.contains("Ali"));

        //check its deleted
        Request request4 = new Request.Builder()
                .url("http://localhost:7000/authors")
                .build();
        Response response4 = client.newCall(request4).execute();
        assertEquals(200, response4.code());
        String text4 = response4.body().string();
        System.out.println(text4);


        assert (!text4.contains("Ali"));
    }

    @Test
    public void testAddBook() throws IOException {

        RequestBody postBody = new FormBody.Builder()
                .add("name", "C.S Lewis")
                .add("numOfBooks", "1")
                .add("nationality", "British")
                .build();
        Request request1 = new Request.Builder()
                .url("http://localhost:7000/addauthor")
                .post(postBody)
                .build();
        Response response1 = client.newCall(request1).execute();
        assertEquals(201, response1.code());

        //query database for author id
        RequestBody addBookPost = new FormBody.Builder()
                .add("title","Screwtape Letters")
                .add("isbn","978-3-16-148410-0")
                .add("publisher","DevinThePublisher")
                .add("year", "1999")
                .add("authorId","1")
                .build();
        Request request = new Request.Builder()
                .url("http://localhost:7000/addbook")
                .post(addBookPost)
                .build();
        Response response = client.newCall(request).execute();
        assertEquals(201, response.code());
        String text = response.body().string();
        System.out.println(text);
        assert (text.contains("Screwtape Letters"));
    }

}

    