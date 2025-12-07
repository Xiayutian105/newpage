// 添加错误处理，防止localStorage数据格式错误导致整个脚本失败
let websiteData = [];
try {
  websiteData = JSON.parse(localStorage.getItem('websites')) || [];
} catch (error) {
  console.error('解析localStorage数据失败:', error);
  // 如果解析失败，重置为空白数组
  websiteData = [];
  localStorage.setItem('websites', JSON.stringify(websiteData));
}

window.addEventListener('DOMContentLoaded', () => {
  updateDateTime()
  renderWebsites()
  initTouchEvents()
  setInterval(updateDateTime, 1000)

  // 回车键支持
  const searchInput = document.getElementById('search-input')
  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      search()
    }
  })
})

// 更新页面上的日期和时间显示
function updateDateTime() {
  console.log('updateDateTime函数被调用');
  
  // 确保DOM元素存在
  const timeElement = document.getElementById('time');
  
  if (!timeElement) {
    console.error('时间元素未找到');
    return;
  }
  
  const now = new Date();
  const timeOptions = {
    // 修改此处，去掉秒的显示
    hour: 'numeric',
    minute: 'numeric'
  };
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedTime = now.toLocaleTimeString('zh-CN', timeOptions);
  const formattedDate = now.toLocaleDateString('zh-CN', dateOptions);
  
  // 获取新的DOM元素
  const solarDateElement = document.getElementById('solar-date');
  const lunarDateElement = document.getElementById('lunar-date');
  const solarTermElement = document.getElementById('solar-term');
  
  // 使用农历日历模块计算农历日期和节气
  let lunarDateText = "";
  let solarTermText = "";
  
  if (typeof window.LunarCalendar !== 'undefined') {
    try {
      const lunarDate = window.LunarCalendar.getTodayLunar();
      // 分离农历日期和节气信息
      const formattedLunar = window.LunarCalendar.formatLunarDate(lunarDate);
      
      // 提取节气信息
      const solarTermMatch = formattedLunar.match(/【([^】]+)】/);
      if (solarTermMatch) {
        solarTermText = solarTermMatch[0];
        // 移除节气信息，只保留农历日期
        lunarDateText = formattedLunar.replace(/【[^】]+】/, '').trim();
      } else {
        // 检查是否有距离下一个节气的信息
        const nextTermMatch = formattedLunar.match(/距离([^还有]+)还有(\d+)天/);
        if (nextTermMatch) {
          solarTermText = formattedLunar;
          lunarDateText = formattedLunar.replace(/距离[^】]+还有\d+天/, '').trim();
        } else {
          // 检查是否有明天的节气信息
          const tomorrowTermMatch = formattedLunar.match(/明天([^】]+)/);
          if (tomorrowTermMatch) {
            solarTermText = formattedLunar;
            lunarDateText = formattedLunar.replace(/明天[^】]+/, '').trim();
          } else {
            lunarDateText = formattedLunar;
          }
        }
      }
      
      // 如果没有提取到节气信息，尝试直接获取
      if (!solarTermText) {
        const solarTerm = window.LunarCalendar.getSolarTerm(now.getFullYear(), now.getMonth() + 1, now.getDate());
        if (solarTerm) {
          solarTermText = `【${solarTerm}】`;
        } else {
          const nextTerm = window.LunarCalendar.getNextSolarTerm(now);
          if (nextTerm) {
            if (nextTerm.daysDiff === 1) {
              solarTermText = `明天${nextTerm.name}`;
            } else {
              solarTermText = `距离${nextTerm.name}还有${nextTerm.daysDiff}天`;
            }
          }
        }
      }
    } catch (error) {
      console.error('计算农历日期时出错:', error);
      lunarDateText = "农历日期计算中";
      solarTermText = "节气计算中";
    }
  } else {
    lunarDateText = "农历日期待计算";
    solarTermText = "节气待计算";
  }
  
  console.log('准备更新时间和日期:', formattedTime, formattedDate, lunarDateText, solarTermText);
  
  // 更新各个元素的内容
  timeElement.textContent = formattedTime;
  solarDateElement.textContent = formattedDate;
  lunarDateElement.textContent = lunarDateText;
  solarTermElement.textContent = solarTermText;
  
  // 添加可见性检查
  console.log('时间元素可见性:', window.getComputedStyle(timeElement).display);
  console.log('日期元素可见性:', window.getComputedStyle(dateLunarElement).display);
}

