package com.example.demo.controller;

import com.example.demo.model.stocks_data_2;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.async.client.MongoDatabase;

import org.jfree.data.category.DefaultCategoryDataset;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

@CrossOrigin(origins = "*")
@RestController
@org.springframework.transaction.annotation.Transactional
@RequestMapping("/api/stocks")
public class GainersController {
    static DefaultCategoryDataset dataset = new DefaultCategoryDataset();
    public static final String DB_NAME = "stockbazaar";
    public static final String stocks_data_2_COLLECTION = "stocks_data_2";

    @GetMapping("/predict/{ticker_name}")
    public List<Double> monteCarlo(@PathVariable String ticker_name) throws UnknownHostException {

        MongoClientURI uri = new MongoClientURI(
                "mongodb+srv://headstrait_1:headstrait_1@cluster0-lxitk.mongodb.net/stockbazaar?retryWrites=true&w=majority");

        MongoClient mongoClient = new MongoClient(uri);
        com.mongodb.client.MongoDatabase database = mongoClient.getDatabase("stockbazaar");
        MongoOperations mongoOps = new MongoTemplate(mongoClient, DB_NAME);
        stocks_data_2 p1 = mongoOps.findOne(new Query(Criteria.where("ticker_name").is(ticker_name)),
                stocks_data_2.class, stocks_data_2_COLLECTION);
        List<Date> stack = new ArrayList<>();
        List<Double> arr = new ArrayList<>();
        List<Double> change = new ArrayList<>();
        List<Double> normal = new ArrayList<>();
        List<Double> price = new ArrayList<>();
        List<Double> price_series = new ArrayList<>();

        List<Double> price1 = new ArrayList<>();
        Integer num_simulations = 10;
        Integer num_days = 10;
        double total = 0;
        double mean;
        double standardDeviation = 0.0;
        double last_price;
        int count;
        System.out.println(ticker_name);
        for (HashMap<?, ?> item : p1.getTicker_dates()) {

            if (item.containsKey("Share Price")) {
                stack.add((Date) item.get("date"));
                if (item.get("Share Price").getClass().getName() == "java.lang.Integer") {
                    arr.add(((Integer) item.get("Share Price")).doubleValue());

                } else {
                    arr.add(((Double) item.get("Share Price")));
                }
            }

        }

        last_price = arr.get(arr.size() - 1);

        for (int i = 1; i < arr.size(); i++) {
            change.add(arr.get(i) - arr.get(i - 1));
        }
        double sum = 0.0;
        int length = change.size();
        for (double num : change) {
            sum += num;
        }
        mean = sum / length;
        for (double num : change) {
            standardDeviation += Math.pow(num - mean, 2);
        }

        for (int i = 0; i < arr.size(); i++) {
            normal.add((arr.get(i) - mean) / standardDeviation);
        }

        for (int i = 0; i < num_simulations; i++) {
            count = 0;
            Integer ran = (int) ((Math.random() * ((normal.size() - 1 - 0) + 1)) + 0);
            price.add(last_price * (1 + normal.get(ran)));
            price1.add(price.get(i));

            for (int j = 0; j < num_days; j++) {
                Integer ran1 = (int) ((Math.random() * ((normal.size() - 1 - 0) + 1)) + 0);
                count = 0;
                if (count == 251)
                    break;
                price_series.add(price1.get(count) * ((1 + normal.get(ran1))));
                dataset.addValue(price1.get(count) * ((1 + normal.get(ran1))), "Share Price", Integer.toString(j));
                count += 1;
            }
        }
        return price_series;

    }

}