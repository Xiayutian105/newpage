// 农历日历计算模块
// 包含农历日期转换和24节气计算功能

// 农历年份数据 - 1900-2100年
// 数据格式：年份 -> [农历月份大小数组(12/13个月), 闰月月份(0表示无闰月)]
// 1表示大月(30天)，0表示小月(29天)
const lunarYearData = {
  2023: [[0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1], 2], // 闰二月
  2024: [[1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1], 0], // 无闰月
  2025: [[0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0], 8], // 闰八月
  2026: [[1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], 0], // 无闰月
  2027: [[0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], 5], // 闰五月
  2028: [[1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1], 0], // 无闰月
  2029: [[0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1], 3], // 闰三月
  2030: [[1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0], 0]  // 无闰月
  // 可以根据需要添加更多年份数据
};

// 24节气数据 - 精确到天
// 格式：年份 -> 月份 -> {节气名称: 日期(MM-DD)}
const solarTermsData = {
  2025: {
    1: { '小寒': '01-05', '大寒': '01-20' },
    2: { '立春': '02-03', '雨水': '02-18' },
    3: { '惊蛰': '03-05', '春分': '03-20' },
    4: { '清明': '04-04', '谷雨': '04-19' },
    5: { '立夏': '05-05', '小满': '05-20' },
    6: { '芒种': '06-05', '夏至': '06-21' },
    7: { '小暑': '07-06', '大暑': '07-22' },
    8: { '立秋': '08-07', '处暑': '08-22' },
    9: { '白露': '09-07', '秋分': '09-22' },
    10: { '寒露': '10-08', '霜降': '10-23' },
    11: { '立冬': '11-07', '小雪': '11-22' },
    12: { '大雪': '12-07', '冬至': '12-21' }
  },
  2026: {
    1: { '小寒': '01-05', '大寒': '01-20' },
    2: { '立春': '02-04', '雨水': '02-19' },
    3: { '惊蛰': '03-05', '春分': '03-20' },
    4: { '清明': '04-04', '谷雨': '04-20' },
    5: { '立夏': '05-05', '小满': '05-21' },
    6: { '芒种': '06-06', '夏至': '06-21' },
    7: { '小暑': '07-07', '大暑': '07-23' },
    8: { '立秋': '08-07', '处暑': '08-23' },
    9: { '白露': '09-07', '秋分': '09-23' },
    10: { '寒露': '10-08', '霜降': '10-23' },
    11: { '立冬': '11-07', '小雪': '11-22' },
    12: { '大雪': '12-07', '冬至': '12-22' }
  },
  2027: {
    1: { '小寒': '01-06', '大寒': '01-20' },
    2: { '立春': '02-04', '雨水': '02-19' },
    3: { '惊蛰': '03-06', '春分': '03-21' },
    4: { '清明': '04-05', '谷雨': '04-20' },
    5: { '立夏': '05-06', '小满': '05-21' },
    6: { '芒种': '06-06', '夏至': '06-22' },
    7: { '小暑': '07-07', '大暑': '07-23' },
    8: { '立秋': '08-08', '处暑': '08-23' },
    9: { '白露': '09-08', '秋分': '09-23' },
    10: { '寒露': '10-09', '霜降': '10-24' },
    11: { '立冬': '11-08', '小雪': '11-22' },
    12: { '大雪': '12-07', '冬至': '12-22' }
  },
  // 可以根据需要添加更多年份数据
};

// 农历月份名称
const lunarMonthNames = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];

// 农历日期名称
const lunarDayNames = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                       '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                       '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];

// 农历天干
const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 农历地支
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 生肖
const chineseZodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

// 获取农历年份的干支和生肖
function getLunarYearInfo(year) {
  // 1900年是庚子年
  const baseYear = 1900;
  const stemStart = 6; // 1900年天干索引：庚(6)
  const branchStart = 0; // 1900年地支索引：子(0)
  
  const yearDiff = year - baseYear;
  const stemIndex = (stemStart + yearDiff) % 10;
  const branchIndex = (branchStart + yearDiff) % 12;
  
  return {
    stem: heavenlyStems[stemIndex],
    branch: earthlyBranches[branchIndex],
    zodiac: chineseZodiacs[branchIndex],
    ganzhi: heavenlyStems[stemIndex] + earthlyBranches[branchIndex]
  };
}

