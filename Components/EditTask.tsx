import React from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  Text,
} from "react-native";
import styles from "../Styles/todosStyles";
import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "../Utils/todoApi";
import { task } from "../Types/Types";



type EditTaskProps = {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  task: task;
  title: string;
  userId: string;
};

function EditTask({ isEditing, setIsEditing, task, title, userId }: EditTaskProps) {
  const { id, done } = task;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateTask, {
    onSuccess: async (data) => {
      try {
        if (data.status === "error") Alert.alert("Failed", data.message);
        else {
          queryClient.invalidateQueries("todos");
          setIsEditing(false);
        }
      } catch (err) {
        Alert.alert("Failed", "Failed to update Task");
      }
    },
  });

  const handleUpdate = () => {
    if (isEditing) {
      Keyboard.dismiss();
      const newTask = { id, done, title };
      mutate({ userId, task:newTask });
    } else {
      setIsEditing(true);
    }
  };

  return (
    <Pressable onPress={handleUpdate}>
      <Text style={[styles.text]}>
        {isLoading ? <ActivityIndicator /> : isEditing ? "💾" : "📝"}
      </Text>
    </Pressable>
  );
}

export default EditTask;
