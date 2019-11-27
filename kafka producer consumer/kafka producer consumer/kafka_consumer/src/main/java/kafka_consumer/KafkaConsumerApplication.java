package kafka_consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KafkaConsumerApplication implements CommandLineRunner {
    public static void main(String[] args) {
        SpringApplication.run(KafkaConsumerApplication.class, args);
    }

    @Autowired
    consumer1 c1;

    @Override
    public void run(String... args) throws Exception {
        Thread th = new Thread(() -> {
            // logger.info("Starting Kafka consumer thread.");
            c1.runSingleWorker();
        });

        /*
         * Starting the first thread.
         */
        th.start();

    }

}