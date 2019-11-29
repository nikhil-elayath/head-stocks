package com.example.demo.service;

import java.util.List;

import com.example.demo.model.stocks_data_2;
import com.example.demo.repository.GainersLosers;
import com.example.demo.utility.responseCreator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class GainersLosersService {
    @Autowired
    private GainersLosers gl;
    @Autowired
    MongoTemplate mongoTemplate;

    public ResponseEntity<String> getOhlc(Boolean isIndex) {
        try {
            List<stocks_data_2> ohlc = gl.findByisIndex(isIndex);
            for (stocks_data_2 item : ohlc) {
                System.out.println(item.getTicker_dates());
            }

            return ResponseEntity.ok(responseCreator.response2("Blog Created", ohlc, null, 200));

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}