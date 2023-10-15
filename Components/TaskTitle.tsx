import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../Styles/todosStyles";

type TaskTitleProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  index: number;
  isEditing: boolean;
};

function TaskTitle({ title, setTitle, index, isEditing }: TaskTitleProps) {
  return (
    <View style={styles.taskDetails}>
      <Text style={[styles.text,styles.taskNum]}>
        {index + 1 > 9 ? index + 1 : `0${index + 1}`}
      </Text>
      <TextInput
        multiline={true}
        value={title}
        onChangeText={setTitle}
        editable={isEditing}
        style={[isEditing ? styles.input : styles.text,{flex:1}]}
      />
    </View>
  );
}

export default TaskTitle;
