export const PORTALS = [
  { id:'driver',  label:'Driver Portal',  icon:'🚌', badge:'DRIVER PORTAL',  badgeCls:'amber', avatar:'DO', name:'D. Okafor',   color:'amber' },
  { id:'trainer', label:'Trainer Portal', icon:'🎓', badge:'TRAINER PORTAL', badgeCls:'teal',  avatar:'EM', name:'Elena Marsh', color:'teal'  },
  { id:'admin',   label:'Admin Portal',   icon:'⚙️',  badge:'ADMIN PORTAL',  badgeCls:'blue',  avatar:'AD', name:'Admin User',  color:'teal'  },
];

export const NAV = {
  driver: [
    { section:'My Learning', items:[
      { id:'progress',  icon:'Home',     label:'Dashboard'           },
      { id:'mycourses', icon:'Book',     label:'My Courses',  badge:2 },
      { id:'quiz',      icon:'Pencil',   label:'Quizzes'             },
    ]},
    { section:'My Account', items:[
      { id:'certs',     icon:'Trophy',   label:'My Certificate'      },
      { id:'profile',   icon:'Users',    label:'My Profile'          },
    ]},
  ],
  trainer: [
    { section:'Content', items:[
      { id:'courses',   icon:'Book',      label:'Course Builder'        },
      { id:'media',     icon:'Upload',    label:'Media Library'         },
      { id:'quizbank',  icon:'Pencil',    label:'Quiz Bank'             },
    ]},
    { section:'My Drivers', items:[
      { id:'mydrivers', icon:'Users',     label:'My Drivers',  badge:3  },
      { id:'btw',       icon:'Car',       label:'BTW Sessions'          },
    ]},
    { section:'Account', items:[
      { id:'trainerprofile', icon:'Users', label:'My Profile'           },
    ]},
  ],
admin: [
    { section:'Platform', items:[
      { id:'dashboard',     icon:'Home',         label:'Dashboard'                   },
      { id:'drivers',       icon:'Users',        label:'All Drivers',      badge:7   },
      { id:'registrations', icon:'UserCheck',    label:'New Registrations', badge:2  },
      { id:'batchassign',   icon:'Layers',       label:'Batch Assignment'            },
      { id:'videomatrix',   icon:'BarChart',     label:'Video Analytics'             },
      { id:'trainers',      icon:'GraduationCap',label:'Trainers'                   },
      { id:'usermgmt',      icon:'UserCheck',    label:'User Management'             },
      { id:'depots',        icon:'Building',     label:'Depots & Routes'             },
    ]},
    { section:'System', items:[
      { id:'drm',           icon:'Key',          label:'DRM Keys'                    },
      { id:'reports',       icon:'BarChart',     label:'Reports'                     },
      { id:'audit',         icon:'Audit',        label:'Audit Log'                   },
      { id:'settings',      icon:'Settings',     label:'Settings'                    },
    ]},
    { section:'Account', items:[
      { id:'adminprofile',  icon:'Users',        label:'My Profile'                  },
    ]},
  ],
};

export const TOPBAR_TITLES = {
  dashboard:      'Platform Dashboard',
  drivers:        'Driver Management',
  registrations:  'New Registrations',
  trainers:       'Trainer Management',
  usermgmt:       'User Management',
  depots:         'Depots & Routes',
  drm:            'DRM Key Management',
  reports:        'Reports & Analytics',
  audit:          'Audit Log',
  settings:       'System Settings',
  adminprofile:   'Admin Profile',
  batchassign:    'Batch & Trainer Assignment',
  videomatrix:    'Video Watch Analytics',
  courses:        'Course Builder',
  media:          'Media Library',
  quizbank:       'Quiz Bank',
  mydrivers:      'My Drivers',
  btw:            'BTW Sessions',
  trainerprofile: 'My Profile',
  progress:       'Dashboard',
  mycourses:      'My Courses',
  quiz:           'Quizzes',
  certs:          'My Certificate',
  profile:        'My Profile',
};

