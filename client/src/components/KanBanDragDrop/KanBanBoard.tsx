import { useMemo, useState } from "react";
import PlusIcon from "./icons/PlusIcon";
import { Column, Id, Task } from "./types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";

const KanBanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 3px
      },
    })
  );
  return (
    <div className="flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] bg-black text-white box-border">
       <Link to="/chat" className="text-white bg-green-500 rounded-lg p-2 fixed top-5">
            Back to chat
          </Link>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2"
            onClick={() => createNewColumn()}
          >
            <PlusIcon />
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                 deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && <TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function updateTask(content: string, id: Id) { 
    const newTasks = tasks.map(task => { 
      if (task.id !== id) return task;
      return {...task, content};
    });
    setTasks(newTasks);
    
  }

  function deleteTask (id: Id) { 
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter(
      (column: Column) => column.id !== id
    );
    setColumns(filteredColumns);

    const newTasks = tasks.filter(task => task.columnId !== id);
    setTasks(newTasks);

  }

  function updateColumn(title: string, id: Id) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  }

  function generateId() {
    /* Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
  }

  function onDragStart(event: DragStartEvent) {
    console.log("Drag Start", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  
  function onDragOver(event: DragOverEvent) { 
 const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task"; 
    const isOverATask = over.data.current?.type === "Task"; 

    if (!isActiveATask) return;

    /* I am dropping a Task over another task */
    if (isActiveATask && isOverATask) { 
      setTasks(tasks => { 
        const activeIndex = tasks.findIndex(task => task.id === activeId);
        const overIndex = tasks.findIndex(task => task.id === overId);
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, overIndex);
      })
    }

    const isOverAColumn = over.data.current?.type === "Column";


    /* I am dropping a Task over another column */
    if (isActiveATask && isOverAColumn) { 
      setTasks(tasks => { 
        const activeIndex = tasks.findIndex(task => task.id === activeId);
        // const overIndex = tasks.findIndex(task => task.id === overId);
        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      })
    }

  }

};

export default KanBanBoard;
