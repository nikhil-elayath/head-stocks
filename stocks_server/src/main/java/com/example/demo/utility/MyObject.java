package com.example.demo.utility;

import java.util.HashMap;
import java.util.List;

public class MyObject {
	private String Message;
	private int code;
	private List<Object> data;
	private HashMap<String, String> validate = new HashMap<>();

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

	public List<Object> getData() {
		return data;
	}

	public void setData(List<Object> data) {
		this.data = data;
	}

	public HashMap<String, String> getValidate() {
		return validate;
	}

	public void setValidate(HashMap<String, String> validate) {
		this.validate = validate;
	}

}
