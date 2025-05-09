'use client'; // 告訴 Next.js 這是客戶端元件，允許使用 useState 等 hooks

import { useState, useEffect } from "react"; // 引入 useState，用於狀態管理
import TaskList from "./components/TaskList"; // 引入 TaskList 子元件來顯示任務清單

// 預設匯出 Home 元件
export default function Home() {
  // tasks: 任務清單陣列狀態，初始為空陣列
  const [tasks, setTasks] = useState([]);

  // newTask: 使用者目前輸入的任務內容
  const [newTask, setNewTask] = useState('');

  // nextId: 用來生成唯一的任務 ID
  const [nextId, setNextId] = useState(1);

  // 從 localStorage 加載任務和最大 ID
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);

    // 計算現有任務的最大 ID，並設置 nextId
    const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id), 0);
    setNextId(maxId + 1); // 設置 nextId 為最大 ID + 1

    console.log("Loaded tasks from localStorage: ", savedTasks); // 加載任務後的 log
  }, []); // 空依賴陣列，只有在組件掛載時運行

  // 當使用者點擊 "Add" 按鈕時呼叫的函式
  const addTask = () => {
    if (!newTask.trim()) {
      return; // 若輸入框為空，則不做任何事情
    }

    console.log("Before adding task: ", tasks); // 顯示新增前的任務列表
    console.log("New task title: ", newTask); // 顯示目前輸入的任務

    const newTaskObj = {
      id: nextId, // 新任務的 ID
      title: newTask, // 任務標題
      description: '', // 任務描述
    };

    // 建立一個新的陣列，加入新的任務
    const updatedTasks = [...tasks, newTaskObj];

    // 更新任務清單狀態
    setTasks(updatedTasks);

    // 更新 localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // 更新 nextId 為下一個 ID
    setNextId(nextId + 1);

    console.log("After adding task: ", updatedTasks); // 顯示更新後的任務列表

    // 清空輸入框
    setNewTask('');
  };

  // 處理刪除任務，根據任務 ID 刪除
  const handleDelete = (id) => {
    console.log("Before deleting task with ID:", id); // 顯示刪除前的任務 ID

    // 過濾掉被刪除的任務
    const newTasks = tasks.filter(task => task.id !== id); 

    // 更新狀態，刪除任務
    setTasks(newTasks); 

    // 更新 localStorage
    localStorage.setItem('tasks', JSON.stringify(newTasks));

    console.log("After deleting task: ", newTasks); // 顯示刪除後的任務列表
  };

  // 畫面內容（JSX）
  return (
    <main className="p-4 max-w-md mx-auto">
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
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </main>
  );
}