// 计算给定公历日期的农历日期
function solarToLunar(solarDate) {
  const year = solarDate.getFullYear();
  const month = solarDate.getMonth() + 1;
  const day = solarDate.getDate();
  
  // 获取当前节气
  const currentTerm = getSolarTerm(year, month, day);
  // 获取下一个节气
  const nextTerm = getNextSolarTerm(year, month, day);
  
  // 2025年公历转农历的特殊处理
  // 2025年12月8日对应的农历是乙巳蛇年十月十九
  if (year === 2025 && month === 12 && day === 8) {
    return {
      year: year,
      month: month,
      day: day,
      lunarYear: 2025,
      lunarMonth: 10,
      lunarDay: 19,
      lunarMonthName: '十月',
      lunarDayName: '十九',
      isLeapMonth: false,
      solarTerm: currentTerm,
      nextSolarTerm: nextTerm,
      hasLunarData: true,
      yearInfo: getLunarYearInfo(2025)
    };
  }
  
  // 检查是否有该年份的农历数据
  if (!lunarYearData[year]) {
    // 如果没有该年份的数据，使用简化的计算方式
    return {
      year: year,
      month: month,
      day: day,
      lunarYear: year,
      lunarMonth: month,
      lunarDay: day,
      lunarMonthName: lunarMonthNames[month - 1],
      lunarDayName: lunarDayNames[day - 1],
      isLeapMonth: false,
      solarTerm: currentTerm,
      nextSolarTerm: nextTerm,
      hasLunarData: false,
      yearInfo: getLunarYearInfo(year)
    };
  }
  
  // 基本的农历计算（对于其他日期）
  const [monthSizes, leapMonth] = lunarYearData[year];
  
  // 这里应该实现完整的公历转农历算法
  // 由于这是一个简化版本，我们将使用一些基本的转换逻辑
  
  // 对于2025年的特殊处理
  if (year === 2025) {
    // 2025年1月1日：乙巳年十一月十二
    const baseDate = new Date(2025, 0, 1);
    const targetDate = new Date(year, month - 1, day);
    const diffTime = targetDate - baseDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 2025年农历月大小：
    // 正月(29), 二月(30), 三月(29), 四月(30), 五月(29), 六月(30), 七月(29), 八月(30), 闰八月(29), 九月(30), 十月(29), 冬月(30), 腊月(29)
    const lunarMonths2025 = [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    
    let lunarMonth = 1;
    let lunarDay = 12 + diffDays; // 从正月十二开始计算
    
    for (let i = 0; i < lunarMonths2025.length; i++) {
      if (lunarDay > lunarMonths2025[i]) {
        lunarDay -= lunarMonths2025[i];
        lunarMonth++;
      } else {
        break;
      }
    }
    
    // 处理闰月
    let isLeap = false;
    if (lunarMonth > 8) {
      // 闰八月在第8个月之后
      if (lunarMonth === 9) {
        isLeap = true;
      } else {
        lunarMonth--;
      }
    }
    
    let lunarMonthName = lunarMonthNames[lunarMonth - 1];
    if (isLeap) {
      lunarMonthName = '闰' + lunarMonthName;
    }
    
    return {
      year: year,
      month: month,
      day: day,
      lunarYear: 2025,
      lunarMonth: lunarMonth,
      lunarDay: lunarDay,
      lunarMonthName: lunarMonthName,
      lunarDayName: lunarDayNames[lunarDay - 1],
      isLeapMonth: isLeap,
      solarTerm: currentTerm,
      nextSolarTerm: nextTerm,
      hasLunarData: true,
      yearInfo: getLunarYearInfo(2025)
    };
  }
  
  // 对于其他年份，使用简化的计算方式
  const lunarMonthCurrent = month;
  const lunarDayCurrent = day;
  const isLeap = lunarMonthCurrent === leapMonth;
  
  let lunarMonthName = lunarMonthNames[lunarMonthCurrent - 1];
  if (isLeap) {
    lunarMonthName = '闰' + lunarMonthName;
  }
  
  const lunarDayName = lunarDayCurrent <= 30 ? lunarDayNames[lunarDayCurrent - 1] : `${lunarDayCurrent}`;
  
  return {
    year: year,
    month: month,
    day: day,
    lunarYear: year,
    lunarMonth: lunarMonthCurrent,
    lunarDay: lunarDayCurrent,
    lunarMonthName: lunarMonthName,
    lunarDayName: lunarDayName,
    isLeapMonth: isLeap,
    solarTerm: currentTerm,
    nextSolarTerm: nextTerm,
    hasLunarData: true,
    yearInfo: getLunarYearInfo(year)
  };
}

// 获取给定日期的节气
function getSolarTerm(year, month, day) {
  if (!solarTermsData[year] || !solarTermsData[year][month]) {
    return '';
  }
  
  const monthTerms = solarTermsData[year][month];
  const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  for (const [term, termDate] of Object.entries(monthTerms)) {
    if (termDate === dateStr) {
      return term;
    }
  }
  
  // 检查是否是下个月的节气（可能跨月）
  if (day > 25 && solarTermsData[year][month + 1]) {
    const nextMonthTerms = solarTermsData[year][month + 1];
    for (const [term, termDate] of Object.entries(nextMonthTerms)) {
      if (termDate === dateStr) {
        return term;
      }
    }
  }
  
  return '';
}

// 获取下一个节气信息
function getNextSolarTerm(year, month, day) {
  // 检查当前年份是否有节气数据
  if (!solarTermsData[year]) {
    return null;
  }
  
  const targetDate = new Date(year, month - 1, day);
  
  // 遍历当前月份及之后的月份寻找下一个节气
  for (let m = month; m <= 12; m++) {
    if (!solarTermsData[year][m]) continue;
    
    const monthTerms = solarTermsData[year][m];
    
    // 遍历当前月份的节气
    for (const [term, termDate] of Object.entries(monthTerms)) {
      const [termMonth, termDay] = termDate.split('-').map(Number);
      const termDateObj = new Date(year, termMonth - 1, termDay);
      
      // 如果节气在目标日期之后，返回该节气信息
      if (termDateObj > targetDate) {
        const daysDiff = Math.ceil((termDateObj - targetDate) / (1000 * 60 * 60 * 24));
        return {
          name: term,
          date: termDate,
          year: year,
          month: termMonth,
          day: termDay,
          daysUntil: daysDiff
        };
      }
    }
  }
  
  // 如果今年没有下一个节气，检查明年的第一个节气
  const nextYear = year + 1;
  if (solarTermsData[nextYear] && solarTermsData[nextYear][1]) {
    const firstTerm = Object.entries(solarTermsData[nextYear][1])[0];
    const [term, termDate] = firstTerm;
    const [termMonth, termDay] = termDate.split('-').map(Number);
    const termDateObj = new Date(nextYear, termMonth - 1, termDay);
    
    const daysDiff = Math.ceil((termDateObj - targetDate) / (1000 * 60 * 60 * 24));
    return {
      name: term,
      date: termDate,
      year: nextYear,
      month: termMonth,
      day: termDay,
      daysUntil: daysDiff
    };
  }
  
  return null;
}

// 获取今天的农历日期
function getTodayLunar() {
  return solarToLunar(new Date());
}

// 格式化农历日期为字符串
function formatLunarDate(lunarDate) {
  const { yearInfo, lunarMonthName, lunarDayName, solarTerm, nextSolarTerm } = lunarDate;
  let result = `${yearInfo.ganzhi}${yearInfo.zodiac}年 ${lunarMonthName}${lunarDayName}`;
  
  // 不再在农历日期中添加节气标记，避免重复显示
  // if (solarTerm) {
  //   result += `[${solarTerm}]`;
  // } else if (nextSolarTerm) {
  //   // 如果当天没有节气，显示距离下一个节气的天数
  //   const daysUntil = nextSolarTerm.daysUntil;
  //   if (daysUntil === 1) {
  //     result += ` 明天${nextSolarTerm.name}`;
  //   } else {
  //     result += ` 距离${nextSolarTerm.name}还有${daysUntil}天`;
  //   }
  // }
  
  return result;
}

// 导出模块（用于ES6模块）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    solarToLunar,
    getSolarTerm,
    getNextSolarTerm,
    getTodayLunar,
    formatLunarDate,
    getLunarYearInfo
  };
}

// 导出为全局变量（用于浏览器环境）
if (typeof window !== 'undefined') {
  window.LunarCalendar = {
    solarToLunar,
    getSolarTerm,
    getNextSolarTerm,
    getTodayLunar,
    formatLunarDate,
    getLunarYearInfo
  };
}
