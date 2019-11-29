package kafka_producer;

import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import javax.security.auth.callback.Callback;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import kafka_producer.service.indicesService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@Component
public class schedulerController {
    // @Autowired
    // private SimpMessagingTemplate smt;

    @Autowired
    private indicesService is;

    int i = 0;

    @Scheduled(fixedRate = 7000)

    public void scheduleTaskWithFixedRate() throws JsonProcessingException {

        if (i == 352) {
            i = 0;
        }

        List<HashMap<String, Object>> value = is.getOhlc(true, i);
        // System.out.println(value);
        i = i + 1;

        ObjectMapper oMapper = new ObjectMapper();
        String map = oMapper.writeValueAsString(value);
        System.out.println(map);
        String topicName = "kafka_stocks";
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9093");
        props.put("max.in.flight.requests.per.connection", 20);
        props.put("key.serializer", "org.apache.kafka.common.serialization.IntegerSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        Producer<Integer, Object> producer = new KafkaProducer<>(props);
        for (int i = 1; i < 4; i++) {
            ProducerRecord<Integer, Object> record = new ProducerRecord<>(topicName, 0, i, map);
            producer.send(record, new MyProducerCallback());
        }
        producer.close();
        return;
    }

}

class MyProducerCallback implements Callback, org.apache.kafka.clients.producer.Callback {
    @Override
    public void onCompletion(RecordMetadata recordMetadata, Exception e) {
        if (e != null)
            System.out.println("AsynchronousProducer failed with an exception");
        else
            System.out.println("AsynchronousProducer call Success.\nOffset " + recordMetadata.offset() + " \ntopic "
                    + recordMetadata.topic() + " \npartition " + recordMetadata.partition());
    }
}