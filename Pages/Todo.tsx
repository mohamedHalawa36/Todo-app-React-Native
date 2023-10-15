import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import styles from "../Styles/todosStyles";
import TaskItem from "../Components/TaskItem";
import { useQuery } from "react-query";
import { getTodos } from "../Utils/todoApi";
import AddTask from "../Components/AddTask";
import { RootStackParamList } from "../Routes/Router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { task } from "../Types/Types";
type todosProps = NativeStackScreenProps<RootStackParamList, "todos">;

function Todo({ route }:todosProps) {
  const { userId } = route.params;
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(userId),
    staleTime: 0,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To Do List </Text>
      <AddTask userId={userId} />
      <View
        style={{ flex: 1, justifyContent: "center" }}
      >
        {data?.todos && data.todos.length > 0 ? (
          <ScrollView>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -300}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                data?.todos &&
                data.todos.map((task:task, index:number) => (
                  <TaskItem
                    key={task.id}
                    item={task}
                    index={index}
                    userId={userId}
                  />
                ))
              )}
            </KeyboardAvoidingView>
          </ScrollView>
        ) : (
            <Text style={styles.emptyListTxt}> Start Adding Some Tasks !</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Todo;
