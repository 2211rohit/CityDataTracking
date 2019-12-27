### Evaluation 2 Countries and Cites data

Create a database
```sql
CREATE DATABASE evaluation2
```
use the database created
```sql
USE evaluation2;
```
Create the country table
```sql
CREATE TABLE country (id INT not null auto_increment, country varchar(255) not null, primary key(id));
```
Create the City and data table
```sql
CREATE TABLE city_data (city_id INT not null auto_increment, city varchar(255) not null,population INT(100) not null, avg_income INT(100) not null,country_id INT not null, primary key(city_id), foreign key(country_id) REFERENCES country(id));
```
Inserting Country
```sql
INSERT INTO country (country) VALUES("%s");
```
Inserting City data
```sql
INSERT INTO city_data (city, population, avg_income, country_id) VALUES("%s", %s, %s, %s);
```
Editing Country
```sql
UPDATE country SET country = "%s" WHERE id = %s;
```
Deleting Country
```sql
DELETE FROM country WHERE id = %s;
```
Editing City
```sql
UPDATE city_data SET city = "%s" WHERE city_id = %s;
```
Deleting City
```sql
DELETE FROM city_data WHERE city_id = %s;
```
Selecting city as per the country name
```sql
SELECT * FROM city_data WHERE country_id = %s;
```

```sql

```