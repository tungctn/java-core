import java.util.*;

public class BankManager {
    private Map<String, BankAccount> accounts = new HashMap<>();

    public void addAccount(BankAccount account) {
        accounts.put(account.getAccountNumber(), account);
    }

    public BankAccount getAccount(String accountNumber) {
        return accounts.get(accountNumber);
    }

    public void listAccounts() {
        accounts.values().forEach(System.out::println);
    }

    public Map<String, BankAccount> getAccounts() {
        return accounts;
    }
}
