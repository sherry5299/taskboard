'use client'; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskDetail({ params }) {
  const router = useRouter();
  const { id } = params;

  // 初始化狀態
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // 加入 loading 狀態

  // 儲存更新後的任務
  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description cannot be empty!"); // 基本的驗證
      return;
    }

    setLoading(true); // 儲存時顯示 loading 狀態
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 更新任務數據
    const updatedTasks = savedTasks.map((task) =>
      task.id === Number(id) ? { ...task, title, description } : task
    );

    // 更新 localStorage
    try {
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error updating tasks:", error);
      alert("An error occurred while saving the task. Please try again.");
      setLoading(false);
      return;
    }

    // 儲存後導回任務列表頁面
    setLoading(false); // 儲存完成，關閉 loading 狀態
    router.push('/');
  };

  // 在元件掛載時載入指定的任務資料
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = savedTasks.find((t) => t.id === Number(id));

    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      alert("Task not found!");
      router.push('/'); // 如果找不到任務，導回首頁
    }
  }, [id, router]);

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>

      {/* 任務標題輸入框 */}
      <input
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // 更新標題
        placeholder="Title"
      />

      {/* 任務描述輸入框 */}
      <textarea
        className="border p-2 w-full mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // 更新描述
        placeholder="Description"
        rows={4}
      />

      {/* 儲存按鈕 */}
      <button
        className={`bg-green-500 text-white px-4 py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleSave}
        disabled={loading} // 禁用按鈕，避免重複提交
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </main>
  );
}
