// 打开模态框函数
function openModal1() {
  const modal = document.getElementById('websiteModal1');
  modal.style.display = 'block';
  renderWebsites();
}

// 关闭模态框函数
function closeModal1() {
  const modal = document.getElementById('websiteModal1');
  modal.style.display = 'none';
}

// 点击模态框外部关闭
function handleModalClick(event) {
  const modal = document.getElementById('websiteModal1');
  if (event.target === modal) {
    closeModal1();
  }
}

// 渲染网址项
function renderWebsites() {
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

// 页面加载完成后初始化
window.onload = function () {
  // 初始渲染
  renderWebsites();

  // 添加模态框点击事件
  const modal = document.getElementById('websiteModal1');
  modal.onclick = handleModalClick;
};
