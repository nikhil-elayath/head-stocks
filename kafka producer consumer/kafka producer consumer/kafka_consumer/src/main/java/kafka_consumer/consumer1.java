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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class consumer1 {
    @Autowired
    private SimpMessagingTemplate smt;

    @Value("${ktopic}")
    String ktopic;

    @Value("${username_k}")
    String username;

    @Value("${password}")
    String password;

    @Value("${server}")
    String server;

    public void runSingleWorker() {
        String topicName = ktopic;
        String jaasTemplate = "org.apache.kafka.common.security.scram.ScramLoginModule required username=\"%s\" password=\"%s\";";
        String jaasCfg = String.format(jaasTemplate, username, password);
        String groupName = "stck123";
        Properties props = new Properties();
        // props.put("bootstrap.servers", "localhost:9093");
        props.put("bootstrap.servers", server);
        props.put("group.id", username + "-con");
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "1000");
        props.put("auto.offset.reset", "earliest");
        props.put("session.timeout.ms", "30000");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("security.protocol", "SASL_SSL");
        props.put("sasl.mechanism", "SCRAM-SHA-256");
        props.put("sasl.jaas.config", jaasCfg);

        KafkaConsumer<String, Object> consumer = new KafkaConsumer<>(props);
        RebalanceListner rb = new RebalanceListner(consumer);

        consumer.subscribe(Arrays.asList("9shbhrme-mytopic"));

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