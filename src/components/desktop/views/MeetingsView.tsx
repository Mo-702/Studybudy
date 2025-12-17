import { Video, Users, Calendar, Clock, MapPin, Plus, X, ExternalLink, LogOut, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface MeetingsViewProps {
  language: 'en' | 'ar';
}

interface Participant {
  id: string;
  name: string;
  initials: string;
  isHost: boolean;
}

interface Meeting {
  id: string;
  title: string;
  course: string;
  courseCode: string;
  date: string;
  time: string;
  type: 'online' | 'in-person';
  participants: number;
  status: 'upcoming' | 'ongoing' | 'past';
  location?: string;
  meetingLink?: string;
  description?: string;
  participantsList?: Participant[];
}

export function MeetingsView({ language }: MeetingsViewProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
  const [showMeetingRoom, setShowMeetingRoom] = useState(false);
  const [joinedMeetings, setJoinedMeetings] = useState<Set<string>>(new Set());

  const t = {
    en: {
      title: 'Meetings',
      subtitle: 'Schedule and manage study group meetings',
      createMeeting: 'Create Meeting',
      upcoming: 'Upcoming',
      past: 'Past',
      all: 'All',
      online: 'Online',
      inPerson: 'In Person',
      participants: 'Participants',
      ongoing: 'Ongoing',
      noMeetings: 'No meetings found',
      meetingDetails: 'Meeting Details',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      meetingLink: 'Meeting Link',
      description: 'Description',
      createTitle: 'Create New Meeting',
      meetingTitle: 'Meeting Title',
      selectCourse: 'Select Course',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      meetingType: 'Meeting Type',
      inviteParticipants: 'Invite Participants',
      cancel: 'Cancel',
      create: 'Create Meeting',
      createSuccess: 'Meeting created successfully!',
      joinMeetingTitle: 'Join this meeting?',
      joinMeetingText: 'You will join the session and appear in the participants list.',
      join: 'Join',
      meetingRoomTitle: 'Meeting Room',
      leaveMeeting: 'Leave Meeting',
      joinCall: 'Join Call',
      viewLocation: 'View Location',
      host: 'Host',
      copyLinkSuccess: 'Link copied to clipboard!',
      joinSuccess: 'Joined successfully!',
      leaveSuccess: 'Left meeting',
      inMeeting: 'In Meeting',
    },
    ar: {
      title: 'الاجتماعات',
      subtitle: 'جدولة وإدارة اجتماعات المجموعات الدراسية',
      createMeeting: 'إنشاء اجتماع',
      upcoming: 'القادمة',
      past: 'السابقة',
      all: 'الكل',
      online: 'عبر الإنترنت',
      inPerson: 'حضوري',
      participants: 'المشاركون',
      ongoing: 'جارٍ الآن',
      noMeetings: 'لا توجد اجتماعات',
      meetingDetails: 'تفاصيل الاجتماع',
      date: 'التاريخ',
      time: 'الوقت',
      location: 'الموقع',
      meetingLink: 'رابط الاجتماع',
      description: 'الوصف',
      createTitle: 'إنشاء اجتماع جديد',
      meetingTitle: 'عنوان الاجتماع',
      selectCourse: 'اختر المادة',
      selectDate: 'اختر التاريخ',
      selectTime: 'اختر الوقت',
      meetingType: 'نوع الاجتماع',
      inviteParticipants: 'دعوة المشاركين',
      cancel: 'إلغاء',
      create: 'إنشاء الاجتماع',
      createSuccess: 'تم إنشاء الاجتماع بنجاح!',
      joinMeetingTitle: 'الانضمام إلى هذا الاجتماع؟',
      joinMeetingText: 'سوف تنضم إلى الجلسة وتظهر في قائمة المشاركين.',
      join: 'انضم',
      meetingRoomTitle: 'غرفة الاجتماع',
      leaveMeeting: 'مغادرة الاجتماع',
      joinCall: 'الانضمام للمكالمة',
      viewLocation: 'عرض الموقع',
      host: 'المضيف',
      copyLinkSuccess: 'تم نسخ الرابط!',
      joinSuccess: 'تم الانضمام بنجاح!',
      leaveSuccess: 'تم مغادرة الاجتماع',
      inMeeting: 'في الاجتماع',
    },
  };

  const generateParticipants = (count: number, hostName: string): Participant[] => {
    const names = [
      'Ahmed Ali', 'Sara Mohammed', 'Omar Hassan', 'Layla Ibrahim', 'Khaled Yousef',
      'Fatima Nasser', 'Ali Abdullah', 'Noor Salem', 'Mohammed Tariq', 'Rana Mustafa',
    ];
    
    const participants: Participant[] = [
      { id: '0', name: hostName, initials: hostName.split(' ').map(n => n[0]).join(''), isHost: true }
    ];
    
    for (let i = 1; i < Math.min(count, 10); i++) {
      const name = names[i];
      participants.push({
        id: `${i}`,
        name,
        initials: name.split(' ').map(n => n[0]).join(''),
        isHost: false,
      });
    }
    
    return participants;
  };

  const meetings: Meeting[] = [
    {
      id: '1',
      title: language === 'en' ? 'Data Structures Study Session' : 'جلسة دراسية لهياكل البيانات',
      course: language === 'en' ? 'Data Structures' : 'هياكل البيانات',
      courseCode: 'CS201',
      date: '2025-01-20',
      time: '14:00',
      type: 'online',
      participants: 8,
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      description: language === 'en' ? 'Join us for a comprehensive study session covering Trees, Graphs, and Sorting Algorithms.' : 'انضم إلينا لجلسة دراسية شاملة تغطي الأشجار والرسوم البيانية وخوارزميات الفرز.',
      participantsList: generateParticipants(8, language === 'en' ? 'John Doe' : 'أحمد علي'),
    },
    {
      id: '2',
      title: language === 'en' ? 'Algorithm Analysis Discussion' : 'نقاش تحليل الخوارزميات',
      course: language === 'en' ? 'Algorithm Design & Analysis' : 'تصميم وتحليل الخوارزميات',
      courseCode: 'CS301',
      date: '2025-01-21',
      time: '16:00',
      type: 'in-person',
      participants: 12,
      status: 'upcoming',
      location: 'Building A, Room 205',
      description: language === 'en' ? 'Discussion on Time Complexity, Space Complexity, and Big-O Notation.' : 'نقاش حول التعقيد الزمني والتعقيد المكاني ورمز Big-O.',
      participantsList: generateParticipants(12, language === 'en' ? 'Alice Johnson' : 'سارة محمد'),
    },
    {
      id: '3',
      title: language === 'en' ? 'Midterm Review Session' : 'جلسة مراجعة منتصف الفصل',
      course: language === 'en' ? 'Operating Systems' : 'نظم التشغيل',
      courseCode: 'CS302',
      date: '2025-01-15',
      time: '10:00',
      type: 'online',
      participants: 15,
      status: 'ongoing',
      meetingLink: 'https://zoom.us/j/123456789',
      description: language === 'en' ? 'Review key topics for the midterm exam including Process Management and Memory Allocation.' : 'مراجعة الموضوعات الرئيسية للاختبار النصفي بما في ذلك إدارة العمليات وتخصيص الذاكرة.',
      participantsList: generateParticipants(15, language === 'en' ? 'Charlie Davis' : 'عمر حسن'),
    },
    {
      id: '4',
      title: language === 'en' ? 'Database Project Discussion' : 'نقاش مشروع قواعد البيانات',
      course: language === 'en' ? 'Database Systems' : 'نظم قواعد البيانات',
      courseCode: 'CS304',
      date: '2025-01-10',
      time: '13:00',
      type: 'online',
      participants: 6,
      status: 'past',
      meetingLink: 'https://meet.google.com/xyz-1234-abc',
      description: language === 'en' ? 'Project planning and SQL query optimization discussion.' : 'مناقشة تخطيط المشروع وتحسين استعلامات SQL.',
      participantsList: generateParticipants(6, language === 'en' ? 'Ethan Foster' : 'ليلى إبراهيم'),
    },
    {
      id: '5',
      title: language === 'en' ? 'Final Exam Preparation' : 'التحضير للاختبار النهائي',
      course: language === 'en' ? 'Computer Networks' : 'شبكات الحاسب',
      courseCode: 'CS303',
      date: '2025-01-08',
      time: '15:00',
      type: 'in-person',
      participants: 20,
      status: 'past',
      location: 'Library Study Hall',
      description: language === 'en' ? 'Final exam preparation covering TCP/IP, Network Protocols, and Network Security.' : 'التحضير للاختبار النهائي يغطي TCP/IP وبروتوكولات الشبكة وأمن الشبكات.',
      participantsList: generateParticipants(20, language === 'en' ? 'George Harris' : 'خالد يوسف'),
    },
  ];

  const filteredMeetings = meetings.filter((meeting) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return meeting.status === 'upcoming' || meeting.status === 'ongoing';
    if (filter === 'past') return meeting.status === 'past';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'ongoing':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'past':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const handleCardClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowDetailsModal(true);
  };

  const handleJoinClick = () => {
    setShowDetailsModal(false);
    setShowJoinConfirmation(true);
  };

  const handleConfirmJoin = () => {
    if (selectedMeeting) {
      setJoinedMeetings((prev) => new Set([...prev, selectedMeeting.id]));
      setShowJoinConfirmation(false);
      setShowMeetingRoom(true);
      toast.success(t[language].joinSuccess, { duration: 2000 });
    }
  };

  const handleLeaveMeeting = () => {
    if (selectedMeeting) {
      setJoinedMeetings((prev) => {
        const newSet = new Set(prev);
        newSet.delete(selectedMeeting.id);
        return newSet;
      });
      setShowMeetingRoom(false);
      setSelectedMeeting(null);
      toast.success(t[language].leaveSuccess, { duration: 2000 });
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success(t[language].copyLinkSuccess, { duration: 2000 });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <h1 className="text-3xl md:text-4xl text-foreground">{t[language].title}</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={20} />
            {t[language].createMeeting}
          </button>
        </div>
        <p className="text-muted-foreground">{t[language].subtitle}</p>
      </div>

      {/* Filters */}
      <div className="bg-card border-b border-border px-4 md:px-8 py-4">
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 md:px-6 py-2 rounded-xl transition-all whitespace-nowrap ${
              filter === 'all'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-secondary text-muted-foreground hover:bg-accent'
            }`}
          >
            {t[language].all}
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 md:px-6 py-2 rounded-xl transition-all whitespace-nowrap ${
              filter === 'upcoming'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-secondary text-muted-foreground hover:bg-accent'
            }`}
          >
            {t[language].upcoming}
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 md:px-6 py-2 rounded-xl transition-all whitespace-nowrap ${
              filter === 'past'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-secondary text-muted-foreground hover:bg-accent'
            }`}
          >
            {t[language].past}
          </button>
        </div>
      </div>

      {/* Meetings List */}
      <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredMeetings.map((meeting) => {
            const isJoined = joinedMeetings.has(meeting.id);
            return (
              <button
                key={meeting.id}
                onClick={() => handleCardClick(meeting)}
                className="bg-card rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all text-left hover:scale-[1.02] active:scale-[0.98] border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(meeting.status)}`}>
                        {t[language][meeting.status as keyof typeof t.en]}
                      </span>
                      <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">
                        {meeting.courseCode}
                      </span>
                      {isJoined && (
                        <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm flex items-center gap-1">
                          <Check size={14} />
                          {t[language].inMeeting}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl text-foreground mb-1">{meeting.title}</h3>
                    <p className="text-muted-foreground">{meeting.course}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    meeting.type === 'online' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-green-100 dark:bg-green-900/30'
                  }`}>
                    {meeting.type === 'online' ? (
                      <Video size={24} className="text-blue-600 dark:text-blue-400" />
                    ) : (
                      <MapPin size={24} className="text-green-600 dark:text-green-400" />
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={18} />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={18} />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users size={18} />
                    <span>{meeting.participants} {t[language].participants}</span>
                  </div>
                  {meeting.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={18} />
                      <span>{meeting.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <span className={`px-3 py-1 rounded-lg text-sm ${
                    meeting.type === 'online'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  }`}>
                    {t[language][meeting.type === 'online' ? 'online' : 'inPerson']}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {filteredMeetings.length === 0 && (
          <div className="text-center py-16">
            <Calendar size={64} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">{t[language].noMeetings}</p>
          </div>
        )}
      </div>

      {/* Meeting Details Modal */}
      {showDetailsModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-8" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-card rounded-3xl w-full max-w-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl text-foreground">{t[language].meetingDetails}</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-foreground" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedMeeting.status)}`}>
                    {t[language][selectedMeeting.status as keyof typeof t.en]}
                  </span>
                  <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">
                    {selectedMeeting.courseCode}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedMeeting.type === 'online'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  }`}>
                    {t[language][selectedMeeting.type === 'online' ? 'online' : 'inPerson']}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl text-foreground mb-2">{selectedMeeting.title}</h3>
                <p className="text-muted-foreground mb-4">{selectedMeeting.course}</p>
                {selectedMeeting.description && (
                  <p className="text-foreground bg-secondary rounded-xl p-4">{selectedMeeting.description}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-foreground">
                  <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t[language].date}</p>
                    <p>{selectedMeeting.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Clock size={20} className="text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t[language].time}</p>
                    <p>{selectedMeeting.time}</p>
                  </div>
                </div>
                {selectedMeeting.location && (
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin size={20} className="text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t[language].location}</p>
                      <p>{selectedMeeting.location}</p>
                    </div>
                  </div>
                )}
                {selectedMeeting.type === 'online' && selectedMeeting.meetingLink && (
                  <div className="flex items-center gap-3 text-foreground">
                    <ExternalLink size={20} className="text-blue-600 dark:text-blue-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">{t[language].meetingLink}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-blue-600 dark:text-blue-400 truncate text-sm">{selectedMeeting.meetingLink}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink(selectedMeeting.meetingLink || '');
                          }}
                          className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors whitespace-nowrap"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 text-foreground">
                  <Users size={20} className="text-orange-600 dark:text-orange-400" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t[language].participants}</p>
                    <p>{selectedMeeting.participants} {t[language].participants}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleJoinClick}
                disabled={selectedMeeting.status === 'past'}
                className={`w-full px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  selectedMeeting.status === 'past'
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <Video size={20} />
                {t[language].join}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Confirmation Modal */}
      {showJoinConfirmation && selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-8" onClick={() => setShowJoinConfirmation(false)}>
          <div className="bg-card rounded-3xl w-full max-w-md p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl md:text-3xl text-foreground mb-4">{t[language].joinMeetingTitle}</h2>
            <p className="text-muted-foreground mb-6">{t[language].joinMeetingText}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowJoinConfirmation(false)}
                className="flex-1 px-6 py-3 bg-secondary text-foreground rounded-xl hover:bg-accent transition-colors"
              >
                {t[language].cancel}
              </button>
              <button
                onClick={handleConfirmJoin}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {t[language].join}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Room */}
      {showMeetingRoom && selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-8" onClick={handleLeaveMeeting}>
          <div className="bg-card rounded-3xl w-full max-w-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl text-foreground mb-1">{selectedMeeting.title}</h2>
                <p className="text-muted-foreground">{selectedMeeting.course}</p>
              </div>
              <button
                onClick={handleLeaveMeeting}
                className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-colors"
                title={t[language].leaveMeeting}
              >
                <LogOut size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedMeeting.status)}`}>
                  {t[language][selectedMeeting.status as keyof typeof t.en]}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedMeeting.type === 'online'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                }`}>
                  {t[language][selectedMeeting.type === 'online' ? 'online' : 'inPerson']}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedMeeting.type === 'online' && selectedMeeting.meetingLink && (
                  <a
                    href={selectedMeeting.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Video size={20} />
                    {t[language].joinCall}
                  </a>
                )}
                {selectedMeeting.location && (
                  <button
                    onClick={() => toast.info(selectedMeeting.location || '')}
                    className="px-6 py-3 bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <MapPin size={20} />
                    {t[language].viewLocation}
                  </button>
                )}
              </div>

              <div>
                <h3 className="text-xl text-foreground mb-4 flex items-center gap-2">
                  <Users size={20} className="text-blue-600 dark:text-blue-400" />
                  {selectedMeeting.participants} {t[language].participants}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {selectedMeeting.participantsList?.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                        {participant.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground truncate">{participant.name}</p>
                        {participant.isHost && (
                          <span className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full inline-block">
                            {t[language].host}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleLeaveMeeting}
                className="w-full px-6 py-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={20} />
                {t[language].leaveMeeting}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Meeting Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-8" onClick={() => setShowCreateModal(false)}>
          <div className="bg-card rounded-3xl w-full max-w-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl text-foreground">{t[language].createTitle}</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-10 h-10 rounded-xl bg-secondary hover:bg-accent flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-foreground" />
              </button>
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setShowCreateModal(false);
                toast.success(t[language].createSuccess, { duration: 2000 });
              }}
            >
              <div>
                <label className="block text-foreground mb-2">{t[language].meetingTitle}</label>
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Enter meeting title' : 'أدخل عنوان الاجتماع'}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-ring outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">{t[language].selectCourse}</label>
                <select className="w-full px-4 py-3 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-ring outline-none text-foreground">
                  <option>CS201 - Data Structures</option>
                  <option>CS301 - Algorithm Design & Analysis</option>
                  <option>CS302 - Operating Systems</option>
                  <option>CS303 - Computer Networks</option>
                  <option>CS304 - Database Systems</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground mb-2">{t[language].selectDate}</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-ring outline-none text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-foreground mb-2">{t[language].selectTime}</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-ring outline-none text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-2">{t[language].meetingType}</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="flex-1 px-4 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Video size={20} />
                    {t[language].online}
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-4 py-3 bg-secondary text-muted-foreground rounded-xl hover:bg-accent transition-colors flex items-center justify-center gap-2"
                  >
                    <MapPin size={20} />
                    {t[language].inPerson}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-2">{t[language].description}</label>
                <textarea
                  rows={4}
                  placeholder={language === 'en' ? 'Add meeting description...' : 'أضف وصف الاجتماع...'}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-ring outline-none resize-none text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">{t[language].inviteParticipants}</label>
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Enter student names or IDs' : 'أدخل أسماء الطلاب أو الأرقام'}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-ring outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 bg-secondary text-foreground rounded-xl hover:bg-accent transition-colors"
                >
                  {t[language].cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {t[language].create}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
