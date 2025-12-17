import { ArrowLeft, Filter, TrendingUp, PieChart as PieChartIcon, Calendar, BarChart2 } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart } from 'recharts';

interface ChartDetailViewProps {
  language: 'en' | 'ar';
  chartType: 'studyTime' | 'performance' | 'deadlines';
  onNavigateBack: () => void;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];

const COURSE_COLORS: { [key: string]: string } = {
  'Operating Systems': '#3B82F6',
  'Database Systems': '#8B5CF6',
  'Software Engineering': '#EC4899',
  'Computer Networks': '#10B981',
  'Algorithm Analysis': '#F59E0B',
  'UI Design': '#EF4444',
  'نظم التشغيل': '#3B82F6',
  'قواعد البيانات': '#8B5CF6',
  'هندسة البرمجيات': '#EC4899',
  'شبكات الحاسب': '#10B981',
  'تحليل الخوارزميات': '#F59E0B',
  'تصميم واجهات المستخدم': '#EF4444',
};

export function ChartDetailView({ language, chartType, onNavigateBack }: ChartDetailViewProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [themeColors, setThemeColors] = useState<any>(null);

  useEffect(() => {
    const updateThemeColors = () => {
      if (typeof window === 'undefined') return;
      
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      
      const isDark = root.hasAttribute('data-theme') 
        ? root.getAttribute('data-theme') === 'dark'
        : root.classList.contains('dark');

      setThemeColors({
        background: styles.getPropertyValue('--background').trim() || (isDark ? '#0B1020' : '#ffffff'),
        card: styles.getPropertyValue('--card').trim() || (isDark ? '#121A2F' : '#ffffff'),
        foreground: styles.getPropertyValue('--foreground').trim() || (isDark ? '#EAF0FF' : '#1f2937'),
        mutedForeground: styles.getPropertyValue('--muted-foreground').trim() || (isDark ? 'rgba(234, 240, 255, 0.70)' : '#6b7280'),
        border: styles.getPropertyValue('--border').trim() || (isDark ? 'rgba(255, 255, 255, 0.10)' : '#e5e7eb'),
        secondary: styles.getPropertyValue('--secondary').trim() || (isDark ? '#18223A' : '#f3f4f6'),
        isDark: isDark,
      });
    };
    
    updateThemeColors();
    
    const observer = new MutationObserver(updateThemeColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class']
    });
    
    return () => observer.disconnect();
  }, []);

  const t = {
    en: {
      backToDashboard: 'Back to Dashboard',
      studyTime: 'Study Time Analytics',
      performance: 'Performance Analytics',
      deadlines: 'Deadlines Analytics',
      courseFilter: 'Course',
      levelFilter: 'Level',
      allCourses: 'All Courses',
      allLevels: 'All Levels',
      hours: 'Hours',
      score: 'Score',
      level: 'Level',
      course: 'Course',
      count: 'Count',
      viewingData: 'Viewing detailed analytics with real-time filters',
      studyTimeByCoursesTitle: 'Study Time by Course',
      weeklyTrendTitle: 'Weekly Study Time Trend',
      distributionTitle: 'Study Time Distribution',
      performanceByLevelTitle: 'Performance by Level',
      performanceOverTimeTitle: 'Performance Over Time',
      performanceByCoursesTitle: 'Performance Comparison by Course',
      deadlinesOverviewTitle: 'Deadlines Overview',
      deadlinesTimelineTitle: 'Upcoming Deadlines Timeline',
      urgencyBreakdownTitle: 'Deadline Urgency Breakdown',
      week: 'Week',
      percentage: '%',
      dueToday: 'Due Today',
      dueThisWeek: 'Due This Week',
      dueLater: 'Due Later',
      daysUntilDue: 'Days Until Due',
      grade: 'Grade',
    },
    ar: {
      backToDashboard: 'العودة للوحة الرئيسية',
      studyTime: 'تحليلات وقت الدراسة',
      performance: 'تحليلات الأداء',
      deadlines: 'تحليلات المواعيد',
      courseFilter: 'المادة',
      levelFilter: 'المستوى',
      allCourses: 'جميع المواد',
      allLevels: 'جميع المستويات',
      hours: 'ساعات',
      score: 'الدرجة',
      level: 'المستوى',
      course: 'المادة',
      count: 'العدد',
      viewingData: 'عرض التحليلات التفصيلية مع فلاتر مباشرة',
      studyTimeByCoursesTitle: 'وقت الدراسة حسب المادة',
      weeklyTrendTitle: 'اتجاه وقت الدراسة الأسبوعي',
      distributionTitle: 'توزيع وقت الدراسة',
      performanceByLevelTitle: 'الأداء حسب المستوى',
      performanceOverTimeTitle: 'الأداء عبر الوقت',
      performanceByCoursesTitle: 'مقارنة الأداء حسب المادة',
      deadlinesOverviewTitle: 'نظرة عامة على المواعيد',
      deadlinesTimelineTitle: 'الجدول الزمني للمواعيد القادمة',
      urgencyBreakdownTitle: 'تصنيف المواعيد حسب الإلحاح',
      week: 'الأسبوع',
      percentage: '%',
      dueToday: 'اليوم',
      dueThisWeek: 'هذا الأسبوع',
      dueLater: 'لاحقاً',
      daysUntilDue: 'أيام حتى الموعد',
      grade: 'الدرجة',
    },
  };

  const courses = [
    { value: 'all', label: t[language].allCourses },
    { value: 'cs301', label: language === 'en' ? 'Operating Systems' : 'نظم التشغيل', level: 'level3' },
    { value: 'cs302', label: language === 'en' ? 'Database Systems' : 'قواعد البيانات', level: 'level3' },
    { value: 'cs303', label: language === 'en' ? 'Software Engineering' : 'هندسة البرمجيات', level: 'level4' },
    { value: 'cs304', label: language === 'en' ? 'Computer Networks' : 'شبكات الحاسب', level: 'level4' },
    { value: 'cs305', label: language === 'en' ? 'Algorithm Analysis' : 'تحليل الخوارزميات', level: 'level5' },
    { value: 'cs306', label: language === 'en' ? 'UI Design' : 'تصميم واجهات المستخدم', level: 'level5' },
  ];

  const levels = [
    { value: 'all', label: t[language].allLevels },
    { value: 'level1', label: 'Level 1' },
    { value: 'level2', label: 'Level 2' },
    { value: 'level3', label: 'Level 3' },
    { value: 'level4', label: 'Level 4' },
    { value: 'level5', label: 'Level 5' },
  ];

  const fullStudyTimeData = [
    { course: 'cs301', name: language === 'en' ? 'Operating Systems' : 'نظم التشغيل', hours: 45, level: 'level3' },
    { course: 'cs302', name: language === 'en' ? 'Database Systems' : 'قواعد البيانات', hours: 38, level: 'level3' },
    { course: 'cs303', name: language === 'en' ? 'Software Engineering' : 'هندسة البرمجيات', hours: 52, level: 'level4' },
    { course: 'cs304', name: language === 'en' ? 'Computer Networks' : 'شبكات الحاسب', hours: 35, level: 'level4' },
    { course: 'cs305', name: language === 'en' ? 'Algorithm Analysis' : 'تحليل الخوارزميات', hours: 48, level: 'level5' },
    { course: 'cs306', name: language === 'en' ? 'UI Design' : 'تصميم واجهات المستخدم', hours: 30, level: 'level5' },
  ];

  const fullWeeklyTrendData = [
    { week: `${t[language].week} 1`, cs301: 8, cs302: 6, cs303: 9, cs304: 5, cs305: 7, cs306: 4 },
    { week: `${t[language].week} 2`, cs301: 9, cs302: 7, cs303: 10, cs304: 6, cs305: 8, cs306: 5 },
    { week: `${t[language].week} 3`, cs301: 10, cs302: 8, cs303: 11, cs304: 7, cs305: 9, cs306: 6 },
    { week: `${t[language].week} 4`, cs301: 8, cs302: 7, cs303: 9, cs304: 6, cs305: 8, cs306: 5 },
    { week: `${t[language].week} 5`, cs301: 10, cs302: 10, cs303: 13, cs304: 11, cs305: 16, cs306: 10 },
  ];

  const fullPerformanceByLevelData = [
    { level: 'Level 1', score: 85, name: 'Level 1' },
    { level: 'Level 2', score: 88, name: 'Level 2' },
    { level: 'Level 3', score: 90, name: 'Level 3' },
    { level: 'Level 4', score: 87, name: 'Level 4' },
    { level: 'Level 5', score: 92, name: 'Level 5' },
  ];

  const fullPerformanceOverTimeData = [
    { month: language === 'en' ? 'Sep' : 'سبتمبر', cs301: 82, cs302: 80, cs303: 85, cs304: 78, cs305: 88, cs306: 83 },
    { month: language === 'en' ? 'Oct' : 'أكتوبر', cs301: 85, cs302: 83, cs303: 87, cs304: 82, cs305: 90, cs306: 85 },
    { month: language === 'en' ? 'Nov' : 'نوفمبر', cs301: 88, cs302: 86, cs303: 90, cs304: 85, cs305: 92, cs306: 88 },
    { month: language === 'en' ? 'Dec' : 'ديسمبر', cs301: 90, cs302: 89, cs303: 92, cs304: 87, cs305: 94, cs306: 90 },
  ];

  const fullPerformanceByCourseData = [
    { course: 'cs301', name: language === 'en' ? 'Operating Systems' : 'نظم التشغيل', grade: 90, level: 'level3' },
    { course: 'cs302', name: language === 'en' ? 'Database Systems' : 'قواعد البيانات', grade: 89, level: 'level3' },
    { course: 'cs303', name: language === 'en' ? 'Software Engineering' : 'هندسة البرمجيات', grade: 92, level: 'level4' },
    { course: 'cs304', name: language === 'en' ? 'Computer Networks' : 'شبكات الحاسب', grade: 87, level: 'level4' },
    { course: 'cs305', name: language === 'en' ? 'Algorithm Analysis' : 'تحليل الخوارزميات', grade: 94, level: 'level5' },
    { course: 'cs306', name: language === 'en' ? 'UI Design' : 'تصميم واجهات المستخدم', grade: 90, level: 'level5' },
  ];

  const fullDeadlinesData = [
    { course: 'cs301', name: language === 'en' ? 'Operating Systems' : 'نظم التشغيل', value: 3, daysUntil: 2, level: 'level3' },
    { course: 'cs302', name: language === 'en' ? 'Database Systems' : 'قواعد البيانات', value: 2, daysUntil: 5, level: 'level3' },
    { course: 'cs303', name: language === 'en' ? 'Software Engineering' : 'هندسة البرمجيات', value: 4, daysUntil: 1, level: 'level4' },
    { course: 'cs304', name: language === 'en' ? 'Computer Networks' : 'شبكات الحاسب', value: 1, daysUntil: 10, level: 'level4' },
    { course: 'cs305', name: language === 'en' ? 'Algorithm Analysis' : 'تحليل الخوارزميات', value: 2, daysUntil: 7, level: 'level5' },
    { course: 'cs306', name: language === 'en' ? 'UI Design' : 'تصميم واجهات المستخدم', value: 3, daysUntil: 3, level: 'level5' },
  ];

  const filteredData = useMemo(() => {
    let courseFiltered = selectedCourse === 'all' 
      ? courses.filter(c => c.value !== 'all')
      : [courses.find(c => c.value === selectedCourse)!];

    if (selectedLevel !== 'all') {
      courseFiltered = courseFiltered.filter(c => c.level === selectedLevel);
    }

    const selectedCourseCodes = courseFiltered.map(c => c.value);
    const studyTimeData = fullStudyTimeData.filter(item => selectedCourseCodes.includes(item.course));

    const weeklyTrendData = fullWeeklyTrendData.map(week => {
      const filtered: any = { week: week.week };
      selectedCourseCodes.forEach(code => {
        filtered[code] = week[code as keyof typeof week] as number;
      });
      return filtered;
    });

    const totalHours = studyTimeData.reduce((sum, item) => sum + item.hours, 0);
    const distributionData = studyTimeData.map(item => ({
      ...item,
      percentage: totalHours > 0 ? Math.round((item.hours / totalHours) * 100) : 0,
    }));

    const performanceByLevelData = selectedLevel === 'all'
      ? fullPerformanceByLevelData
      : fullPerformanceByLevelData.filter(item => item.level.toLowerCase().replace(' ', '') === selectedLevel);

    const performanceOverTimeData = fullPerformanceOverTimeData.map(month => {
      const filtered: any = { month: month.month };
      selectedCourseCodes.forEach(code => {
        filtered[code] = month[code as keyof typeof month] as number;
      });
      return filtered;
    });

    const performanceByCourseData = fullPerformanceByCourseData.filter(item => selectedCourseCodes.includes(item.course));
    const deadlinesData = fullDeadlinesData.filter(item => selectedCourseCodes.includes(item.course));
    const deadlinesTimelineData = [...deadlinesData].sort((a, b) => a.daysUntil - b.daysUntil);

    const dueToday = deadlinesData.filter(d => d.daysUntil <= 1).reduce((sum, d) => sum + d.value, 0);
    const dueThisWeek = deadlinesData.filter(d => d.daysUntil > 1 && d.daysUntil <= 7).reduce((sum, d) => sum + d.value, 0);
    const dueLater = deadlinesData.filter(d => d.daysUntil > 7).reduce((sum, d) => sum + d.value, 0);

    const urgencyBreakdownData = [
      { name: t[language].dueToday, value: dueToday, color: '#EF4444' },
      { name: t[language].dueThisWeek, value: dueThisWeek, color: '#F59E0B' },
      { name: t[language].dueLater, value: dueLater, color: '#10B981' },
    ].filter(item => item.value > 0);

    return {
      studyTimeData,
      weeklyTrendData,
      distributionData,
      performanceByLevelData,
      performanceOverTimeData,
      performanceByCourseData,
      deadlinesData,
      deadlinesTimelineData,
      urgencyBreakdownData,
      selectedCourseCodes,
      courseFiltered,
    };
  }, [selectedCourse, selectedLevel, language]);

  const getChartTitle = () => {
    switch (chartType) {
      case 'studyTime':
        return t[language].studyTime;
      case 'performance':
        return t[language].performance;
      case 'deadlines':
        return t[language].deadlines;
    }
  };

  const getChartStyles = () => {
    if (!themeColors) return {
      gridColor: '#374151',
      axisColor: '#9CA3AF',
      textColor: '#9CA3AF',
      tooltipBg: '#1F2937',
      tooltipBorder: '#374151',
      tooltipText: '#F3F4F6',
    };

    return {
      gridColor: themeColors.isDark ? '#374151' : '#e5e7eb',
      axisColor: themeColors.mutedForeground || '#9CA3AF',
      textColor: themeColors.mutedForeground || '#9CA3AF',
      tooltipBg: themeColors.card || '#1F2937',
      tooltipBorder: themeColors.border || '#374151',
      tooltipText: themeColors.foreground || '#F3F4F6',
    };
  };

  const chartStyles = getChartStyles();

  const renderStudyTimeCharts = () => (
    <>
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
            <BarChart2 size={20} />
          </div>
          <h3 className="text-xl text-foreground">{t[language].studyTimeByCoursesTitle}</h3>
          <span className="ml-auto text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {language === 'en' ? 'Column Chart' : 'مخطط عمودي'}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredData.studyTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridColor} />
            <XAxis dataKey="name" stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} />
            <YAxis stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} label={{ value: t[language].hours, angle: -90, position: 'insideLeft', fill: chartStyles.textColor }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: chartStyles.tooltipBg,
                border: `1px solid ${chartStyles.tooltipBorder}`,
                borderRadius: '12px',
                padding: '12px',
                color: chartStyles.tooltipText
              }}
              labelStyle={{ color: chartStyles.tooltipText }}
              itemStyle={{ color: chartStyles.tooltipText }}
            />
            <Legend wrapperStyle={{ color: chartStyles.textColor }} />
            <Bar dataKey="hours" fill="#3B82F6" radius={[8, 8, 0, 0]} name={t[language].hours} animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-xl text-foreground">{t[language].weeklyTrendTitle}</h3>
          <span className="ml-auto text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {language === 'en' ? 'Line Chart' : 'مخطط خطي'}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData.weeklyTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridColor} />
            <XAxis dataKey="week" stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} />
            <YAxis stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} label={{ value: t[language].hours, angle: -90, position: 'insideLeft', fill: chartStyles.textColor }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: chartStyles.tooltipBg,
                border: `1px solid ${chartStyles.tooltipBorder}`,
                borderRadius: '12px',
                padding: '12px',
                color: chartStyles.tooltipText
              }}
              labelStyle={{ color: chartStyles.tooltipText }}
              itemStyle={{ color: chartStyles.tooltipText }}
            />
            <Legend wrapperStyle={{ color: chartStyles.textColor }} />
            {filteredData.selectedCourseCodes.map((code, idx) => {
              const courseName = courses.find(c => c.value === code)?.label || code;
              const color = COURSE_COLORS[courseName] || COLORS[idx % COLORS.length];
              return (
                <Line key={code} type="monotone" dataKey={code} stroke={color} strokeWidth={3} dot={{ fill: color, r: 5 }} name={courseName} animationDuration={800} />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white">
            <PieChartIcon size={20} />
          </div>
          <h3 className="text-xl text-foreground">{t[language].distributionTitle}</h3>
          <span className="ml-auto text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {language === 'en' ? 'Doughnut Chart' : 'مخطط دائري مفرغ'}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={filteredData.distributionData} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => `${name} ${percentage}%`} outerRadius={130} innerRadius={70} fill="#8884d8" dataKey="hours" animationDuration={800}>
              {filteredData.distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COURSE_COLORS[entry.name] || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: chartStyles.tooltipBg,
                border: `1px solid ${chartStyles.tooltipBorder}`,
                borderRadius: '12px',
                padding: '12px',
                color: chartStyles.tooltipText
              }}
              labelStyle={{ color: chartStyles.tooltipText }}
              itemStyle={{ color: chartStyles.tooltipText }}
            />
            <Legend wrapperStyle={{ color: chartStyles.textColor }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  const renderPerformanceCharts = () => (
    <>
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-xl text-foreground">{t[language].performanceOverTimeTitle}</h3>
          <span className="ml-auto text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {language === 'en' ? 'Area Chart' : 'مخطط منطقة'}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={filteredData.performanceOverTimeData}>
            <defs>
              {filteredData.selectedCourseCodes.map((code, idx) => {
                const courseName = courses.find(c => c.value === code)?.label || code;
                const color = COURSE_COLORS[courseName] || COLORS[idx % COLORS.length];
                return (
                  <linearGradient key={code} id={`color${code}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
                  </linearGradient>
                );
              })}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridColor} />
            <XAxis dataKey="month" stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} />
            <YAxis stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} domain={[70, 100]} label={{ value: t[language].score, angle: -90, position: 'insideLeft', fill: chartStyles.textColor }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: chartStyles.tooltipBg,
                border: `1px solid ${chartStyles.tooltipBorder}`,
                borderRadius: '12px',
                padding: '12px',
                color: chartStyles.tooltipText
              }}
              labelStyle={{ color: chartStyles.tooltipText }}
              itemStyle={{ color: chartStyles.tooltipText }}
            />
            <Legend wrapperStyle={{ color: chartStyles.textColor }} />
            {filteredData.selectedCourseCodes.map((code, idx) => {
              const courseName = courses.find(c => c.value === code)?.label || code;
              const color = COURSE_COLORS[courseName] || COLORS[idx % COLORS.length];
              return <Area key={code} type="monotone" dataKey={code} stroke={color} strokeWidth={2} fill={`url(#color${code})`} name={courseName} animationDuration={800} />;
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
            <BarChart2 size={20} />
          </div>
          <h3 className="text-xl text-foreground">{t[language].performanceByCoursesTitle}</h3>
          <span className="ml-auto text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {language === 'en' ? 'Bar Chart' : 'مخطط شريطي'}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredData.performanceByCourseData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridColor} />
            <XAxis dataKey="name" stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} />
            <YAxis stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} domain={[70, 100]} label={{ value: t[language].grade, angle: -90, position: 'insideLeft', fill: chartStyles.textColor }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: chartStyles.tooltipBg,
                border: `1px solid ${chartStyles.tooltipBorder}`,
                borderRadius: '12px',
                padding: '12px',
                color: chartStyles.tooltipText
              }}
              labelStyle={{ color: chartStyles.tooltipText }}
              itemStyle={{ color: chartStyles.tooltipText }}
            />
            <Legend wrapperStyle={{ color: chartStyles.textColor }} />
            <Bar dataKey="grade" fill="#10B981" radius={[8, 8, 0, 0]} name={t[language].grade} animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-xl text-foreground">
            {language === 'en' ? 'Performance vs Study Time' : 'الأداء مقابل وقت الدراسة'}
          </h3>
          <span className="ml-auto text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {language === 'en' ? 'Combo Chart' : 'مخطط مركب'}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={filteredData.performanceByCourseData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridColor} />
            <XAxis dataKey="name" stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} />
            <YAxis yAxisId="left" stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} domain={[70, 100]} label={{ value: t[language].grade, angle: -90, position: 'insideLeft', fill: chartStyles.textColor }} />
            <YAxis yAxisId="right" orientation="right" stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} label={{ value: t[language].hours, angle: 90, position: 'insideRight', fill: chartStyles.textColor }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: chartStyles.tooltipBg,
                border: `1px solid ${chartStyles.tooltipBorder}`,
                borderRadius: '12px',
                padding: '12px',
                color: chartStyles.tooltipText
              }}
              labelStyle={{ color: chartStyles.tooltipText }}
              itemStyle={{ color: chartStyles.tooltipText }}
            />
            <Legend wrapperStyle={{ color: chartStyles.textColor }} />
            <Bar yAxisId="left" dataKey="grade" fill="#8B5CF6" radius={[8, 8, 0, 0]} name={t[language].grade} animationDuration={800} />
            <Line yAxisId="right" type="monotone" dataKey="hours" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', r: 5 }} name={t[language].hours} animationDuration={800} data={filteredData.studyTimeData} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  const renderDeadlinesCharts = () => (
    <>
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white">
            <PieChartIcon size={20} />
          </div>
          <h3 className="text-xl text-foreground">{t[language].deadlinesOverviewTitle}</h3>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={filteredData.deadlinesData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={120} fill="#8884d8" dataKey="value" animationDuration={800}>
              {filteredData.deadlinesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COURSE_COLORS[entry.name] || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: chartStyles.tooltipBg,
                border: `1px solid ${chartStyles.tooltipBorder}`,
                borderRadius: '12px',
                padding: '12px',
                color: chartStyles.tooltipText
              }}
              labelStyle={{ color: chartStyles.tooltipText }}
              itemStyle={{ color: chartStyles.tooltipText }}
            />
            <Legend wrapperStyle={{ color: chartStyles.textColor }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
            <Calendar size={20} />
          </div>
          <h3 className="text-xl text-foreground">{t[language].deadlinesTimelineTitle}</h3>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredData.deadlinesTimelineData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridColor} />
            <XAxis type="number" stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} label={{ value: t[language].daysUntilDue, position: 'insideBottom', offset: -5, fill: chartStyles.textColor }} />
            <YAxis type="category" dataKey="name" stroke={chartStyles.axisColor} tick={{ fill: chartStyles.textColor }} width={150} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: chartStyles.tooltipBg,
                border: `1px solid ${chartStyles.tooltipBorder}`,
                borderRadius: '12px',
                padding: '12px',
                color: chartStyles.tooltipText
              }}
              labelStyle={{ color: chartStyles.tooltipText }}
              itemStyle={{ color: chartStyles.tooltipText }}
            />
            <Legend wrapperStyle={{ color: chartStyles.textColor }} />
            <Bar dataKey="daysUntil" fill="#F59E0B" radius={[0, 8, 8, 0]} name={t[language].daysUntilDue} animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white">
            <PieChartIcon size={20} />
          </div>
          <h3 className="text-xl text-foreground">{t[language].urgencyBreakdownTitle}</h3>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={filteredData.urgencyBreakdownData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={120} innerRadius={60} fill="#8884d8" dataKey="value" animationDuration={800}>
              {filteredData.urgencyBreakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: chartStyles.tooltipBg,
                border: `1px solid ${chartStyles.tooltipBorder}`,
                borderRadius: '12px',
                padding: '12px',
                color: chartStyles.tooltipText
              }}
              labelStyle={{ color: chartStyles.tooltipText }}
              itemStyle={{ color: chartStyles.tooltipText }}
            />
            <Legend wrapperStyle={{ color: chartStyles.textColor }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  const renderCharts = () => {
    switch (chartType) {
      case 'studyTime':
        return renderStudyTimeCharts();
      case 'performance':
        return renderPerformanceCharts();
      case 'deadlines':
        return renderDeadlinesCharts();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl md:text-5xl mb-2">{getChartTitle()}</h1>
          <p className="text-blue-100">{t[language].viewingData}</p>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
        <button onClick={onNavigateBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 group transition-all hover:scale-105 active:scale-95">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t[language].backToDashboard}</span>
        </button>

        <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-muted-foreground" />
            <h2 className="text-lg text-foreground">Filters</h2>
            {(selectedCourse !== 'all' || selectedLevel !== 'all') && (
              <span className="ml-auto text-sm text-blue-400">
                {language === 'en' ? 'Active filters applied' : 'فلاتر نشطة مطبقة'}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t[language].courseFilter}</label>
              <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="w-full px-4 py-3 bg-secondary text-foreground rounded-xl border border-border focus:ring-2 focus:ring-ring outline-none transition-all">
                {courses.map((course) => (
                  <option key={course.value} value={course.value} className="bg-secondary text-foreground">
                    {course.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t[language].levelFilter}</label>
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="w-full px-4 py-3 bg-secondary text-foreground rounded-xl border border-border focus:ring-2 focus:ring-ring outline-none transition-all">
                {levels.map((level) => (
                  <option key={level.value} value={level.value} className="bg-secondary text-foreground">
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {renderCharts()}
        </div>
      </div>
    </div>
  );
}
