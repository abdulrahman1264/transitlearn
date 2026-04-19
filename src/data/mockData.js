export const PORTALS = [
  { id:'driver',  label:'Driver Portal',  icon:'🚌', badge:'DRIVER PORTAL',  badgeCls:'amber', avatar:'DO', name:'D. Okafor',   color:'amber' },
  { id:'trainer', label:'Trainer Portal', icon:'🎓', badge:'TRAINER PORTAL', badgeCls:'teal',  avatar:'EM', name:'Elena Marsh', color:'teal'  },
  { id:'admin',   label:'Admin Portal',   icon:'⚙️',  badge:'ADMIN PORTAL',  badgeCls:'blue',  avatar:'AD', name:'Admin User',  color:'teal'  },
];

export const NAV = {
  driver: [
    { section:'Learning', items:[
      { id:'mycourses', icon:'📚', label:'My Courses',   badge:2 },
      { id:'progress',  icon:'📊', label:'My Progress' },
      { id:'quiz',      icon:'✏️',  label:'Quizzes' },
      { id:'btwlog',    icon:'🚗', label:'BTW Sessions' },
    ]},
    { section:'Account', items:[
      { id:'certs',    icon:'🏆', label:'Certificates' },
      { id:'schedule', icon:'📅', label:'Schedule' },
    ]},
  ],
  trainer: [
    { section:'Content', items:[
      { id:'courses',   icon:'📖', label:'Course Builder' },
      { id:'quizbank',  icon:'✏️',  label:'Quiz Bank' },
      { id:'media',     icon:'🎬', label:'Media Library' },
    ]},
    { section:'Drivers', items:[
      { id:'mydrivers', icon:'👥', label:'My Drivers', badge:3 },
      { id:'assign',    icon:'📋', label:'Assignments' },
      { id:'btw',       icon:'🚗', label:'BTW Log' },
    ]},
    { section:'Insights', items:[
      { id:'analytics', icon:'📈', label:'Analytics' },
    ]},
  ],
  admin: [
    { section:'Platform', items:[
      { id:'dashboard', icon:'🏠', label:'Dashboard' },
      { id:'drivers',   icon:'👥', label:'All Drivers', badge:7 },
      { id:'trainers',  icon:'🎓', label:'Trainers' },
      { id:'depots',    icon:'🏢', label:'Depots & Routes' },
    ]},
    { section:'System', items:[
      { id:'drm',      icon:'🔑', label:'DRM Keys' },
      { id:'reports',  icon:'📊', label:'Reports' },
      { id:'audit',    icon:'🔍', label:'Audit Log' },
      { id:'settings', icon:'⚙️',  label:'Settings' },
    ]},
  ],
};

export const TOPBAR_TITLES = {
  dashboard:'Platform Dashboard', drivers:'Driver Management',
  drm:'DRM Key Management', reports:'Reports & Analytics', audit:'Audit Log',
  settings:'System Settings', trainers:'Trainer Management',
  depots:'Depots & Routes', courses:'Course Builder',
  quizbank:'Quiz Bank', media:'Media Library',
  mydrivers:'My Drivers', assign:'Assignments',
  btw:'BTW Log', analytics:'Analytics',
  mycourses:'My Courses', progress:'My Progress',
  quiz:'Quizzes', btwlog:'BTW Sessions',
  certs:'Certificates', schedule:'Schedule',
};

export const DEFAULT_VIEWS = {
  admin:'dashboard', trainer:'courses', driver:'mycourses',
};

export const DRIVERS = [
  { id:1, name:'Marcus Okafor',   emp:'D-10421', depot:'Central', status:'In-Service',  prog:82,  lic:'2026-04-15', comp:'OK'      },
  { id:2, name:'Priya Sundaram',  emp:'D-10422', depot:'North',   status:'Pre-Service', prog:47,  lic:'2025-12-01', comp:'At Risk' },
  { id:3, name:'James Whitfield', emp:'D-10423', depot:'South',   status:'In-Service',  prog:100, lic:'2026-08-22', comp:'OK'      },
  { id:4, name:'Aisha Mensah',    emp:'D-10424', depot:'East',    status:'In-Service',  prog:65,  lic:'2026-01-30', comp:'Overdue' },
  { id:5, name:'Chen Wei',        emp:'D-10425', depot:'Central', status:'Pre-Service', prog:29,  lic:'2025-11-10', comp:'At Risk' },
  { id:6, name:'Rosa Gutierrez',  emp:'D-10426', depot:'West',    status:'In-Service',  prog:91,  lic:'2027-03-05', comp:'OK'      },
];

