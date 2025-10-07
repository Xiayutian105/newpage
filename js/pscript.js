let selectedBackground = 'default';

function selectBackground(type) {
    selectedBackground = type;
    
    // 移除所有背景样式的选中状态
    document.querySelectorAll('[id^="bg-"]').forEach(el => {
        el.classList.remove('bg-selected');
        el.classList.remove('border-blue-500');
        el.classList.add('border-transparent');
    });
    
    // 添加当前选中背景的样式
    const bgElement = document.getElementById(`bg-${type}`);
    bgElement.classList.add('bg-selected');
    bgElement.classList.add('border-blue-500');
    bgElement.classList.remove('border-transparent');
}

// 数字输入验证函数
function validateNumberKey(event) {
    // 允许数字和小数点
    return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 46;
}

function validateAmountInput(input) {
    const errorElement = document.getElementById('amountError');
    const originalValue = input.value;
      
    // 只允许数字和一个小数点
    const cleanedValue = originalValue.replace(/[^0-9.]/g, '');
    
    // 检查是否存在多个小数点
    const dotCount = (cleanedValue.match(/\./g) || []).length;
    let finalValue = cleanedValue;
    if (dotCount > 1) {
        finalValue = cleanedValue.slice(0, cleanedValue.lastIndexOf('.'));
    }
    
    // 先设置最终值
    input.value = finalValue;
    
    // 检查是否有非数字字符被移除（表示有错误输入）
    if (originalValue !== finalValue || (finalValue && (isNaN(finalValue) || finalValue === '.'))) {
        errorElement.classList.remove('hidden');
        // 添加输入框样式变化提示用户
        input.classList.add('border-red-500');
        input.classList.add('bg-red-50');
    } else {
        errorElement.classList.add('hidden');
        // 移除输入框错误样式
        input.classList.remove('border-red-500');
        input.classList.remove('bg-red-50');
    }
}

