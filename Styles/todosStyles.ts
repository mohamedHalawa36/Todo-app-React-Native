import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
    flex: 1,
  },
  taskNum: {
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  todoList: {
    backgroundColor: "#ddd",
    gap: 5,
    flex: 1,
    paddingBottom: 15,
  },
  taskContainer: {
    backgroundColor: "white",
    paddingHorizontal: 7,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  emptyListTxt: {
    textAlign:"center",
    fontWeight:"bold",
    fontSize:20,
    color:"#980112"
  },
  taskDetails: {
    flex: 1,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  taskStatusContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  btns: {
    flexDirection: "row",
    gap: 20,
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  input: {
    color: "black",
    paddingHorizontal: 3,
    marginRight: 5,
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  done: {
    color: "green",
  },
  notDone: {
    color: "#ddd",
  },
});

export default styles;
