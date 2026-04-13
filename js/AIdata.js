// AI网址数据
const aiWebsites = [
  // ==================== 综合对话·写作大模型 ====================
  { title: "豆包", url: "https://www.doubao.com/", icon: "https://icon.bqb.cool/?url=https://www.doubao.com/" }, // 字节跳动AI助手
  // { title: "Deepseek", url: "https://chat.deepseek.com/sign_in", icon: "https://icon.bqb.cool/?url=https://chat.deepseek.com/" }, // Deepseek AI
  { title: "通义千问", url: "https://qianwen.aliyun.com/", icon: "https://icon.bqb.cool/?url=https://qianwen.aliyun.com/" }, // 阿里云AI助手
  { title: "Kimi Ai", url: "https://kimi.moonshot.cn/", icon: "https://icon.bqb.cool/?url=https://kimi.moonshot.cn/" }, // Moonshot AI助手
  { title: "扣子AI", url: "https://www.coze.cn/", icon: "https://icon.bqb.cool/?url=https://www.coze.cn/" }, // 字节跳动AI构建平台
  { title: "腾讯元宝", url: "https://yuanbao.tencent.com/", icon: "https://icon.bqb.cool/?url=https://yuanbao.tencent.com/" }, // 腾讯元宝AI
  { title: "橙篇AI", url: "https://cp.baidu.com/", icon: "https://icon.bqb.cool/?url=https://cp.baidu.com/" }, // 百度橙篇AI
  { title: "千问AI", url: "https://www.qianwen.com/", icon: "https://icon.bqb.cool/?url=https://www.qianwen.com/" }, // 阿里千问AI
  { title: "天工AI助手", url: "https://www.tiangong.cn/", icon: "https://icon.bqb.cool/?url=https://www.tiangong.cn/" }, // 天工AI助手
  { title: "智谱清言", url: "https://chatglm.cn/", icon: "https://icon.bqb.cool/?url=https://chatglm.cn/" }, // 智谱AI助手
  { title: "文心一言", url: "https://yiyan.baidu.com/", icon: "https://icon.bqb.cool/?url=https://yiyan.baidu.com/" }, // 百度AI助手
  { title: "讯飞星火", url: "https://xinghuo.xfyun.cn/", icon: "https://icon.bqb.cool/?url=https://xinghuo.xfyun.cn/" }, // 讯飞星火认知大模型
  { title: "360智脑", url: "https://chat.360.com/", icon: "https://icon.bqb.cool/?url=https://chat.360.com/" }, // 360智脑AI
  { title: "学而思九章AI", url: "https://www.mathgpt.com/", icon: "https://icon.bqb.cool/?url=https://www.mathgpt.com/" }, // 学而思九章AI大模型
  { title: "当贝AI", url: "https://ai.dangbei.com/chat", icon: "https://icon.bqb.cool/?url=https://ai.dangbei.com/chat" }, // 当贝AI
  { title: "腾讯AI智能写作", url: "https://aidoc.cnki.net/", icon: "https://icon.bqb.cool/?url=https://aidoc.cnki.net/" }, // 知网AI智能写作
  { title: "知网AI智能写作", url: "https://aidoc.cnki.net/", icon: "https://icon.bqb.cool/?url=https://aidoc.cnki.net/" }, // 知网AI智能写作
  // ==================== 教学专用AI ====================
  { title: "希沃AI", url: "https://easinote.seewo.com/", icon: "https://icon.bqb.cool/?url=https://easinote.seewo.com/" }, // 希沃AI教学
  { title: "小鸿助教", url: "https://www.xiaohongai.cn/", icon: "https://icon.bqb.cool/?url=https://www.xiaohongai.cn/" }, // 小鸿助教
  { title: "智喵学堂", url: "http://www.okstudy.net/", icon: "https://icon.bqb.cool/?url=http://www.okstudy.net/" }, // 智喵学堂
  { title: "学科网AI小博士", url: "https://www.zxxk.com/", icon: "https://icon.bqb.cool/?url=https://www.zxxk.com/" }, // 学科网AI小博士
  { title: "星火教师助手", url: "https://spark.changyan.com/", icon: "https://icon.bqb.cool/?url=https://spark.changyan.com/" }, // 星火教师助手
  { title: "飞象老师", url: "https://www.feixianglaoshi.com/#/home?featureId=20", icon: "https://icon.bqb.cool/?url=https://www.feixianglaoshi.com/#/home?featureId=20" }, // 飞象老师
  { title: "师承万象", url: "https://smartedu-bnu.tal.com/", icon: "https://icon.bqb.cool/?url=https://smartedu-bnu.tal.com/" }, // 师承万象
  { title: "匠帮", url: "https://ai.jbangai.com/", icon: "https://icon.bqb.cool/?url=https://ai.jbangai.com/" }, // 匠帮
  { title: "九章爱学", url: "https://www.laoshibang.com/apps/index", icon: "https://icon.bqb.cool/?url=https://www.laoshibang.com/apps/index" }, // 九章爱学

  // ==================== AI生图·生视频 ====================
  { title: "椒图AI", url: "https://www.jiaotuai.cn/", icon: "https://icon.bqb.cool/?url=https://www.jiaotuai.cn/" }, // 椒图AI
  { title: "即梦AI", url: "https://jimeng.jianying.com/", icon: "https://icon.bqb.cool/?url=https://jimeng.jianying.com/" }, // 即梦AI创作工具
  { title: "通义万相", url: "https://tongyi.aliyun.com/wanxiang", icon: "https://icon.bqb.cool/?url=https://tongyi.aliyun.com/wanxiang" }, // 通义万相AI图像生成
  { title: "百度画一画", url: "https://image.baidu.com/front/aigc", icon: "https://icon.bqb.cool/?url=https://image.baidu.com/front/aigc" }, // 百度画一画
  { title: "可灵AI", url: "https://klingai.com/app/", icon: "https://icon.bqb.cool/?url=https://klingai.com/" }, // 可灵AI助手
  { title: "堆友AI", url: "https://www.duiyou360.com/", icon: "https://icon.bqb.cool/?url=https://www.duiyou360.com/" }, // 堆友AI
  { title: "呜哩呜哩", url: "https://wuli.art/generate", icon: "https://icon.bqb.cool/?url=https://wuli.art/" }, // 呜哩呜哩AI
  { title: "海螺AI", url: "https://hailuo.ai/", icon: "https://icon.bqb.cool/?url=https://hailuo.ai/" }, // 海螺AI
  { title: "智谱清影AI", url: "https://chatglm.cn/", icon: "https://icon.bqb.cool/?url=https://chatglm.cn/" }, // 智谱清影AI
  { title: "腾讯混元", url: "https://hunyuan.tencent.com/", icon: "https://icon.bqb.cool/?url=https://hunyuan.tencent.com/" }, // 腾讯混元AI
  { title: "Moki AI", url: "https://www.moki.ai/", icon: "https://icon.bqb.cool/?url=https://www.moki.ai/" }, // Moki AI
  { title: "拍我 AI", url: "https://pai.video/onboard", icon: "https://icon.bqb.cool/?url=https://pai.video/onboard/" }, // Moki AI
  { title: "讯飞星辰", url: "https://agent.xfyun.cn/home", icon: "https://icon.bqb.cool/?url=https://agent.xfyun.cn/home" }, // Moki AI

  // ==================== AI生成PPT ====================
  { title: "扣子空间", url: "https://space.coze.cn/", icon: "https://icon.bqb.cool/?url=https://space.coze.cn/" }, // 扣子空间
  { title: "讯飞智文", url: "https://zhiwen.xfyun.cn/", icon: "https://icon.bqb.cool/?url=https://zhiwen.xfyun.cn/" }, // 讯飞智文
  { title: "Mindshow", url: "https://www.mindshow.ai/", icon: "https://icon.bqb.cool/?url=https://www.mindshow.ai/" }, // Mindshow AI
  { title: "islide", url: "https://www.islide.cc/", icon: "https://icon.bqb.cool/?url=https://www.islide.cc/" }, // islide AI

  // ==================== 实用工具类AI ====================
  // { title: "百度AI图片助手", url: "https://image.baidu.com/", icon: "https://icon.bqb.cool/?url=https://image.baidu.com/" }, // 百度AI图片助手
  { title: "通义听悟", url: "https://tingwu.aliyun.com/", icon: "https://icon.bqb.cool/?url=https://tingwu.aliyun.com/" }, // 通义听悟（视频转文字）
  { title: "AI抠图", url: "https://www.koukoutu.com/", icon: "https://icon.bqb.cool/?url=https://www.koukoutu.com/" }, // AI抠图工具
  { title: "AI图片变清晰", url: "https://www.designkit.com/image-enhancer", icon: "https://icon.bqb.cool/?url=https://www.designkit.com/image-enhancer" }, // AI图片增强
  { title: "AI视频去背景", url: "https://www.unscreen.com/", icon: "https://icon.bqb.cool/?url=https://www.unscreen.com/" }, // AI视频去背景
  { title: "AI图片去水印", url: "https://shuiyinyun.com/inpaint-image.html", icon: "https://icon.bqb.cool/?url=https://shuiyinyun.com/inpaint-image.html" }, // AI图片去水印
  { title: "海绵音乐AI", url: "https://haimian.com/", icon: "https://icon.bqb.cool/?url=https://haimian.com/" }, // 海绵音乐AI
  { title: "AI作诗（九歌）", url: "https://jiuge.thunlp.org/", icon: "https://icon.bqb.cool/?url=https://jiuge.thunlp.org/" }, // 九歌AI作诗
  { title: "AI太炎", url: "https://link.wenxianxue.cn/taiyan", icon: "https://icon.bqb.cool/?url=https://link.wenxianxue.cn/taiyan" }, // AI太炎

  // ==================== 其他AI工具 ====================
  { title: "Wan2.2AI", url: "https://wan22.io/zh", icon: "https://icon.bqb.cool/?url=https://wan22.io/zh" }, // Wan2.2AI助手
  { title: "Nano Banana Pro", url: "https://nanobanana.midjourrney.cn/", icon: "https://icon.bqb.cool/?url=https://nanobanana.midjourrney.cn/" }, // Nano Banana Pro AI
  //{ title: "Kling2.5", url: "https://kl-ai.co/zh", icon: "https://icon.bqb.cool/?url=https://kl-ai.co/zh" }, // Kling2.5 AI
  { title: "MindVideo", url: "https://www.mindvideo.ai/zh/mimic-motion/", icon: "https://icon.bqb.cool/?url=https://www.mindvideo.ai/zh/mimic-motion/" }, // MindVideo AI视频
  { title: "小云雀AI", url: "https://xyq.jianying.com/login", icon: "https://icon.bqb.cool/?url=https://xyq.jianying.com/login" }, // 小云雀AI创作工具
  { title: "星流AI", url: "https://www.xingliu.art/", icon: "https://icon.bqb.cool/?url=https://www.xingliu.art/" }, // 星流AI创作工具
  { title: "FastGPT", url: "https://ai.learningio.cn/", icon: "https://icon.bqb.cool/?url=https://ai.learningio.cn/" }, // FastGPT AI
  { title: "腾讯元器", url: "https://yuanqi.tencent.com/plugin-shop", icon: "https://icon.bqb.cool/?url=https://yuanqi.tencent.com/plugin-shop" } // 腾讯元器AI平台
]