// 主应用逻辑
function initApp() {
    // 初始化选中默认背景
    selectBackground('default');
    
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const dropzone = document.getElementById('dropzone');
    const previewContainer = document.getElementById('previewContainer');
    const fileInfo = document.getElementById('fileInfo');
    const uploadedCount = document.getElementById('uploadedCount');
    const generateBtn = document.getElementById('generateBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultCanvas = document.getElementById('resultCanvas');
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadHeader = document.getElementById('downloadHeader');
    const copyAccountBtn = document.getElementById('copyAccountBtn');
    const accountNameInput = document.getElementById('accountNameInput');
    const copySuccess = document.getElementById('copySuccess');
    const customQrInput = document.getElementById('customQrInput');
    const customQrDropzone = document.getElementById('customQrDropzone');
    const customQrPreview = document.getElementById('customQrPreview');
    const customQrImage = document.getElementById('customQrImage');
    const removeCustomQrBtn = document.getElementById('removeCustomQrBtn');
    
    let uploadedImages = [];
    let uploadedFiles = [];
    let customQrImg = null;
    
    // 上传按钮点击事件
    uploadBtn.addEventListener('click', () => fileInput.click());
    
    // 文件选择事件
    fileInput.addEventListener('change', handleFileSelect);
    
    // 拖放区域事件
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropzone.classList.add('active');
    }
    
    function unhighlight() {
        dropzone.classList.remove('active');
    }
    
    dropzone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }
    
    function handleFiles(files) {
        if (uploadedImages.length + files.length > 15) {
            alert('最多只能上传15张图片');
            return;
        }
        
        // 添加新文件到已上传文件列表，而不是重置
        const newFiles = Array.from(files);
        uploadedFiles = [...uploadedFiles, ...newFiles];
        
        // 如果是首次上传，添加预览标题
        if (uploadedImages.length === 0) {
            previewContainer.innerHTML = '<h3 class="col-span-3 text-xl font-medium text-gray-700 mb-3">已上传图片预览</h3>';
        }
        
        let addedCount = 0;
        newFiles.forEach((file) => {
            if (!file.type.match('image.*')) {
                return;
            }
            
            addedCount++;
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.src = e.target.result;
                img.onload = function() {
                    uploadedImages.push(img);
                    addImagePreview(img, file.name);
                    
                    // 更新上传数量显示
                    uploadedCount.textContent = uploadedImages.length;
                    fileInfo.classList.remove('hidden');
                    
                    previewContainer.classList.remove('hidden');
                };
            };
            reader.readAsDataURL(file);
        });
    }
    
    function addImagePreview(img, fileName) {
        const previewItem = document.createElement('div');
        previewItem.className = 'overflow-hidden rounded-lg border border-gray-200 relative';
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxSize = 120;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // 添加文件名
        const fileNameEl = document.createElement('div');
        fileNameEl.className = 'absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate';
        fileNameEl.textContent = fileName;
        
        previewItem.appendChild(canvas);
        previewItem.appendChild(fileNameEl);
        previewContainer.appendChild(previewItem);
    }
    
    // 复制账号功能
    copyAccountBtn.addEventListener('click', function() {
        if (!accountNameInput.value.trim()) return;
        
        navigator.clipboard.writeText(accountNameInput.value.trim()).then(function() {
            copySuccess.classList.add('show');
            setTimeout(function() {
                copySuccess.classList.remove('show');
            }, 2000);
        });
    });
    
    // 自定义二维码上传处理
    customQrDropzone.addEventListener('click', () => customQrInput.click());
    
    customQrInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.match('image.*')) {
            alert('请上传图片文件');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            customQrImg = new Image();
            customQrImg.src = e.target.result;
            customQrImg.onload = function() {
                customQrImage.src = e.target.result;
                customQrPreview.classList.remove('hidden');
            };
        };
        reader.readAsDataURL(file);
    });
    
    // 移除自定义二维码
    removeCustomQrBtn.addEventListener('click', function() {
        customQrImg = null;
        customQrPreview.classList.add('hidden');
        customQrInput.value = '';
    });
    
    // 生成拼接图片
    generateBtn.addEventListener('click', function() {
        if (uploadedImages.length === 0) {
            alert('请先上传至少一张图片');
            return;
        }
        
        const amount = document.getElementById('amountInput').value.trim();
        const accountName = document.getElementById('accountNameInput').value.trim();
        const direction = document.querySelector('input[name="direction"]:checked').value;
        
        generateStitchedImage(amount, accountName, direction);
    });
    
    function generateStitchedImage(amount, accountName, direction) {
        const isVertical = direction === 'vertical';
        
        // 计算统一宽度（取所有图片中的最大宽度）
        const maxWidth = Math.max(...uploadedImages.map(img => img.width));
        
        // 计算总尺寸
        let totalWidth = 0;
        let totalHeight = 0;
        
        if (isVertical) {
            totalWidth = maxWidth;
            // 计算等宽后的总高度
            totalHeight = uploadedImages.reduce((sum, img) => {
                const ratio = maxWidth / img.width;
                return sum + img.height * ratio;
            }, 0);
        } else {
            // 水平拼接时保持高度一致（取最大高度）
            const maxHeight = Math.max(...uploadedImages.map(img => img.height));
            totalHeight = maxHeight;
            // 计算等高等宽后的总宽度
            totalWidth = uploadedImages.reduce((sum, img) => {
                const ratio = maxHeight / img.height;
                return sum + img.width * ratio;
            }, 0);
        }
        
        // 添加信息区域高度
        const infoHeight = 180;
        if (isVertical) {
            totalHeight += infoHeight;
            totalWidth = Math.max(totalWidth, 700); // 确保信息区域宽度足够
        } else {
            totalWidth += 300; // 信息区域宽度
            totalHeight = Math.max(totalHeight, infoHeight);
        }
        
        // 设置画布尺寸
        resultCanvas.width = totalWidth;
        resultCanvas.height = totalHeight;
        const ctx = resultCanvas.getContext('2d');
        
        // 填充背景
        drawBackground(ctx, totalWidth, totalHeight);
        
        // 添加信息区域和拼接图片
        if (isVertical) {
            drawVerticalLayout(ctx, totalWidth, totalHeight, maxWidth, amount, accountName, infoHeight);
        } else {
            drawHorizontalLayout(ctx, totalWidth, totalHeight, amount, accountName);
        }
        
        // 显示结果区域和下载头部
        resultContainer.classList.remove('hidden');
        downloadHeader.classList.remove('hidden');
        
        // 滚动到结果区域
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    function drawBackground(ctx, totalWidth, totalHeight) {
        switch(selectedBackground) {
            case 'pattern2':
                // 重新设计的蓝紫渐变背景
                const gradient = ctx.createLinearGradient(0, 0, 0, totalHeight);
                gradient.addColorStop(0, '#3b82f6'); // 更明亮的蓝色开始
                gradient.addColorStop(1, '#7c3aed'); // 更柔和的紫色结束
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, totalWidth, totalHeight);
                break;
            case 'pattern3':
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, totalWidth, totalHeight);
                
                // 绘制几何图案背景
                const patternSize = 20;
                for (let y = 0; y < totalHeight; y += patternSize) {
                    for (let x = 0; x < totalWidth; x += patternSize) {
                        // 蓝色点
                        ctx.beginPath();
                        ctx.arc(x, y, 1, 0, Math.PI * 2);
                        ctx.fillStyle = '#4a6cf7';
                        ctx.fill();
                        
                        // 橙色点
                        ctx.beginPath();
                        ctx.arc(x + 10, y + 10, 1, 0, Math.PI * 2);
                        ctx.fillStyle = '#ff7b25';
                        ctx.fill();
                    }
                }
                break;
            case 'pattern4':
                // 绘制网格线背景
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, totalWidth, totalHeight);
                
                const gridSize = 20;
                ctx.strokeStyle = '#e2e8f0';
                ctx.lineWidth = 1;
                
                // 绘制垂直线
                for (let x = 0; x <= totalWidth; x += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, totalHeight);
                    ctx.stroke();
                }
                
                // 绘制水平线
                for (let y = 0; y <= totalHeight; y += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(totalWidth, y);
                    ctx.stroke();
                }
                break;
            default:
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, totalWidth, totalHeight);
        }
    }
    
    function drawVerticalLayout(ctx, totalWidth, totalHeight, maxWidth, amount, accountName, infoHeight) {
        // 垂直居中布局
        const centerY = infoHeight / 2;
        
        // 计算文字总高度
        let textTotalHeight = 0;
        if (amount) textTotalHeight += 42 + 10; // 金额高度 + 间距
        if (accountName) textTotalHeight += 26 + 10; // 账号高度 + 间距
        if (accountName) textTotalHeight += 16 + 10; // AI支持文字高度 + 间距
        
        // 计算起始Y坐标，使文字区域垂直居中
        let textY = centerY - textTotalHeight / 2 + 30; // +30 是为了文字垂直居中的微调
        
        if (amount) {
            // 使用鲜艳橙色显示金额
            ctx.fillStyle = '#FF6B00';
            ctx.font = 'bold 42px Arial';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillText(`总金额: ${amount}元`, 30, textY);
            
            textY += 60;
        }
        
        if (accountName) {
            ctx.font = 'bold 26px Arial';
            ctx.fillStyle = selectedBackground === 'pattern2' ? 'white' : '#1e40af';
            ctx.shadowBlur = selectedBackground === 'pattern2' ? 2 : 0;
            ctx.shadowColor = selectedBackground === 'pattern2' ? 'rgba(0, 0, 0, 0.3)' : 'transparent';
            ctx.fillText(`收款账号: ${accountName}`, 30, textY);
            
            textY += 40;
            
            // 添加含光AI支持文字
            ctx.font = '16px Arial';
            ctx.fillStyle = selectedBackground === 'pattern2' ? 'rgba(255, 255, 255, 0.9)' : '#64748b';
            ctx.shadowBlur = 0;
            ctx.fillText('由含光+AI提供设计支持', 30, textY);
            
            textY += 30;
        }
        
        // 添加二维码（使用自定义二维码）
        if (customQrImg) {
            const qrSize = 100;
            const qrX = totalWidth - qrSize - 30;
            // 统一高度，让二维码与文字区域垂直居中对齐
            const qrY = centerY - qrSize / 2; // 与文字区域整体垂直居中对齐
            
            // 绘制自定义二维码
            ctx.strokeStyle = selectedBackground === 'pattern2' ? 'white' : '#3b82f6';
            ctx.lineWidth = 2;
            ctx.strokeRect(qrX-4, qrY-4, qrSize+8, qrSize+8);
            ctx.drawImage(customQrImg, qrX, qrY, qrSize, qrSize);
            
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = selectedBackground === 'pattern2' ? 'white' : '#3b82f6';
            ctx.fillText('扫码支付', qrX + qrSize/2 - 50, qrY + qrSize + 25);
        }
        
        // 拼接图片（从信息区域下方开始）
        let currentY = infoHeight;
        for (const img of uploadedImages) {
            const ratio = maxWidth / img.width;
            const scaledHeight = img.height * ratio;
            ctx.drawImage(img, 0, currentY, maxWidth, scaledHeight);
            currentY += scaledHeight;
        }
    }
    
    function drawHorizontalLayout(ctx, totalWidth, totalHeight, amount, accountName) {
        let currentX = 0;
        
        // 添加结算信息
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        
        // 垂直居中布局
        const infoAreaWidth = 280; // 减小信息区域宽度
        
        // 计算起始Y坐标，从上到下排列
        let textY = 30; // 顶部留出边距
        
        // 先绘制二维码
        if (customQrImg) {
            const qrSize = 100;
            const qrX = (infoAreaWidth - qrSize) / 2;
            
            // 绘制自定义二维码
            ctx.strokeStyle = selectedBackground === 'pattern2' ? 'white' : '#3b82f6';
            ctx.lineWidth = 2;
            ctx.strokeRect(qrX-4, textY-4, qrSize+8, qrSize+8);
            ctx.drawImage(customQrImg, qrX, textY, qrSize, qrSize);
            
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = selectedBackground === 'pattern2' ? 'white' : '#3b82f6';
            ctx.fillText('扫码支付', qrX + qrSize/2 - 50, textY + qrSize + 25);
            
            textY += qrSize + 60; // 增大二维码与下方文字的间距（从40改为60）
        }
        
        // 然后绘制结算信息
        if (amount) {
            // 使用鲜艳橙色显示金额
            ctx.fillStyle = '#FF6B00';
            ctx.font = 'bold 30px Arial';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fillText(`总金额: ${amount}元`, 20, textY);
            
            textY += 45;
        }
        
        if (accountName) {
            ctx.font = 'bold 22px Arial';
            ctx.fillStyle = selectedBackground === 'pattern2' ? 'white' : '#1e40af';
            ctx.shadowBlur = selectedBackground === 'pattern2' ? 2 : 0;
            ctx.shadowColor = selectedBackground === 'pattern2' ? 'rgba(0, 0, 0, 0.3)' : 'transparent';
            ctx.fillText(`收款账号:`, 20, textY);
            ctx.fillText(`${accountName}`, 20, textY + 30);
            
            textY += 60;
            
            // 添加含光AI支持文字
            ctx.font = '14px Arial';
            ctx.fillStyle = selectedBackground === 'pattern2' ? 'rgba(255, 255, 255, 0.9)' : '#64748b';
            ctx.shadowBlur = 0;
            ctx.fillText('由含光+AI提供设计支持', 20, textY);
        }
        
        // 拼接图片（从信息区域右侧开始）
        currentX = infoAreaWidth;
        const maxHeight = Math.max(...uploadedImages.map(img => img.height));
        
        for (const img of uploadedImages) {
            const ratio = maxHeight / img.height;
            const scaledWidth = img.width * ratio;
            ctx.drawImage(img, currentX, 0, scaledWidth, maxHeight);
            currentX += scaledWidth;
        }
    }
    
    // 下载图片，增强对移动设备的支持
    function downloadImage() {
        if (!uploadedImages.length) return;
        
        try {
            const link = document.createElement('a');
            link.download = '账单拼接_' + new Date().toISOString().slice(0, 10) + '.png';
            link.href = resultCanvas.toDataURL('image/png');
            
            // 增强移动设备支持
            if (navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/i)) {
                // 对于iOS设备，添加图片到DOM并触发点击
                link.style.display = 'none';
                document.body.appendChild(link);
                
                // 使用延迟确保DOM元素已添加
                setTimeout(() => {
                    link.click();
                    document.body.removeChild(link);
                }, 100);
            } else {
                link.click();
            }
        } catch (error) {
            console.error('下载图片失败:', error);
            // 添加提示，告诉用户可以长按图片保存
            alert('下载功能暂时不可用，请尝试长按图片并选择保存选项。');
        }
    }
    
    // 下载按钮点击事件
    downloadBtn.addEventListener('click', downloadImage);
    
    // 为结果图片添加手机端长按下载功能
    let longPressTimer;
    
    // 触摸开始事件
    resultCanvas.addEventListener('touchstart', function(e) {
        // 防止默认行为（如页面滚动）
        e.preventDefault();
        
        // 设置长按计时器（500ms）
        longPressTimer = setTimeout(function() {
            // 显示长按提示
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            
            // 创建并显示长按提示
            const longPressHint = document.createElement('div');
            longPressHint.id = 'longPressHint';
            longPressHint.className = 'fixed px-4 py-2 bg-black bg-opacity-70 text-white rounded-md text-sm z-50';
            longPressHint.style.left = touchX + 10 + 'px';
            longPressHint.style.top = touchY - 30 + 'px';
            longPressHint.textContent = '正在下载图片...';
            document.body.appendChild(longPressHint);
            
            // 触发下载
            downloadImage();
            
            // 2秒后移除提示
            setTimeout(function() {
                if (document.getElementById('longPressHint')) {
                    document.body.removeChild(document.getElementById('longPressHint'));
                }
            }, 2000);
        }, 500); // 长按时间阈值：500毫秒
    }, { passive: false });
    
    // 触摸结束或移动事件（取消长按）
    resultCanvas.addEventListener('touchend', function() {
        clearTimeout(longPressTimer);
    });
    
    resultCanvas.addEventListener('touchmove', function() {
        clearTimeout(longPressTimer);
    });
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);