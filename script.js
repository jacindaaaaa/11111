// 定义变量
let timeElapsed = 0; // 当前计时时间（秒）
let timerId = null;
let totalMinutes = 0; // 总计时时间（分钟）

// 获取DOM元素
const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const sessionTime = document.querySelector('.session-time');
const totalTimeValue = document.querySelector('.time-value');
const sessionsList = document.querySelector('.sessions-list');

// 格式化时间显示
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// 更新显示时间
function updateDisplay() {
    timeDisplay.textContent = formatTime(timeElapsed);
}

// 开始计时
startButton.addEventListener('click', () => {
    if (timerId === null) {
        // 重置显示
        if (timeElapsed === 0) {
            sessionTime.textContent = '--:--';
        }
        
        timerId = setInterval(() => {
            timeElapsed++;
            updateDisplay();
        }, 1000);
        
        // 修改按钮显示状态
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
});

// 暂停计时
pauseButton.addEventListener('click', () => {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        // 修改按钮显示状态
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'inline-block';
        startButton.textContent = '继续';
    }
});

// 结束计时
stopButton.addEventListener('click', () => {
    if (timeElapsed > 0) {
        // 清除计时器
        clearInterval(timerId);
        timerId = null;
        
        // 更新本次计时显示
        sessionTime.textContent = formatTime(timeElapsed);
        
        // 更新总时间
        const minutes = Math.ceil(timeElapsed / 60);
        totalMinutes += minutes;
        totalTimeValue.textContent = totalMinutes;
        
        // 添加本次记录到列表
        const sessionItem = document.createElement('div');
        sessionItem.className = 'session-item';
        sessionItem.innerHTML = `
            <span>专注时段 ${formatTime(timeElapsed)}</span>
            <span>${new Date().toLocaleTimeString()}</span>
        `;
        sessionsList.insertBefore(sessionItem, sessionsList.firstChild);
        
        // 重置计时器和按钮状态
        timeElapsed = 0;
        updateDisplay();
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'inline-block';
        startButton.textContent = '开始';
    }
});

// 初始化显示
updateDisplay(); 