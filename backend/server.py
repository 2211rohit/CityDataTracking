from flask import Flask
from flask_cors import CORS
from flask import request
from flask import make_response
from flask import jsonify
from flask_mysqldb import MySQL
import hashlib
import json
import jwt
import os
import math


app = Flask(__name__)
app.config["MYSQL_USER"] = "rohit"
app.config["MYSQL_PASSWORD"] = "Goyal@123"
app.config["MYSQL_DB"] = "evaluation2"
app.config["MYSQL_CURSORCLASS"] = "DictCursor"
CORS(app)
mysql = MySQL(app)


# Checking if country name exists already
def country_exits(country):
    cursor = mysql.connection.cursor()
    if cursor.execute(
        """SELECT * FROM country WHERE country = (%s) """, (
            country,)
    ):
        return True
    else:
        return False


# Checking if city name exists already
def city_exits(city):
    cursor = mysql.connection.cursor()
    if cursor.execute(
        """SELECT * FROM city_data WHERE city = (%s) """, (
            city,)
    ):
        return True
    else:
        return False


# Adding a new country
@app.route("/addCountry", methods=["POST"])
def addCountry():
    country = request.json.get("country")
    if country_exits(country) == True:
        return {"message": "Country already exits"}
    else:
        cursor = mysql.connection.cursor()
        cursor.execute(
            """INSERT INTO country (country)
                VALUES (%s) """, (country,)
        )
        mysql.connection.commit()
        cursor.close()
        return {"message": "Country Added"}


# Adding new city data
@app.route("/addCity", methods=["POST"])
def addCity():
    city = request.json.get("city")
    population = request.json.get("population")
    avg_income = request.json.get("avg_income")
    country_id = request.json.get("country_id")
    print("hi")
    if city_exits(city) == True:
        return {"message": "City already exits"}
    else:
        cursor = mysql.connection.cursor()
        cursor.execute(
            """INSERT INTO city_data (city, population, avg_income, country_id)
                VALUES(%s, %s, %s, %s)""", (city, population, avg_income, country_id)
        )
        mysql.connection.commit()
        cursor.close()
        return {"message": "City Data Added"}

# Editing Country
@app.route("/editCountry", methods=["PATCH"])
def editCountry():
    country = request.json.get("country")
    ID = request.json.get("country_id")
    if country_exits(country) == True:
        return {"message": "Country already exits"}
    else:
        cursor = mysql.connection.cursor()
        cursor.execute(
            """UPDATE country SET country = "%s" WHERE id = %s""", (
                country, ID)
        )
        mysql.connection.commit()
        cursor.close()
        return {"message": "Country Updated"}

# Editing city data
@app.route("/editCity", methods=["PATCH"])
def editCity():
    city = request.json.get("city")
    population = request.json.get("population")
    avg_income = request.json.get("avg_income")
    country_id = request.json.get("country_id")
    city_id = request.json.get("city_id")
    cursor = mysql.connection.cursor()
    cursor.execute(
        """Update city_data SET city = %s, population = %s, avg_income=%s, country_id=%s WHERE city_id = %s""", (
            city, population, avg_income, country_id, city_id)
    )
    mysql.connection.commit()
    cursor.close()
    return {"message": "City Data Updated"}

# Deleting Country
@app.route("/delCountry", methods=["DELETE"])
def delCountry():
    ID = request.json.get("country_id")
    cursor = mysql.connection.cursor()
    cursor.execute(
        """DELETE FROM country WHERE id = %s""", (ID,)
    )
    mysql.connection.commit()
    cursor.close()
    return {"message": "Country Deleted"}


# Deleting City
@app.route("/delCity", methods=["DELETE"])
def delCity():
    ID = request.headers.get("city_id")
    cursor = mysql.connection.cursor()
    cursor.execute(
        """DELETE FROM city_data WHERE city_id = %s""", (ID,)
    )
    mysql.connection.commit()
    cursor.close()
    return {"message": "City Data Deleted"}


