package kafka_consumer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class controller {

    @GetMapping("/topic/data")
    // @SendTo("/topic/data")
    public String greeting() throws Exception {
        Thread.sleep(1000); // simulated delay
        System.out.println("message");
        return "azsfczscfsfc";
    }

}