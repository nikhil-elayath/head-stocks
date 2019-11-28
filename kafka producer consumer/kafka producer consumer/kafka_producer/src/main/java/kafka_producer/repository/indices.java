package kafka_producer.repository;

import java.util.List;

import kafka_producer.model.stocks_data_2;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface indices extends MongoRepository<stocks_data_2, Integer> {

    List<stocks_data_2> findByisIndex(Boolean isIndex);

}