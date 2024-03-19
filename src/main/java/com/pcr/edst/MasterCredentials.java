package com.pcr.edst;

public class MasterCredentials {
	private static final String MASTER_EMAIL = "master@edst";
    private static final String MASTER_PASSWORD = "master123";

    // Validate master credentials
    public static boolean isValidMasterCredentials(String email, String password) {
        return MASTER_EMAIL.equals(email) && MASTER_PASSWORD.equals(password);
    }
}
