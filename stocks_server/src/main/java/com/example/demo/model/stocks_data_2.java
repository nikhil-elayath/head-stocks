package com.example.demo.model;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "stocks_data_2")
public class stocks_data_2 {
    @Id
    private String id;
    private int ticker_id;
    private String ticker_name;
    private Boolean isIndex;
    private String sector;
    private String industry;
    private List<HashMap<?, ?>> ticker_dates;
    private List<HashMap<?, ?>> ohlc_dates;

    public int getTicker_id() {
        return ticker_id;
    }

    public void setTicker_id(int ticker_id) {
        this.ticker_id = ticker_id;
    }

    public String getTicker_name() {
        return ticker_name;
    }

    public void setTicker_name(String ticker_name) {
        this.ticker_name = ticker_name;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Boolean getIsIndex() {
        return isIndex;
    }

    public void setIsIndex(Boolean isIndex) {
        this.isIndex = isIndex;
    }

    public List<HashMap<?, ?>> getTicker_dates() {
        return ticker_dates;
    }

    public void setTicker_dates(List<HashMap<?, ?>> ticker_dates) {
        this.ticker_dates = ticker_dates;
    }

    public List<HashMap<?, ?>> getOhlc_dates() {
        return ohlc_dates;
    }

    public void setOhlc_dates(List<HashMap<?, ?>> ohlc_dates) {
        this.ohlc_dates = ohlc_dates;
    }

}