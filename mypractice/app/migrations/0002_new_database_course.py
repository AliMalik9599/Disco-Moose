from django.db import migrations, models
from app.models import Course, Skill, Card
import datetime

schema = 'Answer the following question based on this schema: </br> branch(branch-name, branch-city, assets) </br> ' \
         'customer(customer-name, customer-street, customer-city) </br> account(branch-name, account-number, balance) </br> ' \
         'loan(branch-name, loan-number, amount) </br> depositor(customer-name, account-number) </br> borrower(customer-name,' \
         ' loan-number) </br>'

def add_mock_databases_course(apps, schema_editor):

	d, created = Course.objects.get_or_create(name='Databases')
	d.save()

	relational_algebra, created = Skill.objects.get_or_create(name="Relational Algebra", course=d)
	relational_algebra.save()

	relational_calculus, created = Skill.objects.get_or_create(name="Relational Calculus", course=d)
	relational_calculus.save()

	sql, created = Skill.objects.get_or_create(name="SQL", course=d)
	sql.save()

	theory, created = Skill.objects.get_or_create(name="Theory", course=d)
	theory.save()

	c1, created = Card.objects.get_or_create(title='Project', course=d, skill=relational_algebra, level=1, duration=5, view_count=0, content='Symbol: PI </br> Notation: PI_a1,a2,...,ak(r) where a1, a2 are attributes of relation r </br> Result: The relation of k columns obtained by  erasing the columns not listed')
	c1.save()

	c2, created = Card.objects.get_or_create(title='Union', course=d, skill=relational_algebra, level=1, duration=5, view_count=0, content='Symbol: U </br> Notation: r U s where s and r are relations with the same number of attributes, and the attributes are compatible </br> Result: r U s = {t| t is element of r OR t is element of s}')
	c2.save()

	c3, created = Card.objects.get_or_create(title='Select', course=d, skill=relational_algebra, level=3, duration=5, view_count=0, content='Symbol: SIGMA </br>  Notation: SIGMA_p(r) where p is a formula with propositional calculus </br> Result: r = SIGMA_a=b and d > 5 where the rows selected have values for both b and d greater than 5')
	c3.save()

	c4, created = Card.objects.get_or_create(title='Set Difference', course=d, skill=relational_algebra, level=2, duration=5, view_count=0, content='Symbol: - </br> Notation: r - s where r and s are relations with compatible domains </br> Result:  r - s = {t| t is element of r AND t is not an element of s}')
	c4.save()

	c5, created = Card.objects.get_or_create(title='Cartesian Product', course=d, skill=relational_algebra, level=1, duration=5, view_count=0, content='Symbol: X </br> Notation: r X s </br> Result: r X s = {tq| t is element of r AND q is element of s}')
	c5.save()

	c6, created = Card.objects.get_or_create(title='Set Intersection', course=d, skill=relational_algebra, level=3, duration=5, view_count=0, content='Symbol: INTERSECT </br>  Notation: r INTERSECT s </br> Result: r INTERSECT s = {t| t is element of r AND t is element of s}')
	c6.save()

	c7, created = Card.objects.get_or_create(title='Natural Join', course=d, skill=relational_algebra, level=2, duration=5, view_count=0, content='Symbol: JOIN </br> Notation: r JOIN s where r = (A, B, C, D) and s = (E, B, D) </br> Result: PI_r.A, r.B, r.C, r.D, r.E(SIGMA_r.B=s.B, r.D=s.D(r X s))')
	c7.save()

	c8, created = Card.objects.get_or_create(title='Division', course=d, skill=relational_algebra, level=1, duration=5, view_count=0, content='Symbol: % </br> Notation: r % s </br> Result: Suited queries that include "for all" and yields a relation that includes all rows in r where one attribute matches every row in s')
	c8.save()

	c9, created = Card.objects.get_or_create(title='RC Practice Question 1', course=d, skill=relational_calculus, level=2, duration=15, view_count=0, content=schema+'</br> Using relational calculus, find the nnames of all customers having a loan, an account, or both at the bank.')
	c9.save()

	c10, created = Card.objects.get_or_create(title='RC Practice Question 2', course=d, skill=relational_calculus, level=2, duration=15, view_count=0, content=schema+'</br> Using relational calculus, find the branch-name, loan-number, and amount for loans of value over $1200.')
	c10.save()

	c11, created = Card.objects.get_or_create(title='RC Practice Question 3', course=d, skill=relational_calculus, level=2, duration=15, view_count=0, content=schema+'</br> Using relational calculus, find the names of all customers who have a loan at the Perryridge branch, but not account at any branch of the bank.')
	c11.save()

	c12, created = Card.objects.get_or_create(title='RC Practice Question 4', course=d, skill=relational_calculus, level=3, duration=15, view_count=0, content=schema+'</br> Using relational calculus, find the names of all customers having a loan from the Perryridge branch and the cities the live in.')
	c12.save()

	c13, created = Card.objects.get_or_create(title='The select clause', course=d, skill=sql, level=3, duration=5, view_count=0, content='The select clause corresponds to the projection operation in relational algebra. It is used to list the attributes desired in the result of a query. </br> Example: SELECT branch-name FROM loan')
	c13.save()

	c14, created = Card.objects.get_or_create(title='The where clause', course=d, skill=sql, level=4, duration=5, view_count=0, content='The where clause corresponds to the selection predicate of relational algebra. it consists of a predicate involving attributes of the relations that appear in the from clause. </br> Example: </br> SELECT loan-number </br> FROM loan </br> WHERE branch-name = "Perryridge" AND  amount > 1200')
	c14.save()

	c15, created = Card.objects.get_or_create(title='The  from clause', course=d, skill=sql, level=1, duration=5, view_count=0, content='The from clause corresponds to the cartesian product operation in relational algebra. It lists the relations to be scanned in the evaluation of the expression. </br> Example: </br> SELECT * </br> FROM borrower, loan')
	c15.save()

	c16, created = Card.objects.get_or_create(title='String operations', course=d, skill=sql, level=5, duration=5, view_count=0, content='SQL includes a string-matching operator for comparisons on character strings. Patterns are described using %, which  matches any substring, and _, which  matches any  character. </br> Example: </br> SELECT customer-name </br> FROM customer </br> WHERE customer-name LIKE "%Main%" </br> finds all customers who life on a street containing the substring Main.')
	c16.save()

	c17, created = Card.objects.get_or_create(title='Ordering the display of tuples', course=d, skill=sql, level=3, duration=5, view_count=0, content='Ascending order is default, but "desc" can be used to reverse the order ("asc" for ascending). </br> Example: SELECT DISTINCT customer-name </br> FROM borrower, loan </br> WHERE borrower.loan-number = loan.loan.number AND branch-name = "Perryridge" </br> ORDER BY customer-name')
	c17.save()

	c18, created = Card.objects.get_or_create(title='Aggregate functions ', course=d, skill=sql, level=2, duration=5, view_count=0, content='Functions that operate on the multiset of values of a column of a relation, and return a value. </br> Operations: </br> avg = average value </br> min = minimum value </br> max = maximum value </br> sum = sum of values </br> count = number of values')
	c18.save()

	c19, created = Card.objects.get_or_create(title='SQL Practice Problem 1', course=d, skill=sql, level=2, duration=10, view_count=0, content='Using SQL, find the number of tuples in the customer relation')
	c19.save()

	c20, created = Card.objects.get_or_create(title='SQL Practice Problem 2', course=d, skill=sql, level=2, duration=10, view_count=0, content='Using SQL, find average account balance at the Perryridge branch.')
	c20.save()

	c21, created = Card.objects.get_or_create(title='Group by', course=d, skill=sql, level=2, duration=5, view_count=0, content='The group by operator allows aggregate functions to be performed on a some subset of the relation. Example: Find the number of depositors for each branch. </br> SELECT branch-name, COUNT(DISTINCT customer-name) </br> FROM depositor, account </br> WHERE depossiter.account-number = account.account-number </br> GROUP BY branch-name')
	c21.save()

	c21, created = Card.objects.get_or_create(title='Having clause', course=d, skill=sql, level=2, duration=5, view_count=0, content='Predicates of the habing clause are applied after the formation of groups. Example: Find the number names of all branches where the average balance is more than $1200. </br> SELECT branch-name, AVG(balance) </br> FROM account </br> GROUP BY branch-name </br> having AVG(balance) > 1200')
	c21.save()

	c27, created = Card.objects.get_or_create(title='SQL Practice Problem 3', course=d, skill=sql, level=2, duration=10, view_count=0, content=schema+'</br> Using SQL, Find the name of all customers who have a loan, an accoount, or both, from the bank.' )
	c27.save()

	c28, created = Card.objects.get_or_create(title='RA Practice Problem 1', course=d, skill=relational_algebra, level=2, duration=5, view_count=0, content=schema+'</br> Using relational algebra, find the loan number for each loan of an amount greater than $1200.' )
	c28.save()

	c29, created = Card.objects.get_or_create(title='RA Practice Problem 2', course=d, skill=relational_algebra, level=2, duration=5, view_count=0, content=schema+'</br> Using relational algebra, find the name of all customers who have a loan, an accoount, or both, from the bank.' )
	c29.save()

	c30, created = Card.objects.get_or_create(title='RA Practice Problem 3', course=d, skill=relational_algebra, level=2, duration=5, view_count=0, content=schema+'</br> Using relational algebra, find the name of all customers who have a loan, at the Perryridge branch.' )
	c30.save()

	c31, created = Card.objects.get_or_create(title='RA Practice Problem 4', course=d, skill=relational_algebra, level=2, duration=5, view_count=0, content=schema+'</br> Using relational algebra, find all customers who have an account at all branches located in Brooklyn.' )
	c31.save()

	c32, created = Card.objects.get_or_create(title='Foreign key constraint', course=d, skill=theory, level=2, duration=10, view_count=0, content='Foreign key is used to link two tables together. Constraints on it prevent actions that would destroy links between tables and prevent invalid data from being inserted into the foreign key columb because it has to be one of the values contained in the table it points to.')
	c32.save()

	c33, created = Card.objects.get_or_create(title='Unique constraint', course=d, skill=theory, level=2, duration=10, view_count=0, content='Unique  constraint guarantees that each value in a column is unique.')
	c33.save()

	c34, created = Card.objects.get_or_create(title='Not null constraint', course=d, skill=theory, level=2, duration=10, view_count=0, content='Not null guarantees that the values in a column are not null.')
	c34.save()


class Migration(migrations.Migration):

	dependencies = [
		('app', '0002_mock_users'),
	]

	operations = [
		migrations.RunPython(add_mock_databases_course)
	]