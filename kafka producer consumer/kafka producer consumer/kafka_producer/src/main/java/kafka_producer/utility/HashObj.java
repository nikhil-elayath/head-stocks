package kafka_producer.utility;

import java.util.HashMap;
import java.util.List;

public class HashObj {
    private String Message;
    private int code;
    private List<HashMap<String, Object>> data;
    private HashMap<String, Object> validate = new HashMap<>();

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public List<HashMap<String, Object>> getData() {
        return data;
    }

    public void setData(List<HashMap<String, Object>> data) {
        this.data = data;
    }

    public HashMap<String, Object> getValidate() {
        return validate;
    }

    public void setValidate(HashMap<String, Object> validate) {
        this.validate = validate;
    }

}
