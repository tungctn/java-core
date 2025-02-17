import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Transaction {
    private ExecutorService executor = Executors.newFixedThreadPool(3); // Thread pool 3 threads

    public void processTransaction(BankAccount from, BankAccount to, double amount) {
        executor.execute(() -> {
            from.transfer(to, amount);
        });
    }

    public void shutdown() {
        executor.shutdown();
    }
}
