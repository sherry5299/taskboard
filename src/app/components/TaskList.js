// TaskList 元件：接收 tasks 陣列作為 props，用於顯示任務清單
export default function TaskList({ tasks }){
     return(
        // 使用無序清單顯示任務，設定垂直間距為 2 單位
        <ul className="space-y-2">
            {/* 使用 map 方法遍歷 tasks 陣列，為每個任務創建一個列表項目 */}
            {tasks.map((task, index) => (
                // 每個任務項目都是一個帶有邊框和內邊距的列表項
                <li
                  key={index} // 使用索引作為 key，在實際應用中最好使用唯一 ID
                  className="border p-2 rounded"
                  >
                    {/* 顯示任務內容 */}
                    {task}
                </li>
            ))}
        </ul>
     )
}