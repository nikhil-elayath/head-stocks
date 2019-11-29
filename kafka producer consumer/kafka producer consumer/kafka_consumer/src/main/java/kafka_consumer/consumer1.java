package kafka_consumer;

import java.util.Arrays;
import java.util.Properties;
// import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class consumer1 {
    @Autowired
    private SimpMessagingTemplate smt;

    public void runSingleWorker() {
        String topicName = "9shbhrme-kafka_stocks";
        String groupName = "stck123";
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9093");
        props.put("group.id", groupName);
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

        KafkaConsumer<String, Object> consumer = new KafkaConsumer<>(props);
        RebalanceListner rb = new RebalanceListner(consumer);

        consumer.subscribe(Arrays.asList(topicName), rb);

        while (true) {
            @SuppressWarnings("deprecation")
            ConsumerRecords<String, Object> records = consumer.poll(100);
            for (ConsumerRecord<String, Object> record : records) {
                System.out.println(record.offset());
                System.out.println(record);
                System.out.println("Topic offset: " + record.topic() + "" + record.offset() + "" + record.value());
                JSONParser parser = new JSONParser();
                try {
                    JSONArray array = (JSONArray) parser.parse((String) record.value());
                    ;
                    System.out.println(array.size());
                    smt.convertAndSend("/topic/public", array);
                    System.out.println("sent");

                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }

        }

    }
}