# All data
@app.route("/show_datas")
def show_datas():
    rows = int(request.headers.get("limit"))
    page = request.args.get("page", default=1, type=int)
    call_page = (page-1) * int(rows)
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select * from city_data inner join country on city_data.country_id = country.id limit %s,%s""",
        (call_page, int(rows),))
    data = cursor.fetchall()
    cursor.execute(
        "SELECT count(city) as cities FROM city_data inner join country on country.id = city_data.country_id""")
    cities = cursor.fetchall()
    cursor.close()
    return {"data": data, "total_city": int(cities[0]["cities"])}


# All data
@app.route("/show_data")
def show_data():
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select * from city_data inner join country on city_data.country_id = country.id""",)
    data = cursor.fetchall()
    cursor.close()
    return {"data": data}


@app.route("/pagination", methods=["POST"])
def pagination():
    page = request.args.get('page', default=1, type=int)
    call_page = (page-1)*10
    cursor = mysql.connection.cursor()
    cursor.execute(
        """ SELECT * FROM country inner join city_data on country.id = city_data.country_id limit %s,10""", (call_page,))
    data = cursor.fetchall()
    cursor.execute(
        "SELECT count(city) as cities FROM city_data inner join country on country.id = city_data.country_id""")
    total_city = cursor.fetchall()
    cursor.close()
    return {"data": data, "total_city": int(total_city[0]["cities"])}


# All data sorted by population ascending
@app.route("/data_sorted_population_asc")
def data_sorted_population_asc():
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select * from city_data inner join country on city_data.country_id = country.id ORDER BY city_data.population ASC""")
    data = cursor.fetchall()
    cursor.close()
    return {"data": data}

# All data sorted by population dscending
@app.route("/data_sorted_population_desc")
def data_sorted_population_desc():
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select * from city_data inner join country on city_data.country_id = country.id ORDER BY city_data.population DESC""")
    data = cursor.fetchall()
    cursor.close()
    return {"data": data}

# All data sorted by income ascending
@app.route("/data_sorted_income_asc")
def data_sorted_income_asc():
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select * from city_data inner join country on city_data.country_id = country.id ORDER BY city_data.avg_income ASC""")
    data = cursor.fetchall()
    cursor.close()
    return {"data": data}

# All data sorted by income dscending
@app.route("/data_sorted_income_desc")
def data_sorted_income_desc():
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select * from city_data inner join country on city_data.country_id = country.id ORDER BY city_data.avg_income DESC""")
    data = cursor.fetchall()
    cursor.close()
    return {"data": data}

# Countries wise cities
@app.route("/countries_cities")
def countries_cities():
    country_id = request.headers.get("country_id")
    # country_id = request.json["country_id"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select * from city_data inner join country on city_data.country_id = country.id WHERE city_data.country_id= %s""", (country_id,))
    data = cursor.fetchall()
    cursor.close()
    return {"data": data}


# All Countries
@app.route("/show_countries")
def show_countries():
    cursor = mysql.connection.cursor()
    cursor.execute(
        """select * from country""")
    data = cursor.fetchall()
    cursor.close()
    return {"data": data}

# All Countries
# @app.route("/show_countries")
# def show_countries():
#     rows = request.json.get("rows")
#     page = request.args.get("page", default=1, type=int)
#     call_page = (page-1)*rows
#     cursor = mysql.connection.cursor()
#     cursor.execute(
#         """select * from country limit %s,%s""",
#         (call_page,rows,))
#     data = cursor.fetchall()
#     cursor.close()
#     return {"data": data}

# def pagination(page):
#     cities = show_countries()
#     perPage = 10
#     totalPages = len(cities)//perPage
#     totaldata = len(cities)
#     return {
#         "totalPages": totalPages,
#         "totaldata": totaldata,
#         "page": page,
#         "data": cities[(page*perPage)-perPage: page*perPage],
#         "per_page": perPage
#     }