export const DEFAULT_VIEWS = {
  admin:'dashboard', trainer:'courses', driver:'progress',
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

export const TRAINING_CATEGORIES = [
  {
    id:'public-pre',
    label:'Public Bus — Pre Service',
    short:'Pre-Service',
    color:'blue',
    icon:'Bus',
    desc:'New drivers entering public bus service for the first time',
    count:48,
    active:12,
    graduated:284,
  },
  {
    id:'public-in',
    label:'Public Bus — In Service',
    short:'In-Service',
    color:'teal',
    icon:'Layers',
    desc:'Current drivers undergoing refresher and compliance training',
    count:36,
    active:8,
    graduated:196,
  },
  {
    id:'school-bus',
    label:'School Bus Training',
    short:'School Bus',
    color:'amber',
    icon:'Star',
    desc:'Specialist training for school bus drivers and child safety',
    count:24,
    active:6,
    graduated:87,
  },
];

export const CSV_COLUMNS = [
  'SL', 'RTA ID', 'License No.', 'Name as per Driving License',
  'Nationality', 'Date of Birth', 'Date of Issued', 'Date of Expired',
  'Place of issue', 'Traffic File', 'Contact', 'Age',
  'Company', 'Date of Road test', 'Interview',
  'Date of Join Training', 'Training Batch', 'Date of Graduation',
];

export const SAMPLE_BATCH_DRIVERS = [
  { sl:1,  rtaId:'90454', licNo:'216815',   name:'Zahid Khan Khaista Bacha',       nationality:'Pakistan', dob:'1-Jan-1998',  issued:'21-Nov-2018', expired:'17-Nov-2029', place:'Fujairah',        traffic:'7180013266',  contact:'971554759730', age:'28.3', company:'Reach',       roadTest:'21-Jan-26', interview:'22-Jan-26', joinDate:'6-Apr-26', batch:'Batch 153', graduation:'' },
  { sl:2,  rtaId:'90377', licNo:'4062382',  name:'Amjad Khan Liakat Ali',          nationality:'India',    dob:'15-Sep-1992', issued:'8-Nov-2020',  expired:'26-Jun-2028', place:'Dubai',           traffic:'14778406',    contact:'971542425821', age:'33.6', company:'Reach',       roadTest:'23-Dec-25', interview:'29-Dec-25', joinDate:'6-Apr-26', batch:'Batch 153', graduation:'' },
  { sl:3,  rtaId:'90149', licNo:'3929152',  name:'Avtar Singh Kashmir Singh',      nationality:'India',    dob:'30-Jun-1981', issued:'22-May-2019', expired:'22-May-2026', place:'Dubai',           traffic:'13862953',    contact:'971718412702', age:'44.8', company:'Expert Plus', roadTest:'26-Nov-25', interview:'3-Dec-25',  joinDate:'6-Apr-26', batch:'Batch 153', graduation:'' },
  { sl:4,  rtaId:'90289', licNo:'63662858', name:'Sallauddin Chirakuddin',         nationality:'India',    dob:'10-Mar-1994', issued:'17-May-2017', expired:'17-May-2027', place:'Dubai',           traffic:'13273585',    contact:'971547078736', age:'32.1', company:'Expert Plus', roadTest:'9-Dec-25',  interview:'15-Dec-25', joinDate:'6-Apr-26', batch:'Batch 153', graduation:'' },
  { sl:5,  rtaId:'90324', licNo:'3956510',  name:'Yasir Raja Aurangzeb',           nationality:'Pakistan', dob:'7-Nov-1985',  issued:'10-Sep-2019', expired:'10-Sep-2026', place:'Dubai',           traffic:'14222021',    contact:'971507018345', age:'40.5', company:'Expert Plus', roadTest:'9-Dec-25',  interview:'15-Dec-25', joinDate:'6-Apr-26', batch:'Batch 153', graduation:'' },
  { sl:6,  rtaId:'90374', licNo:'181279',   name:'Hikmat Shah Noor Jamal',         nationality:'Pakistan', dob:'15-Mar-1990', issued:'29-Jun-2016', expired:'28-Jun-2026', place:'Ras Al Khaimah', traffic:'17172888',    contact:'971508676400', age:'36.1', company:'Expert Plus', roadTest:'23-Dec-25', interview:'29-Dec-25', joinDate:'6-Apr-26', batch:'Batch 153', graduation:'' },
  { sl:7,  rtaId:'90375', licNo:'193280',   name:'Muhammad Arif Tariq Mahmood',    nationality:'Pakistan', dob:'12-Mar-1989', issued:'4-Sep-2018',  expired:'11-Aug-2030', place:'Ajman',           traffic:'17173608',    contact:'971504641206', age:'37.1', company:'Expert Plus', roadTest:'23-Dec-25', interview:'29-Dec-25', joinDate:'6-Apr-26', batch:'Batch 153', graduation:'' },
  { sl:8,  rtaId:'90345', licNo:'1073084',  name:'Muhammad Bilal Muhammad Fayyaz', nationality:'Pakistan', dob:'25-Apr-1988', issued:'6-Feb-2014',  expired:'23-Jan-2030', place:'Abu Dhabi',       traffic:'13156670',    contact:'971568529987', age:'38.0', company:'Expert Plus', roadTest:'23-Dec-25', interview:'29-Dec-25', joinDate:'6-Apr-26', batch:'Batch 153', graduation:'' },
  { sl:9,  rtaId:'90342', licNo:'3764243',  name:'Sami Ullah Noor Gul',            nationality:'Pakistan', dob:'14-Jan-1995', issued:'21-Nov-2017', expired:'21-Nov-2029', place:'Dubai',           traffic:'13008996',    contact:'971561379507', age:'31.3', company:'Expert Plus', roadTest:'23-Dec-25', interview:'29-Dec-25', joinDate:'6-Apr-26', batch:'Batch 153', graduation:'' },
  { sl:10, rtaId:'90343', licNo:'1530126',  name:'Zaheer Ullah Zain Ullah',        nationality:'Pakistan', dob:'4-Apr-1982',  issued:'5-Jan-2010',  expired:'7-Mar-2030',  place:'Dubai',           traffic:'11868644',    contact:'971543143423', age:'44.0', company:'Expert Plus', roadTest:'23-Dec-25', interview:'29-Dec-25', joinDate:'6-Apr-26', batch:'Batch 153', graduation:'' },
];

export const SYSTEM_USERS = [
  { id:1, name:'Admin User',     username:'Admin',   email:'admin@transitlearn.com',   role:'admin',   status:'Active',   avatar:'AU', color:'blue',  assignedDrivers:[],    assignedTrainer:'', batch:'',         joined:'2024-01-01' },
  { id:2, name:'Elena Marsh',    username:'Trainer', email:'elena@transitlearn.com',   role:'trainer', status:'Active',   avatar:'EM', color:'teal',  assignedDrivers:[1,2,3,4], assignedTrainer:'', batch:'Batch 153', joined:'2024-03-15' },
  { id:3, name:'Tom Alvarez',    username:'Tom',     email:'tom@transitlearn.com',     role:'trainer', status:'Active',   avatar:'TA', color:'teal',  assignedDrivers:[5,6], assignedTrainer:'', batch:'Batch 153', joined:'2024-03-15' },
  { id:4, name:'Marcus Okafor',  username:'Driver',  email:'marcus@transitlearn.com',  role:'driver',  status:'Active',   avatar:'MO', color:'amber', assignedDrivers:[],    assignedTrainer:2,  batch:'Batch 153', joined:'2024-06-01' },
  { id:5, name:'Priya Sundaram', username:'Priya',   email:'priya@transitlearn.com',   role:'driver',  status:'Active',   avatar:'PS', color:'amber', assignedDrivers:[],    assignedTrainer:3,  batch:'Batch 153', joined:'2024-06-01' },
  { id:6, name:'James Whitfield',username:'James',   email:'james@transitlearn.com',   role:'driver',  status:'Inactive', avatar:'JW', color:'amber', assignedDrivers:[],    assignedTrainer:'', batch:'Batch 152', joined:'2024-04-01' },
];

export const BATCHES = [
  { id:'Batch 153', label:'Batch 153 — Apr 2026', active:true  },
  { id:'Batch 152', label:'Batch 152 — Jan 2026', active:false },
  { id:'Batch 151', label:'Batch 151 — Oct 2025', active:false },
];