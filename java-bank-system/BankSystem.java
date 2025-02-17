import java.util.Map;


public class BankSystem {
    public static void main(String[] args) {
        BankManager manager = new BankManager();
        Transaction transactionManager = new Transaction();

        // Tạo tài khoản
        BankAccount acc1 = new BankAccount("12345", "Alice", 1000);
        BankAccount acc2 = new BankAccount("67890", "Bob", 2000);

        manager.addAccount(acc1);
        manager.addAccount(acc2);

        // Lưu tài khoản vào file
        FileHandler.saveAccounts(manager.getAccounts()); // Truyền toàn bộ danh sách tài khoản


        // Chuyển tiền (Multithreading)
        transactionManager.processTransaction(acc1, acc2, 300);
        transactionManager.processTransaction(acc2, acc1, 500);

        // Load lại dữ liệu từ file
        Map<String, BankAccount> loadedAccounts = FileHandler.loadAccounts();

        for (BankAccount account : loadedAccounts.values()) {
            manager.addAccount(account);
        }


        // In danh sách tài khoản
        manager.listAccounts();

        // In thông tin phương thức của lớp BankAccount bằng Reflection
        ReflectionUtil.printMethods(BankAccount.class);

        transactionManager.shutdown();
    }
}