// 移除了在DOM加载前执行的setTimeout调用，改为仅在DOMContentLoaded后执行


// 根据用户输入的关键词和选择的搜索引擎打开搜索结果页面
// https://cn.bing.com/search?q=${encodeURIComponent(keyword)}&form=QBLH&sp=-1
function search() {
  const keyword = document.getElementById('search-input').value
  const engine = document.querySelector('input[name="search-engine"]:checked').value
  const urlMap = {
    Bing: `https://www4.bing.com/search?q=${encodeURIComponent(keyword)}`,
    Wallpaper: `https://haowallpaper.com/?page=1&sortType=3&rows=9&isFavorites=false&search=${encodeURIComponent(keyword)}&isSel=true`,
    Film: `https://wld56.net/wlvodsearch/-------------.html?wd=${encodeURIComponent(keyword)}`,
    DuanJu: `https://www.duanju2.com/search/-------------.html?wd=${encodeURIComponent(keyword)}`,
    Sougou: `https://www.sogou.com/web?query=${encodeURIComponent(keyword)}`
  }
  window.open(urlMap[engine], '_blank')
}

// 渲染存储的网站标签到页面上
function renderWebsites() {
  const container = document.querySelector('.website-tags');
  container.querySelectorAll('.box:not(.add-box)').forEach(el => el.remove());

  websiteData.forEach(item => {
    const box = document.createElement('div');
    box.className = 'box add-box';
    box.dataset.id = item.id;
    box.innerHTML = `
                    <a href="${item.url}" target="_blank">
                        <div class="img">
                            <img src="https://www.pctools.cc/tool/favicon/favicon.php?url=${encodeURIComponent(item.url)}" alt="图标">
                        </div>
                    </a>
                    <p>${item.name}</p>
                `;

    // PC 端鼠标右键弹出删除提示
    box.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      if (confirm(`确定要删除 ${item.name}吗？删除后请手动刷新网页`)) {
        deleteWebsite(item.id);
        renderWebsites();
      }
    });

    // 移动端长按弹出删除提示
    let longPressTimer;
    const longPressDuration = 500; // 长按时间，单位毫秒
    box.addEventListener('touchstart', function () {
      longPressTimer = setTimeout(() => {
        if (confirm(`确定要删除 ${item.name}吗？删除后请手动刷新网页`)) {
          deleteWebsite(item.id);
          renderWebsites();
        }
      }, longPressDuration);
    });

    box.addEventListener('touchend', function () {
      clearTimeout(longPressTimer);
    });

    container.insertBefore(box, document.getElementById('addBox'));
  });
}

// 显示添加网站的模态框
function openModal() {
  document.getElementById('modal').style.display = 'flex';
}

// 关闭添加网站的模态框
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// 保存用户输入的网站URL和名称，并更新本地存储和页面显示
function saveUrl() {
  const url = document.getElementById('new-url-link').value.trim()
  const name = document.getElementById('new-url-name').value.trim()

  if (!/^https?:\/\//i.test(url)) {
    alert('请输入有效的网址（需包含http://或https://）')
    return
  }

  if (name && url) {
    websiteData.push({
      id: Date.now().toString(),
      name,
      url
    })
    localStorage.setItem('websites', JSON.stringify(websiteData))
    renderWebsites()
    closeModal()
  }
}

// 根据网站ID删除相应的网站信息，并更新本地存储和页面显示
function deleteWebsite(id) {
  if (confirm('确定要删除吗？')) {
    websiteData = websiteData.filter(item => item.id !== id)
    localStorage.setItem('websites', JSON.stringify(websiteData))
    renderWebsites()
  }
}

// 初始化触摸事件处理，用于长按删除网站标签
function initTouchEvents() {
  let touchStartTime
  document.addEventListener('touchstart', e => {
    const box = e.target.closest('.box:not(.add-box)')
    if (box) {
      touchStartTime = Date.now()
      box.classList.add('active')
    }
  }, { passive: true })

  document.addEventListener('touchend', e => {
    const box = e.target.closest('.box:not(.add-box)')
    if (box) {
      box.classList.remove('active')
      if (Date.now() - touchStartTime > 800) {
        deleteWebsite(box.dataset.id)
      }
    }
  })
}

// 当点击页面空白处时关闭模态框
window.onclick = function (e) {
  if (e.target == document.getElementById('modal')) {
    closeModal()
  }
}


