# HeadStocks:

A web app for all investors.
Here you can view all companies based on sector and their respective industries.
A screener search feature is available to registered users where they can see the stocks based on various parameters with a visually appealing polar chart. To make it more interesting ,You can also use an Virtual Trading Feature where you can buy and sell stocks based on real world changes . You can see news and different indices on home page . A comparison between companies is avaible based on sector.

## Technology Stack:

#

1. Front End : React JS
2. Middle Tier : NodeJS and Flask and Java
3. Back End : PostgreSQL and MongoDB
4. DataScience and Data Analysis : Python and Java

## Directory Structure:

#

## stocks-server

<!-- **Running these files will take time** -->

It contains all the files which would be required to run monte carlo simulation.

        .
        |___stocks_server
            |__src
                |__main
                    |__java
                        |__com
                            |__example
                                |__demo
                                    |__controller
                                        |__GainersLosersController.java
                                    |__model
                                    |__repository
                                    |__service
                                    |__utility
                                    |__StocksServerApplication.java

**To run the file directly use Spring Boot**.

OR

**To run the project server in Visual Studio use 'Ctrl+F5' and the server will start running**

```

```

#

## Client

All the actions, components and reducers are present here.

    .
    |___client
        |__node_modules
        |__src
        :   |__actions
        :   |__components
                |__common
        :   |__reducers
        :   |__styles
        |__package.json

**package-json** contains all the dependencies required for the project.
Execute the commands on bash.

```
cd ..
cd client
npm install
npm start
```

#

## Server

### DataScience Libraries setup :

- flask
- plotly.graph_objs
- plotly.express
- chart_studio.plotly
- plotly.pymongo
- flask-cors
- chart_studio.tools
- pandas
- numpy
- matplotlib.pyplot

1. Now create an account on Plotly chart studio, if you have one already then log in to the account.
2. Now generate the api key from the web site and copy it to your keyboard.
3. Add the credentials in the .ipynb file.
4. You are good to go now start the flask api.

Before starting the server we need to start flask api server

    .
    |__server
        |__node_modules
        |__python
            |__Stocks_Visualization.ipynb

**Use Jupyter Notebook to run the file**.

OR

**To Start flask api exeucte following command on bash.**

```
pip install runipy
runipy Stocks_Visualization.ipynb
```

To Start the server execute the following command on bash

```
cd ..
cd server
npm install
npm start
```

#

View the Application by redirecting to

```
http://localhost:3000/
```
