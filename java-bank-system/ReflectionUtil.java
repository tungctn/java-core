import java.lang.reflect.Method;

public class ReflectionUtil {
    public static void printMethods(Class<?> clazz) {
        Method[] methods = clazz.getDeclaredMethods();
        for (Method method : methods) {
            System.out.println("Method: " + method.getName());
        }
    }
}
