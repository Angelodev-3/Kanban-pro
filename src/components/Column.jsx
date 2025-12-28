import { useState } from "react";

export default function Column({ title, tasks, onMove, onDelete, onEdit }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [text, setText] = useState("");

  function startEdit(index, value) {
    setEditingIndex(index);
    setText(value);
  }

  function finishEdit(index) {
    onEdit(index, text);
    setEditingIndex(null);
  }

  function handleRightClick(e, index) {
    e.preventDefault();
    onDelete(index);
  }

  return (
    <div className="column">
      <h3>{title}</h3>

      {tasks.map((task, index) => (
        <div
          key={index}
          className="card"
          onClick={() => onMove(index)}
          onDoubleClick={() => startEdit(index, task)}
          onContextMenu={(e) => handleRightClick(e, index)}
        >
          {editingIndex === index ? (
            <input
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={() => finishEdit(index)}
              onKeyDown={(e) =>
                e.key === "Enter" && finishEdit(index)
              }
            />
          ) : (
            task
          )}
        </div>
      ))}
    </div>
  );
}
