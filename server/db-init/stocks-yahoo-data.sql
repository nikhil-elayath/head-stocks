

\c headstocks;

--[Yatin] Creating the structure
create table yahoodata
(
    dates date,
    opening double precision,
    high double precision,
    low double precision,
    closing double precision,
    adjclose double precision,
    volume bigint,
    ticker varchar(50)
);

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\index\^DJI.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'DJI' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\index\^GSPC.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'GSPC' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\index\^NDX.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'NDX' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\index\^OEX.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'OEX' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\index\^RUA.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'RUA' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\index\^RUT.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'RUT' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\health\ALGN.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'ALGN' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\health\ANTM.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'ANTM' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\health\BDX.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'BDX' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\health\BMRN.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'BMRN' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\health\CLR.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'CLR' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\health\CNC.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'CNC' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\health\CVS.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'CVS' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\health\EW.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'EW' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\health\ICLR.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'ICLR' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\health\JNJ.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'JNj' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\tech\AAPL.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'AAPL' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\tech\ADBE.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'ADBE' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\tech\CRM.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'CRM' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\tech\CSCO.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'CSCO' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\tech\HP.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'HP' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\tech\IBM.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'IBM' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\tech\INTC.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'INTC' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\tech\MSFT.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'MSFT' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\tech\ORA.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'ORA' WHERE ticker is null;

COPY yahoodata
(dates,opening,high,low, closing, adjclose, volume) 
FROM 'C:\Users\kinng\Desktop\capstone2\headstocks\server\db-init\stock-data\yahoo-data\tech\ORCL.csv' CSV HEADER;

UPDATE yahoodata SET ticker = 'ORCL' WHERE ticker is null;