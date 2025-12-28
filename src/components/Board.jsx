import { useState, useEffect } from "react";
import Column from "./Column.jsx";

export default function Board() {
  const [newTask, setNewTask] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [columns, setColumns] = useState([
    { title: "Backlog", tasks: [] },
    { title: "Em Progresso", tasks: [] },
    { title: "Concluido", tasks: [] },
  ]);

  // 🔹 carregar apenas uma vez
  useEffect(() => {
    const saved = localStorage.getItem("kanban-columns");
    if (saved) {
      setColumns(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  // 🔹 salvar somente após carregar
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("kanban-columns", JSON.stringify(columns));
  }, [columns, loaded]);

  function addTask() {
    if (!newTask.trim()) return;

    const updated = [...columns];
    updated[0].tasks.push(newTask);

    setColumns(updated);
    setNewTask("");
  }

  function moveTask(columnIndex, taskIndex) {
    if (columnIndex >= columns.length - 1) return;

    const updated = [...columns];
    const task = updated[columnIndex].tasks.splice(taskIndex, 1)[0];
    updated[columnIndex + 1].tasks.push(task);

    setColumns(updated);
  }

  function deleteTask(columnIndex, taskIndex) {
    const updated = [...columns];
    updated[columnIndex].tasks.splice(taskIndex, 1);
    setColumns(updated);
  }

  function editTask(columnIndex, taskIndex, newText) {
    const updated = [...columns];
    updated[columnIndex].tasks[taskIndex] = newText;
    setColumns(updated);
  }

  return (
    <div className="app">
      <h2>Kanban</h2>

      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nova tarefa"
      />

      <button onClick={addTask}>Adicionar</button>

      <div className="board">
        {columns.map((column, columnIndex) => (
          <Column
            key={columnIndex}
            title={column.title}
            tasks={column.tasks}
            onMove={(taskIndex) => moveTask(columnIndex, taskIndex)}
            onDelete={(taskIndex) => deleteTask(columnIndex, taskIndex)}
            onEdit={(taskIndex, text) =>
              editTask(columnIndex, taskIndex, text)
            }
          />
        ))}
      </div>
    </div>
  );
}
