package kafka_producer.utility;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;

public class ObjToJSON {
	public static String Obj2JSON(Object obj) {
		ObjectMapper Obj = new ObjectMapper();
		try {
			String jsonStr = Obj.writeValueAsString(obj);
			return jsonStr;
		} catch (IOException e) {
			LoggerFunc.errorLog(e);
			return null;
		}
	}
}
