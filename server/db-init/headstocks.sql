/*piyush */
drop database if exists headstocks;
create database headstocks;


\c headstocks;

-- Creating the structure [Piyush]
create table simfin
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
COPY simfin
(Ticker,SimFinID,CompanyID,IndicatorName, dates, IndicatorValue) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\simfin-data\output-semicolon-narrow.csv' DELIMITER ';' CSV HEADER;

-- Creating Company Column [Piyush]
ALTER TABLE simfin ADD COLUMN Industry varchar
(255);

-- Creating Sectors Column [Piyush]
ALTER TABLE simfin ADD COLUMN Sector varchar
(255);
 
 -- Updated ticker name to NA where the ticker value is null [piyush] 
UPDATE simFin set ticker='NA' where ticker is null;

UPDATE simfin SET Sector = 'Industrials' WHERE CAST(CompanyID AS TEXT) like '100%';
UPDATE simfin SET Sector = 'Technology' WHERE CAST(CompanyID AS TEXT) like '101%';
UPDATE simfin SET Sector = 'Consumer Defensive' WHERE CAST(CompanyID AS TEXT) like '102%';
UPDATE simfin SET Sector = 'Consumer Cyclical' WHERE CAST(CompanyID AS TEXT) like '103%';
UPDATE simfin SET Sector = 'Financial Services' WHERE CAST(CompanyID AS TEXT) like '104%';
UPDATE simfin SET Sector = 'Utilities' WHERE CAST(CompanyID AS TEXT) like '105%';
UPDATE simfin SET Sector = 'Healthcare' WHERE CAST(CompanyID AS TEXT) like '106%';
UPDATE simfin SET Sector = 'Energy' WHERE CAST(CompanyID AS TEXT) like '107%';
UPDATE simfin SET Sector = 'Business Services' WHERE CAST(CompanyID AS TEXT) like '108%';
UPDATE simfin SET Sector = 'Real Estate' WHERE CAST(CompanyID AS TEXT) like '109%';
UPDATE simfin SET Sector = 'Basic Materials' WHERE CAST(CompanyID AS TEXT) like '110%';
UPDATE simfin SET Sector = 'Other' WHERE CAST(CompanyID AS TEXT) like '0%';
UPDATE simfin SET Sector = 'Other' WHERE CAST(CompanyID AS TEXT) like '111%';
UPDATE simfin SET Sector = 'Other' WHERE CAST(CompanyID AS TEXT) like '112%';


-- Creating Indexes on Ticker, Indicator name, commpanyID and indicator values [Piyush]
create index ticker_index on simfin (Ticker);
create index indicator_name_index on simfin (IndicatorName);
create index dates_index on simfin (dates);
create index CompanyID_index on simfin (CompanyID)
create index SimFinID_index on simfin (SimFinID)


-- --  Loading data of Industry -> Industrials[Piyush]
UPDATE simfin SET industry = 'Industrial Products' WHERE CompanyID = 100001;
UPDATE simfin SET industry = 'Business Services' WHERE CompanyID = 100002;
UPDATE simfin SET industry = 'Engineering & Construction' WHERE CompanyID = 100003;
UPDATE simfin SET industry = 'Waste Management' WHERE CompanyID = 100004;
UPDATE simfin SET industry = 'Industrial Distribution' WHERE CompanyID = 100005;
UPDATE simfin SET industry = 'Airlines' WHERE CompanyID = 100006;
UPDATE simfin SET industry = 'Consulting & Outsourcing' WHERE CompanyID = 100007;
UPDATE simfin SET industry = 'Aerospace & Defense' WHERE CompanyID = 100008;
UPDATE simfin SET industry = 'Farm & Construction Machinery' WHERE CompanyID = 100009;
UPDATE simfin SET industry = 'Transportation & Logistics' WHERE CompanyID = 100010;
UPDATE simfin SET industry = 'Employment Services' WHERE CompanyID = 100011;
UPDATE simfin SET industry = 'Truck Manufacturing' WHERE CompanyID = 100012;
UPDATE simfin SET industry = 'Conglomerates' WHERE CompanyID = 100013;

-- -- Loading data of Industry -> Technology[Piyush]
UPDATE simfin SET industry = 'Computer Hardware' WHERE CompanyID = 101001;
UPDATE simfin SET industry = 'Online Media' WHERE CompanyID = 101002;
UPDATE simfin SET industry = 'Application Software' WHERE CompanyID = 101003;
UPDATE simfin SET industry = 'Semiconductors' WHERE CompanyID = 101004;
UPDATE simfin SET industry = 'Communication Equipment' WHERE CompanyID = 101005;

-- -- Loading data of Industry ->Consumer Defensive [Piyush]
UPDATE simfin SET industry = 'Retail - Defensive' WHERE CompanyID = 102001;
UPDATE simfin SET industry = 'Consumer Packaged Goods' WHERE CompanyID = 102002;
UPDATE simfin SET industry = 'Tobacoo Products' WHERE CompanyID = 102003;
UPDATE simfin SET industry = 'Beverages - Alocholic' WHERE CompanyID = 102004;
UPDATE simfin SET industry = 'Beverages - Non-Alcoholic' WHERE CompanyID = 102005;
UPDATE simfin SET industry = 'Education' WHERE CompanyID = 102006;

