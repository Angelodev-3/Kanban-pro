export default function Card({ text, onMove, onDelete }) {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div>{text}</div>

      <div style={{ marginTop: "8px" }}>
        {onMove && <button onClick={onMove}>Avançar</button>}
        <button onClick={onDelete} style={{ marginLeft: "8px" }}>
          Excluir
        </button>
      </div>
    </div>
  );
}
