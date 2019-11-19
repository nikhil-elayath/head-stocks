package com.example.demo.repository;

import java.util.List;

import com.example.demo.model.stocks_data_2;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GainersLosers extends MongoRepository<stocks_data_2, Integer> {

    List<stocks_data_2> findByisIndex(Boolean isIndex);

}