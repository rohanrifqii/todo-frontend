import { Todo } from '@/types/todo';

// 1. Tambahkan tipe untuk onToggle dan onDelete
type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

// 2. Destructure prop tersebut di parameter fungsi
export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="...">
      {/* Panggil fungsi saat checkbox atau tombol diklik */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      <span>{todo.title}</span>

      <button onClick={() => onDelete(todo.id)}>Hapus</button>
    </li>
  );
}