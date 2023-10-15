import React from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
} from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "../Utils/todoApi";
import styles from "../Styles/todosStyles";
import { task } from "../Types/Types";


type DoneBtnProps = {
  userId: string;
  task: task;
};

function DoneBtn({ userId, task }: DoneBtnProps) {
  const { done, title, id } = task;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateTask, {
    onSuccess: async (data) => {
      try {
        if (data.status === "error") Alert.alert("Failed", data.message);
        else {
          queryClient.invalidateQueries("todos");
        }
      } catch (err) {
        Alert.alert("Failed", "Failed to update Task");
      }
    },
  });
  const handleDone = () => {
    const newTask = { id, title, done: !done };
    mutate({ userId, task:newTask });
  };
  return (
    <Pressable onPress={handleDone}>
      <Text style={[styles.text]}>
        {isLoading ? <ActivityIndicator color="green" /> : done ? "✅" : "⬜"}
      </Text>
    </Pressable>
  );
}

export default DoneBtn;
