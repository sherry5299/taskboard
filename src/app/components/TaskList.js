import Link from "next/link";

// TaskList 元件：接收 tasks 陣列與刪除函式作為 props，用於顯示任務清單
export default function TaskList({ tasks, onDelete }) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id} // 使用唯一 ID 作為 key
          className="border p-2 rounded flex justify-between items-center"
        >
          <Link 
            href={`/task/${task.id}`}
            className="text-blue-600 hover:underline"
          >
            {task.title} {/* 顯示任務標題 */}
          </Link>

          {/* 顯示任務描述，如果有的話 */}
          <span>{task.description}</span>

          {/* 刪除按鈕 */}
          <button
            className="text-red-500 hover:underline"
            onClick={() => onDelete(task.id)} // 傳遞 task.id 而不是 index
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
