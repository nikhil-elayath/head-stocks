package kafka_producer.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import kafka_producer.model.stocks_data_2;
import kafka_producer.repository.indices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class indicesService {
    @Autowired
    private indices in;
    @Autowired
    MongoTemplate mongoTemplate;

    public List<HashMap<String, Object>> getOhlc(Boolean isIndex, Integer i) {
        try {
            List<HashMap<String, Object>> hash_map = new ArrayList<>();
            List<stocks_data_2> ohlc = in.findByisIndex(isIndex);
            for (stocks_data_2 item : ohlc) {

                List<HashMap<?, ?>> index = item.getTicker_dates();

                Object changePercentage = new Object();

                if (i == 0) {
                    changePercentage = null;
                } else {
                    double new_val = 0.0;
                    double val = 0.0;
                    if (index.get(i).get("closing").getClass().getName().equals("java.lang.Integer")) {
                        new_val = (double) ((Integer) index.get(i).get("closing"));
                    } else if (index.get(i).get("closing").getClass().getName().equals("java.lang.Double")) {
                        new_val = Double.parseDouble(index.get(i).get("closing").toString());
                    }

                    if (index.get(i - 1).get("closing").getClass().getName().equals("java.lang.Integer")) {
                        val = (double) ((Integer) index.get(i - 1).get("closing"));
                        System.out.println("val is " + val);
                    } else if (index.get(i - 1).get("closing").getClass().getName().equals("java.lang.Double")) {
                        val = Double.parseDouble(index.get(i - 1).get("closing").toString());
                    }
                    // if (val)
                    changePercentage = ((new_val - val) / val) * 100;
                }

                HashMap<String, Object> currentPrice = new HashMap<>();
                currentPrice.put("tickerName", item.getTicker_name());
                currentPrice.put("closing", index.get(i).get("closing"));
                currentPrice.put("changePercentage", changePercentage);
                hash_map.add(currentPrice);

            }

            System.out.println(hash_map);
            return hash_map;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}