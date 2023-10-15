import React, { useState } from "react";
import { View } from "react-native";
import styles from "../Styles/todosStyles";
import DeleteTask from "./DeleteTask";
import DoneBtn from "./DoneBtn";
import EditTask from "./EditTask";
import TaskTitle from "./TaskTitle";
import { task } from "../Types/Types";


type TaskItemProps = {
  item: task;
  index: number;
  userId: string;
};

function TaskItem({ item, index, userId }: TaskItemProps) {
  const { title, id: taskId } = item;
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);

  return (
    <View style={styles.taskContainer}>
      <TaskTitle
        title={taskTitle}
        setTitle={setTaskTitle}
        isEditing={isEditing}
        index={index}
      />
      <View style={styles.taskStatusContainer}>
        <View style={styles.btns}>
          <DoneBtn userId={userId} task={item} />
          <EditTask
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            task={item}
            title={taskTitle}
            userId={userId}
          />
          <DeleteTask userId={userId} taskId={taskId} />
        </View>
      </View>
    </View>
  );
}

export default TaskItem;
