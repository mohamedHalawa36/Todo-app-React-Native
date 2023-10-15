import { StyleSheet, Text } from "react-native";

function EmptyTodoList() {
  return <Text style={styles.text}>Start Adding sime tasks</Text>;
}
export default EmptyTodoList;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
  },
});
