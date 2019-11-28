package kafka_producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class listener {

    private static final Logger logger = LoggerFactory.getLogger(listener.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) throws InterruptedException {
        logger.info("Received a new web socket connection");
        // messagingTemplate.convertAndSend("/topic/public", "chatMessage");
        // Thread.sleep(10000);
        // messagingTemplate.convertAndSend("/topic/public", "chatMessage");
    }

    // @Scheduled(fixedRate = 1000)
    // public void scheduleTaskWithFixedRate() {
    // messagingTemplate.convertAndSend("/topic/public", new Obj(10, 20));
    // logger.info("produced");

    // }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        messagingTemplate.convertAndSend("/topic/public", "chatMessage");
    }
}
