'use client'; // 告訴 Next.js 這是客戶端元件，允許使用 useState 等 hooks

import Image from "next/image"; // 雖然沒使用到 Image，但可用於優化圖片（目前可移除）
import { useState } from "react"; // 引入 useState，用於狀態管理
import TaskList from "./components/TaskList"; // 引入 TaskList 子元件來顯示任務清單

// 預設匯出 Home 元件
export default function Home() {
  // tasks: 任務清單陣列狀態，初始為空陣列
  // setTasks: 用來更新 tasks 的函式
  const [tasks, setTasks] = useState([]);

  // newTask: 使用者目前輸入的任務內容
  // setNewTask: 更新 newTask 的函式
  const [newTask, setNewTask] = useState('');

  // 當使用者點擊 "Add" 按鈕時呼叫的函式
  const addTask = () => {
    console.log("Before: ", tasks); // 顯示新增前的任務列表
    console.log("NewTask: ", newTask); // 顯示目前輸入的任務

    // 建立一個新的陣列，加入新的任務
    const updatedTasks = [...tasks, newTask];

    // 更新任務清單狀態
    setTasks(updatedTasks);

    console.log("After: ", updatedTasks); // 顯示更新後的任務列表

    // 清空輸入框
    setNewTask('');
  };

  // 畫面內容（JSX）
  return (
    <main className="p-4">
      {/* 標題 */}
      <h1 className="text-2xl font-bold">Task Board</h1>

      {/* 輸入區塊：包含輸入框與新增按鈕 */}
      <div className="flex gap-2 mb-4">
        {/* 任務輸入框 */}
        <input
          className="border p-2 flex-1"
          placeholder="Enter a task" // 輸入框提示文字
          value={newTask} // 綁定輸入值
          onChange={(e) => setNewTask(e.target.value)} // 輸入時更新狀態
        />

        {/* 新增按鈕 */}
        <button
          className="bg-blue-500 text-white px-4"
          onClick={addTask} // 點擊後呼叫 addTask 函式
        >
          Add
        </button>
      </div>

      {/* 任務清單顯示區塊，使用 TaskList 元件並傳入 tasks 作為 props */}
      <TaskList tasks={tasks} />
    </main>
  );
}
