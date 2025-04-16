let websiteData = JSON.parse(localStorage.getItem('websites')) || []

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
  // 这里只是简单展示，实际农历计算需要更复杂的逻辑
  const lunarDate = "农历日期待计算";
  document.getElementById('time').textContent = formattedTime;
  document.getElementById('date-lunar').textContent = `${formattedDate}（${lunarDate}）`;
}

// 根据用户输入的关键词和选择的搜索引擎打开搜索结果页面
// https://cn.bing.com/search?q=${encodeURIComponent(keyword)}&form=QBLH&sp=-1
function search() {
  const keyword = document.getElementById('search-input').value
  const engine = document.querySelector('input[name="search-engine"]:checked').value
  const urlMap = {
    Bing: `https://www4.bing.com/search?q=${encodeURIComponent(keyword)}`,
    Wallpaper: `https://haowallpaper.com/?page=1&sortType=3&rows=9&isFavorites=false&search=${encodeURIComponent(keyword)}&isSel=true`,
    Film: `https://wld56.net/wlvodsearch/-------------.html?wd=${encodeURIComponent(keyword)}`,
    DuanJu: `https://www.duanjuwang.cc/vodsearch/-------------.html?wd=${encodeURIComponent(keyword)}`,
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