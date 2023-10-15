import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import { useMutation, useQueryClient } from "react-query";
import { addTask } from "../Utils/todoApi";

type AddTaskProps = {
  userId: string;
};

function AddTask({ userId }: AddTaskProps) {
  const [taskTitle, setTaskTitle] = useState<string>(""); // Added type annotation
  const queryClient = useQueryClient();
  const isTitleEmpty = taskTitle.length === 0;
  const { mutate, isLoading } = useMutation(addTask, {
    onSuccess: async (data) => {
      try {
        if (data.status === "error") Alert.alert("Failed", data.message);
        else {
          setTaskTitle("");
          queryClient.invalidateQueries("todos");
        }
      } catch (err) {
        Alert.alert("Failed", "Failed to add Task");
      }
    },
  });

  const handleAdd = () => {
    Keyboard.dismiss();

    const task = { title: taskTitle, done: false, id: uuid.v4().toString() };
    mutate({ userId, task });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      {isLoading ? (
        <ActivityIndicator size={"large"} color={`#0492C2`} />
      ) : (
        <Pressable disabled={isTitleEmpty} onPress={handleAdd}>
          <Text style={styles.button}>Add</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 5,
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  button: {
    color: "#0492C2",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AddTask;
