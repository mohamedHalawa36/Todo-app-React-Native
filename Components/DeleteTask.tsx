import React from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
} from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask } from "../Utils/todoApi";
import styles from "../Styles/todosStyles";

type DeleteTaskProps = {
  userId: string;
  taskId: string;
};

function DeleteTask({ userId, taskId }: DeleteTaskProps) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteTask, {
    onSuccess: async (data) => {
      try {
        if (data.status === "error") Alert.alert("Failed", data.message);
        else {
          queryClient.invalidateQueries("todos");
        }
      } catch (err) {
        Alert.alert("Failed", "Failed to delete Task");
      }
    },
  });

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task", [
      { text: "Cancel", onPress: () => {} },
      { text: "Confirm", onPress: () => { mutate({ userId, taskId }); } },
    ]);
  };

  return (
    <Pressable onPress={handleDelete}>
      <Text style={[styles.text]}>
        {isLoading ? <ActivityIndicator color="red" /> : "❌"}
      </Text>
    </Pressable>
  );
}

export default DeleteTask;