-- Loading data of Industry -> Consumer Cyclical(103)[piyush] 
UPDATE simfin SET industry = 'Entertainment' WHERE CompanyID = 103001;
UPDATE simfin SET industry = 'Retail - Apparel & Specialty' WHERE CompanyID = 103002;
UPDATE simfin SET industry = 'Restaurants' WHERE CompanyID = 103003;
UPDATE simfin SET industry = 'Manufacturing - Apparel & Furniture' WHERE CompanyID = 103004;
UPDATE simfin SET industry = 'Autos' WHERE CompanyID = 103005;
UPDATE simfin SET industry = 'Advertising & Marketing Services' WHERE CompanyID = 103011;
UPDATE simfin SET industry = 'Homebuilding & Construction' WHERE CompanyID = 103013;
UPDATE simfin SET industry = 'Travel & Leisure' WHERE CompanyID = 103015;
UPDATE simfin SET industry = 'Packaging & Containers' WHERE CompanyID = 103018;
UPDATE simfin SET industry = 'Personal Services' WHERE CompanyID = 103020;
UPDATE simfin SET industry = 'Publishing' WHERE CompanyID = 103026;

--  Loading data of Industry -> Financial Services(104) [piyush]
UPDATE simfin SET industry = 'Asset Management' WHERE CompanyID = 104001;
UPDATE simfin SET industry = 'Banks' WHERE CompanyID = 104002;
UPDATE simfin SET industry = 'Brokers & Exchanges' WHERE CompanyID = 104003;
UPDATE simfin SET industry = 'Insurance - Life' WHERE CompanyID = 104004;
UPDATE simfin SET industry = 'Insurance' WHERE CompanyID = 104005;
UPDATE simfin SET industry = 'Insurance - Property & Casualty' WHERE CompanyID = 104006;
UPDATE simfin SET industry = 'Credit Services' WHERE CompanyID = 104007;
UPDATE simfin SET industry = 'Insurance - Specialty' WHERE CompanyID = 104013;

--  Loading data of Industry -> Utilities(105)[piyush]
UPDATE simfin SET industry = 'Utilities - Regulated' WHERE CompanyID = 105001;
UPDATE simfin SET industry = 'Utilities - Independent Power Pr' WHERE CompanyID = 105002;


-- -- Loading data of Industry -> Healthcare[Piyush]
UPDATE simfin SET industry = 'Medical Diagnostics & Research' WHERE CompanyID = 106001;
UPDATE simfin SET industry = 'Biotechnology' WHERE CompanyID = 106002;
UPDATE simfin SET industry = 'Medical Instruments & Equipment' WHERE CompanyID = 106003;
UPDATE simfin SET industry = 'Medical Devices' WHERE CompanyID = 106004;
UPDATE simfin SET industry = 'Drug Manufacturers' WHERE CompanyID = 106005;
UPDATE simfin SET industry = 'Health Care Plans' WHERE CompanyID = 106006;
UPDATE simfin SET industry = 'Health Care Providers' WHERE CompanyID = 106011;
UPDATE simfin SET industry = 'Medical Distribution' WHERE CompanyID = 106014;

--  Loading data of Industry -> Energy(107)[piyush] 
UPDATE simfin SET industry = 'Oil & Gas - Refining & Marketing' WHERE CompanyID = 107001;
UPDATE simfin SET industry = 'Oil & Gas - E&P' WHERE CompanyID = 107002;
UPDATE simfin SET industry = 'Oil & Gas - Midstream' WHERE CompanyID = 107003;
UPDATE simfin SET industry = 'Oil & Gas - Services' WHERE CompanyID = 107004;
UPDATE simfin SET industry = 'Oil & Gas - Integrated' WHERE CompanyID = 107005;
UPDATE simfin SET industry = 'Oil & Gas - Drilling' WHERE CompanyID = 107006;

--  Loading data of Industry -> Business Services(108)
UPDATE simfin SET industry = 'Communication Services' WHERE CompanyID = 108001;

-- Loading data of Industry -> Real Estate(109)[piyush] 
UPDATE simfin SET industry = 'REITs' WHERE CompanyID = 109001;
UPDATE simfin SET industry = 'Real Estate Services' WHERE CompanyID = 109002;

--  Loading data of Industry -> Basic Materials(110) [piyush] 
UPDATE simfin SET industry = 'Chemicals' WHERE CompanyID = 110001;
UPDATE simfin SET industry = 'Forest Products' WHERE CompanyID = 110002;
UPDATE simfin SET industry = 'Agriculture' WHERE CompanyID = 110003;
UPDATE simfin SET industry = 'Metals & Mining' WHERE CompanyID = 110004;
UPDATE simfin SET industry = 'Building Materials' WHERE CompanyID = 110005;
UPDATE simfin SET industry = 'Coal' WHERE CompanyID = 110006;
UPDATE simfin SET industry = 'Steel' WHERE CompanyID = 110007;


--  Loading data of Industry -> Others(112) [piyush] 
UPDATE simfin SET industry = 'Others' WHERE CompanyID = 112001;

