import { useState } from "react";
import TrashIcon from "./icons/TrashIcon";
import { Task, Id } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (content: string, id: Id) => void;
}


const TaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
   const {
      setNodeRef,
      attributes,
      listeners,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: task.id,
      data: { type: "Task", task },
      disabled: editMode,
    });
  
    const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };


  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  // console.log(task.content);

  if (isDragging) { 
    return <div ref={setNodeRef}
      style={style} className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500 cursor-grab relative opacity-30" />
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      >
        <textarea className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none" autoFocus placeholder="Task content here" onBlur={toggleEditMode} value={task.content} onKeyDown={(e) => {
          if(e.key === "Enter" && e.shiftKey ) toggleEditMode();
          }}
           onChange={(e) => updateTask(e.target.value, task.id)}></textarea>
      </div>
    );
  }
  return (
    <div
       ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      onClick={toggleEditMode}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">{task.content}</p>
      {mouseIsOver && (
        <button
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
