// 打开常用网址模态框函数
function openModal1() {
  const modal = document.getElementById('websiteModal1');
  modal.style.display = 'block';
  renderWebsiteModal();
}

// 关闭常用网址模态框函数
function closeModal1() {
  const modal = document.getElementById('websiteModal1');
  modal.style.display = 'none';
}

// 打开AI网址模态框函数
function openModal2() {
  const modal = document.getElementById('websiteModal2');
  modal.style.display = 'block';
  renderAIWebsiteModal();
}

// 关闭AI网址模态框函数
function closeModal2() {
  const modal = document.getElementById('websiteModal2');
  modal.style.display = 'none';
}

// 点击模态框外部关闭
function handleModalClick(event) {
  const modal1 = document.getElementById('websiteModal1');
  const modal2 = document.getElementById('websiteModal2');
  if (event.target === modal1) {
    closeModal1();
  } else if (event.target === modal2) {
    closeModal2();
  }
}

// 渲染常用网址项到模态框
function renderWebsiteModal() {
  const websiteGrid = document.getElementById('websiteGrid1');
  websiteGrid.innerHTML = '';

  websites.forEach(website => {
    const item = document.createElement('div');
    item.className = 'website-item1';

    item.innerHTML = `
      <a href="${website.url}" class="website-url1" target="_blank">
        <i class="${website.icon}"></i> ${website.title}
      </a>
    `;

    websiteGrid.appendChild(item);
  });
}

// 渲染AI网址项到模态框
function renderAIWebsiteModal() {
  const websiteGrid = document.getElementById('websiteGrid2');
  websiteGrid.innerHTML = '';

  aiWebsites.forEach(website => {
    const item = document.createElement('div');
    item.className = 'website-item1';

    item.innerHTML = `
      <a href="${website.url}" class="website-url1" target="_blank">
        <img src="${website.icon}" alt="${website.title}图标" style="width: 16px; height: 16px; margin-right: 8px;"> ${website.title}
      </a>
    `;

    websiteGrid.appendChild(item);
  });
}

// 页面加载完成后初始化
window.onload = function () {
  // 初始渲染模态框内容
  renderWebsiteModal();

  // 添加模态框点击事件
  const modal1 = document.getElementById('websiteModal1');
  const modal2 = document.getElementById('websiteModal2');
  modal1.onclick = handleModalClick;
  modal2.onclick = handleModalClick;
};