export const COURSES = [
  { id:1, title:'Pre-Service Orientation',        type:'Pre-Service', mods:8, dur:'4h',   status:'Published', enrolled:12 },
  { id:2, title:'Defensive Driving Fundamentals', type:'In-Service',  mods:6, dur:'3h',   status:'Published', enrolled:48 },
  { id:3, title:'Emergency Procedures & Safety',  type:'Both',        mods:5, dur:'2.5h', status:'Published', enrolled:60 },
  { id:4, title:'Passenger Accessibility (ADA)',  type:'In-Service',  mods:4, dur:'1.5h', status:'Published', enrolled:33 },
  { id:5, title:'Route Navigation & GPS Systems', type:'Pre-Service', mods:7, dur:'2h',   status:'Draft',     enrolled:0  },
  { id:6, title:'Annual Compliance Refresh',      type:'In-Service',  mods:3, dur:'1h',   status:'Published', enrolled:85 },
];

export const COURSE_PROGS = { 1:68, 2:100, 3:45, 4:0, 5:15, 6:0 };

export const COURSE_MODULES = [
  { title:'Introduction & Safety Brief',    dur:'12 min', done:true,  type:'video'              },
  { title:'Wet Weather Driving Techniques', dur:'18 min', done:true,  type:'video'              },
  { title:'Knowledge Check — Module 2',     dur:'10 min', done:false, type:'quiz', active:true  },
  { title:'Night Driving & Visibility',     dur:'15 min', done:false, type:'video'              },
  { title:'Highway Merging & Lane Changes', dur:'22 min', done:false, type:'video'              },
  { title:'Final Assessment',               dur:'30 min', done:false, type:'quiz'               },
];

export const BTW_SESSIONS = [
  { id:1, driver:'Marcus Okafor',  trainer:'Elena Marsh', date:'2025-04-10', dur:120, route:'Route 14 — Downtown Loop',  score:87, status:'Completed'        },
  { id:2, driver:'Priya Sundaram', trainer:'Tom Alvarez', date:'2025-04-11', dur:90,  route:'Route 7 — Airport Express', score:72, status:'Pending Sign-off' },
  { id:3, driver:'Chen Wei',       trainer:'Elena Marsh', date:'2025-04-12', dur:60,  route:'Training Yard',             score:68, status:'Completed'        },
  { id:4, driver:'Aisha Mensah',   trainer:'Tom Alvarez', date:'2025-04-13', dur:105, route:'Route 22 — Suburban',       score:81, status:'Draft'            },
];

export const BTW_SKILLS = [
  'Vehicle Control & Handling',
  'Mirror Usage & Observation',
  'Passenger Interaction',
  'Route Knowledge',
  'Safety Procedures',
  'Emergency Response',
  'Kerb Management',
  'Speed & Positioning',
];

export const AUDIT_LOG = [
  { ts:'2025-04-14 14:22:03', user:'admin@transit.org',    action:'Assignment.Created',  entity:'TrainingAssignment', ip:'10.0.1.5'  },
  { ts:'2025-04-14 13:15:44', user:'trainer@transit.org',  action:'BtwSession.Signed',   entity:'BtwSession',         ip:'10.0.1.12' },
  { ts:'2025-04-14 11:08:21', user:'d.okafor@transit.org', action:'Quiz.Submitted',      entity:'QuizAttempt',        ip:'10.0.2.33' },
  { ts:'2025-04-14 10:55:17', user:'admin@transit.org',    action:'Driver.Created',      entity:'DriverProfile',      ip:'10.0.1.5'  },
  { ts:'2025-04-14 09:41:05', user:'trainer@transit.org',  action:'Course.Published',    entity:'Course',             ip:'10.0.1.12' },
  { ts:'2025-04-13 17:30:58', user:'d.mensah@transit.org', action:'VideoProgress.Saved', entity:'WatchSession',       ip:'10.0.2.41' },
];

export const QUIZ_QUESTIONS = [
  {
    q:'When approaching a bus stop with passengers waiting, you should:',
    opts:[
      'Maintain speed and signal at the last moment',
      'Slow gradually, check mirrors, signal early, and pull smoothly to the kerb',
      'Sound the horn to alert passengers before arriving',
      'Only stop if more than 3 passengers are waiting',
    ],
    correct:1,
  },
  {
    q:'In wet weather conditions, what is the minimum stopping distance compared to dry conditions?',
    opts:[
      'Same — ABS handles the difference',
      '1.5× longer',
      'At least twice as long',
      '3× longer',
    ],
    correct:2,
  },
  {
    q:'A passenger requests an unscheduled stop between designated bus stops. You should:',
    opts:[
      'Stop immediately to assist the passenger',
      'Explain politely that stops are at designated locations only',
      'Call dispatch for approval before deciding',
      'Open the door only if traffic allows',
    ],
    correct:1,
  },
];