package kafka_producer.utility;

import org.slf4j.*;

public class LoggerFunc {

	private static Logger Logger = LoggerFactory.getLogger(LoggerFunc.class);

	public static void consoleMsg(String msg) {
		Logger.info(msg);

	}

	public static void errorLog(Exception e) {
		Logger.error(e.toString());
	}

}
