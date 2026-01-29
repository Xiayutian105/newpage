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
