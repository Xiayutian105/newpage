
/* 搜索引擎 */
document.addEventListener('DOMContentLoaded', (event) => {
    function performSearch() {
        // 获取选定的搜索引擎和搜索词
        var engine = document.getElementById('engine-select').value;
        var query = document.getElementById('search-input').value;

        // 根据选择的引擎构建搜索URL
        var searchUrl;
        if (engine === 'bing') {
            searchUrl = 'https://cn.bing.com/search?q=' + encodeURIComponent(query);
        } else if (engine === 'baidu') {
            searchUrl = 'https://www.baidu.com/s?wd=' + encodeURIComponent(query);
        }

        // 如果有有效的查询字符串，则跳转到搜索URL
        if (query) {
            window.location.href = searchUrl;
        }
    }

    // 监听按钮点击事件
    document.getElementById('search-button').addEventListener('click', performSearch);

    // 监听输入框的按键事件，以支持回车键触发搜索
    document.getElementById('search-input').addEventListener('keydown', function (event) {
        // 检查是否按下了回车键（Enter键）
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});

// function handleEnter(event) {
//     if (event.key === "Enter") {
//         event.preventDefault(); // 阻止默认的表单提交行为
//         search();
//     }
// }

var Flipper = /** @class */ (function () {
    function Flipper(node, currentTime, nextTime) {
        this.isFlipping = false;
        this.duration = 600;
        this.flipNode = node;
        this.frontNode = node.querySelector(".front");
        this.backNode = node.querySelector(".back");
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
    }
    Flipper.prototype.setFrontTime = function (time) {
        this.frontNode.dataset.number = time;
    };
    Flipper.prototype.setBackTime = function (time) {
        this.backNode.dataset.number = time;
    };
    Flipper.prototype.flipDown = function (currentTime, nextTime) {
        var _this = this;
        if (this.isFlipping) {
            return false;
        }
        this.isFlipping = true;
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
        this.flipNode.classList.add("running");
        setTimeout(function () {
            _this.flipNode.classList.remove("running");
            _this.isFlipping = false;
            _this.setFrontTime(nextTime);
        }, this.duration);
    };
    return Flipper;
}());

var getTimeFromDate = function (date) {
    return date
        .toTimeString()
        .slice(0, 8)
        .split(":")
        .join("");
};

var flips = document.querySelectorAll(".flip");
var now = new Date();
var nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
var nextTimeStr = getTimeFromDate(now);
var flippers = Array.from(flips).map(function (flip, i) { return new Flipper(flip, nowTimeStr[i], nextTimeStr[i]); });
setInterval(function () {
    var now = new Date();
    var nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
    var nextTimeStr = getTimeFromDate(now);
    for (var i = 0; i < flippers.length; i++) {
        if (nowTimeStr[i] === nextTimeStr[i]) {
            continue;
        }
        flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
    }
}, 1000);

/* localstorage 网址增删改 */
// 打开模态框
function openModal() {
    document.getElementById('modal').style.display = 'block';
}

// 关闭模态框
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// 保存新网址到localStorage并更新页面
function saveUrl() {
    var name = document.getElementById('new-url-name').value.trim();
    var link = document.getElementById('new-url-link').value.trim();

    if (name && link) {
        // 定义网址的正则表达式
        var urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

        // 检查链接是否符合正则表达式
        if (urlPattern.test(link)) {
            // 创建新的网址对象
            var newUrl = { name: name, link: link };

            // 获取当前存储的网址列表
            var urls = JSON.parse(localStorage.getItem('urls')) || [];

            // 添加新网址到列表
            urls.push(newUrl);

            // 更新localStorage
            localStorage.setItem('urls', JSON.stringify(urls));

            // 清空输入框
            document.getElementById('new-url-name').value = '';
            document.getElementById('new-url-link').value = '';

            // 关闭模态框
            closeModal();

            // 更新页面上的网址列表
            loadUrls();
        } else {
            alert('请输入有效的网址');
        }
    } else {
        alert('请填写完整的名称和链接');
    }

}


// 加载并显示所有已保存的网址
function loadUrls() {
    var container = document.getElementById('firstdiv');
    var urls = JSON.parse(localStorage.getItem('urls')) || [];
    var addBox = document.getElementById('addBox');

    // 移除之前动态添加的所有网址盒子
    while (container.firstChild !== addBox) {
        container.removeChild(container.firstChild);
    }

    // 遍历urls数组并为每个网址创建一个新的盒子元素 oncontextmenu="openModal_del(); return false;
    urls.forEach(function (url, index) {
        var box = document.createElement('div');
        box.className = 'box url-box';
        box.innerHTML = `
            <a href="${url.link}" target="_blank" >
                <div class="img" >
                    <img src="${getFaviconUrl(url.link)}" alt="${url.name}" />
                </div>
            </a>
            <p>${url.name}</p>
            <button id="closeButton" class="hidden" onclick="deleteUrl(${index})">删除</button
        `;
        // 隐藏删除按钮
        //  box.querySelector('#closeButton').classList.add('hidden');
        // 添加右键点击事件监听器
        box.addEventListener('contextmenu', function (event) {
            event.preventDefault(); // 阻止默认的右键菜单
            // 显示删除按钮
            box.querySelector('#closeButton').classList.remove('hidden');
        });

        // 添加鼠标离开事件监听器，隐藏删除按钮
        box.addEventListener('mouseleave', function () {
            box.querySelector('#closeButton').classList.add('hidden');
        });
        container.insertBefore(box, addBox);
    });
}

// 尝试根据网址获取favicon URL
function getFaviconUrl(url) {
    try {
        var parser = document.createElement('a');
        parser.href = url;
        return `https://www.pctools.cc/tool/favicon/favicon.php?url=${encodeURIComponent(parser.hostname)}`;
    } catch (e) {
        return './icos/default.png'; // 默认图标路径
    }
}

// 删除指定索引处的网址
function deleteUrl(index) {
    var urls = JSON.parse(localStorage.getItem('urls')) || [];
    if (index >= 0 && index < urls.length) {
        urls.splice(index, 1);
        localStorage.setItem('urls', JSON.stringify(urls));
        loadUrls(); // 刷新页面上的网址列表
    }
}

// 初始化页面时加载已保存的网址
window.onload = function () {
    loadUrls();
};
