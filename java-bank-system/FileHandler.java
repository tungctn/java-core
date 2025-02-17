import java.io.*;
import java.util.*;

public class FileHandler {
    private static final String FILE_NAME = "java-bank-system/bank_accounts.ser";

    public static void saveAccounts(Map<String, BankAccount> accounts) {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_NAME))) {
            oos.writeObject(accounts);
            System.out.println("Dữ liệu đã lưu thành công!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static Map<String, BankAccount> loadAccounts() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(FILE_NAME))) {
            return (Map<String, BankAccount>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            return new HashMap<>(); // Trả về map trống nếu file không tồn tại
        }
    }
}
