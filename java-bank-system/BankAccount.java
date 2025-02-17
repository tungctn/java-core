import java.io.Serializable;

public class BankAccount implements Serializable {
    private static final long serialVersionUID = 1L; // Serialization ID
    private String accountNumber;
    private String owner;
    private double balance;

    public BankAccount(String accountNumber, String owner, double balance) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.balance = balance;
    }

    public synchronized boolean withdraw(double amount) {
        if (amount > balance) {
            System.out.println(Thread.currentThread().getName() + " - Không đủ tiền!");
            return false;
        }
        balance -= amount;
        return true;
    }

    public synchronized void deposit(double amount) {
        balance += amount;
    }

    public synchronized void transfer(BankAccount target, double amount) {
        if (withdraw(amount)) {
            target.deposit(amount);
            System.out.println("Chuyển thành công " + amount + " đến " + target.accountNumber);
        }
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    @Override
    public String toString() {
        return "Account{" + "owner='" + owner + "', accountNumber='" + accountNumber + "', balance=" + balance + '}';
    }
}
