drop database if exists headstocks;
create database headstocks;


\c headstocks;

-- Creating the structure [Piyush]
create table stocksinfo
(
    Ticker varchar(50),
    SimFinID int,
    CompanyID integer,
    IndicatorName varchar(500),
    dates date,
    IndicatorValue double precision
);

--Loading the csv file on the created table
-- Note: Change the path location of your csv file
-- in the FROM section [Piyush]
COPY stocksinfo
(Ticker,SimFinID,CompanyID,IndicatorName, dates, IndicatorValue) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\output-semicolon-narrow.csv' DELIMITER ';' CSV HEADER;

-- Creating Company Column [Piyush]
ALTER TABLE stocksinfo ADD COLUMN Industry varchar
(255);

-- Creating Sectors Column [Piyush]
ALTER TABLE stocksinfo ADD COLUMN Sector varchar
(255);

UPDATE stocksinfo SET Sector = 'Industrials' WHERE CAST(CompanyID AS TEXT) like '100%';
UPDATE stocksinfo SET Sector = 'Technology' WHERE CAST(CompanyID AS TEXT) like '101%';
UPDATE stocksinfo SET Sector = 'Consumer Defensive' WHERE CAST(CompanyID AS TEXT) like '102%';
UPDATE stocksinfo SET Sector = 'Consumer Cyclical' WHERE CAST(CompanyID AS TEXT) like '103%';
UPDATE stocksinfo SET Sector = 'Financial Services' WHERE CAST(CompanyID AS TEXT) like '104%';
UPDATE stocksinfo SET Sector = 'Utilities' WHERE CAST(CompanyID AS TEXT) like '105%';
UPDATE stocksinfo SET Sector = 'Healthcare' WHERE CAST(CompanyID AS TEXT) like '106%';
UPDATE stocksinfo SET Sector = 'Energy' WHERE CAST(CompanyID AS TEXT) like '107%';
UPDATE stocksinfo SET Sector = 'Business Services' WHERE CAST(CompanyID AS TEXT) like '108%';
UPDATE stocksinfo SET Sector = 'Real Estate' WHERE CAST(CompanyID AS TEXT) like '109%';
UPDATE stocksinfo SET Sector = 'Basic Materials' WHERE CAST(CompanyID AS TEXT) like '110%';
UPDATE stocksinfo SET Sector = 'Other' WHERE CAST(CompanyID AS TEXT) like '0%';
UPDATE stocksinfo SET Sector = 'Other' WHERE CAST(CompanyID AS TEXT) like '111%';
UPDATE stocksinfo SET Sector = 'Other' WHERE CAST(CompanyID AS TEXT) like '112%';


-- Creating Indexes on Ticker, Indicator name, commpanyID and indicator values [Piyush]
create index ticker_index on stocksinfo (Ticker);
create index indicator_name_index on stocksinfo (IndicatorName);
create index dates_index on stocksinfo (dates);
create index CompanyID_index on stocksinfo (CompanyID)


-- --  Loading data of Industry -> Industrials[Piyush]
UPDATE stocksinfo SET industry = 'Industrial Products' WHERE CompanyID = 100001;
UPDATE stocksinfo SET industry = 'Business Services' WHERE CompanyID = 100002;
UPDATE stocksinfo SET industry = 'Engineering & Construction' WHERE CompanyID = 100003;
UPDATE stocksinfo SET industry = 'Waste Management' WHERE CompanyID = 100004;
UPDATE stocksinfo SET industry = 'Industrial Distribution' WHERE CompanyID = 100005;
UPDATE stocksinfo SET industry = 'Airlines' WHERE CompanyID = 100006;
UPDATE stocksinfo SET industry = 'Consulting & Outsourcing' WHERE CompanyID = 100007;
UPDATE stocksinfo SET industry = 'Aerospace & Defense' WHERE CompanyID = 100008;
UPDATE stocksinfo SET industry = 'Farm & Construction Machinery' WHERE CompanyID = 100009;
UPDATE stocksinfo SET industry = 'Transportation & Logistics' WHERE CompanyID = 100010;
UPDATE stocksinfo SET industry = 'Employment Services' WHERE CompanyID = 100011;
UPDATE stocksinfo SET industry = 'Truck Manufacturing' WHERE CompanyID = 100012;
UPDATE stocksinfo SET industry = 'Conglomerates' WHERE CompanyID = 100013;

-- -- Loading data of Industry -> Technology[Piyush]
UPDATE stocksinfo SET industry = 'Computer Hardware' WHERE CompanyID = 101001;
UPDATE stocksinfo SET industry = 'Online Media' WHERE CompanyID = 101002;
UPDATE stocksinfo SET industry = 'Application Software' WHERE CompanyID = 101003;
UPDATE stocksinfo SET industry = 'Semiconductors' WHERE CompanyID = 101004;
UPDATE stocksinfo SET industry = 'Communication Equipment' WHERE CompanyID = 101005;

-- -- Loading data of Industry ->Consumer Defensive [Piyush]
UPDATE stocksinfo SET industry = 'Retail - Defensive' WHERE CompanyID = 102001;
UPDATE stocksinfo SET industry = 'Consumer Packaged Goods' WHERE CompanyID = 102002;
UPDATE stocksinfo SET industry = 'Tobacoo Products' WHERE CompanyID = 102003;
UPDATE stocksinfo SET industry = 'Beverages - Alocholic' WHERE CompanyID = 102004;
UPDATE stocksinfo SET industry = 'Beverages - Non-Alcoholic' WHERE CompanyID = 102005;
UPDATE stocksinfo SET industry = 'Education' WHERE CompanyID = 102006;

