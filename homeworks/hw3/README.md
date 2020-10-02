# MyBooksApp

This is a simple application we build during lectures in fall 2020 OOSE class together to practice with various concepts and technologies. This is a web app conforming to Client-Server Architecture where user(s) can store/access their favorite books and authors. The app
will store data in a database and its backend functionalities are implemented as RESTful API end-points.

## Work Done:
For this assignment, we added a new enpoints and routes for the MyBooksApp as described below in the Server.main function.

- An new  http get endpoint on a new route /books where the user can see a list of all the books. It uses Sql2oBookDao.listAll() to fetch and list the books from the Books table and returns the list of books as a JSON array. 
- A new http post endpoint on a new route /addbook where the user can request to add a new book to the Books table. 
- A new route /delauthor that receives the post request to remove an author from the authors table using the author's name.
- A new route /delbook that recieves the post request to remove a book from the Books table using the book's isbn.

In addition, we wrote unit test cases in RESTAPITest.java to assure the functionality of the newly added endpoints.
We tested...

## Assumptions Made:
- If the supplied authorId parameter in the post request does not exist in the Authors table, the database will reject the insertion.
- Author names are unique (because /del author is only performed based on name).
- Book isbn numbers are unique (because /delbook is only performed based on).