-- Loading data of Industry -> Consumer Cyclical(103)[piyush] 
UPDATE stocksinfo SET industry = 'Entertainment' WHERE CompanyID = 103001;
UPDATE stocksinfo SET industry = 'Retail - Apparel & Specialty' WHERE CompanyID = 103002;
UPDATE stocksinfo SET industry = 'Restaurants' WHERE CompanyID = 103003;
UPDATE stocksinfo SET industry = 'Manufacturing - Apparel & Furniture' WHERE CompanyID = 103004;
UPDATE stocksinfo SET industry = 'Autos' WHERE CompanyID = 103005;
UPDATE stocksinfo SET industry = 'Advertising & Marketing Services' WHERE CompanyID = 103011;
UPDATE stocksinfo SET industry = 'Homebuilding & Construction' WHERE CompanyID = 103013;
UPDATE stocksinfo SET industry = 'Travel & Leisure' WHERE CompanyID = 103015;
UPDATE stocksinfo SET industry = 'Packaging & Containers' WHERE CompanyID = 103018;
UPDATE stocksinfo SET industry = 'Personal Services' WHERE CompanyID = 103020;
UPDATE stocksinfo SET industry = 'Publishing' WHERE CompanyID = 103026;

--  Loading data of Industry -> Financial Services(104) [piyush]
UPDATE stocksinfo SET industry = 'Asset Management' WHERE CompanyID = 104001;
UPDATE stocksinfo SET industry = 'Banks' WHERE CompanyID = 104002;
UPDATE stocksinfo SET industry = 'Brokers & Exchanges' WHERE CompanyID = 104003;
UPDATE stocksinfo SET industry = 'Insurance - Life' WHERE CompanyID = 104004;
UPDATE stocksinfo SET industry = 'Insurance' WHERE CompanyID = 104005;
UPDATE stocksinfo SET industry = 'Insurance - Property & Casualty' WHERE CompanyID = 104006;
UPDATE stocksinfo SET industry = 'Credit Services' WHERE CompanyID = 104007;
UPDATE stocksinfo SET industry = 'Insurance - Specialty' WHERE CompanyID = 104013;

--  Loading data of Industry -> Utilities(105)[piyush]
UPDATE stocksinfo SET industry = 'Utilities - Regulated' WHERE CompanyID = 105001;
UPDATE stocksinfo SET industry = 'Utilities - Independent Power Pr' WHERE CompanyID = 105002;


-- -- Loading data of Industry -> Healthcare[Piyush]
UPDATE stocksinfo SET industry = 'Medical Diagnostics & Research' WHERE CompanyID = 106001;
UPDATE stocksinfo SET industry = 'Biotechnology' WHERE CompanyID = 106002;
UPDATE stocksinfo SET industry = 'Medical Instruments & Equipment' WHERE CompanyID = 106003;
UPDATE stocksinfo SET industry = 'Medical Devices' WHERE CompanyID = 106004;
UPDATE stocksinfo SET industry = 'Drug Manufacturers' WHERE CompanyID = 106005;
UPDATE stocksinfo SET industry = 'Health Care Plans' WHERE CompanyID = 106006;
UPDATE stocksinfo SET industry = 'Health Care Providers' WHERE CompanyID = 106011;
UPDATE stocksinfo SET industry = 'Medical Distribution' WHERE CompanyID = 106014;

--  Loading data of Industry -> Energy(107)[piyush] 
UPDATE stocksinfo SET industry = 'Oil & Gas - Refining & Marketing' WHERE CompanyID = 107001;
UPDATE stocksinfo SET industry = 'Oil & Gas - E&P' WHERE CompanyID = 107002;
UPDATE stocksinfo SET industry = 'Oil & Gas - Midstream' WHERE CompanyID = 107003;
UPDATE stocksinfo SET industry = 'Oil & Gas - Services' WHERE CompanyID = 107004;
UPDATE stocksinfo SET industry = 'Oil & Gas - Integrated' WHERE CompanyID = 107005;
UPDATE stocksinfo SET industry = 'Oil & Gas - Drilling' WHERE CompanyID = 107006;

--  Loading data of Industry -> Business Services(108)
UPDATE stocksinfo SET industry = 'Communication Services' WHERE CompanyID = 108001;

-- Loading data of Industry -> Real Estate(109)[piyush] 
UPDATE stocksinfo SET industry = 'REITs' WHERE CompanyID = 109001;
UPDATE stocksinfo SET industry = 'Real Estate Services' WHERE CompanyID = 109002;

--  Loading data of Industry -> Basic Materials(110) [piyush] 
UPDATE stocksinfo SET industry = 'Chemicals' WHERE CompanyID = 110001;
UPDATE stocksinfo SET industry = 'Forest Products' WHERE CompanyID = 110002;
UPDATE stocksinfo SET industry = 'Agriculture' WHERE CompanyID = 110003;
UPDATE stocksinfo SET industry = 'Metals & Mining' WHERE CompanyID = 110004;
UPDATE stocksinfo SET industry = 'Building Materials' WHERE CompanyID = 110005;
UPDATE stocksinfo SET industry = 'Coal' WHERE CompanyID = 110006;
UPDATE stocksinfo SET industry = 'Steel' WHERE CompanyID = 110007;


--  Loading data of Industry -> Others(112) [piyush] 
UPDATE stocksinfo SET industry = 'Others' WHERE CompanyID = 112001;

