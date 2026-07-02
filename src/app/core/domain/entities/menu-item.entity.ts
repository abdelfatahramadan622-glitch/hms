export interface MenuItem {
  id: string;
  label: string;
  labelAr: string;
  icon: string;
  path?: string;
  children?: MenuItem[];
  permissions?: string[];
  roles?: string[];
  badge?: MenuBadge;
  isExpanded?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  order: number;
}

export interface MenuBadge {
  count: number;
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

export const HMS_MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    labelAr: 'لوحة التحكم',
    icon: 'bi-speedometer2',
    path: '/dashboard',
    order: 1,
  },
  {
    id: 'patients',
    label: 'Patients',
    labelAr: 'المرضى',
    icon: 'bi-people',
    path: '/patients',
    permissions: ['patients.view'],
    order: 2,
  },
  {
    id: 'doctors',
    label: 'Doctors',
    labelAr: 'الأطباء',
    icon: 'bi-person-badge',
    path: '/doctors',
    permissions: ['doctors.view'],
    order: 3,
  },
  {
    id: 'appointments',
    label: 'Appointments',
    labelAr: 'المواعيد',
    icon: 'bi-calendar-check',
    path: '/appointments',
    permissions: ['appointments.view'],
    order: 4,
  },
  {
    id: 'emergency',
    label: 'Emergency',
    labelAr: 'الطوارئ',
    icon: 'bi-exclamation-triangle',
    path: '/emergency-cases',
    permissions: ['emergency.view'],
    order: 5,
  },
  {
    id: 'medical-records',
    label: 'Medical Records',
    labelAr: 'السجلات الطبية',
    icon: 'bi-file-medical',
    path: '/medical-records',
    permissions: ['medical-records.view'],
    order: 6,
  },
  {
    id: 'lab',
    label: 'Lab Results',
    labelAr: 'نتائج المختبر',
    icon: 'bi-thermometer',
    path: '/lab-results',
    permissions: ['lab.view'],
    order: 7,
  },
  {
    id: 'prescriptions',
    label: 'Prescriptions',
    labelAr: 'الوصفات الطبية',
    icon: 'bi-capsule',
    path: '/prescriptions',
    permissions: ['prescriptions.view'],
    order: 8,
  },
  {
    id: 'billing',
    label: 'Billing',
    labelAr: 'الفواتير',
    icon: 'bi-receipt',
    path: '/billing',
    permissions: ['billing.view'],
    order: 9,
  },
  {
    id: 'staff',
    label: 'Staff',
    labelAr: 'الموظفون',
    icon: 'bi-person-workspace',
    path: '/staff-management',
    permissions: ['staff.view'],
    order: 10,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    labelAr: 'التحليلات',
    icon: 'bi-bar-chart',
    path: '/charts-analytics',
    permissions: ['analytics.view'],
    order: 11,
  },
  {
    id: 'calendar',
    label: 'Calendar',
    labelAr: 'التقويم',
    icon: 'bi-calendar3',
    path: '/calendar-scheduling',
    permissions: ['calendar.view'],
    order: 12,
  },
  {
    id: 'settings',
    label: 'Settings',
    labelAr: 'الإعدادات',
    icon: 'bi-gear',
    order: 13,
    children: [
      {
        id: 'roles',
        label: 'Roles',
        labelAr: 'الأدوار',
        icon: 'bi-shield',
        path: '/role-management',
        permissions: ['roles.view'],
        order: 1,
      },
      {
        id: 'permissions',
        label: 'Permissions',
        labelAr: 'الصلاحيات',
        icon: 'bi-lock',
        path: '/authorization',
        permissions: ['permissions.view'],
        order: 2,
      },
      {
        id: 'audit-logs',
        label: 'Audit Logs',
        labelAr: 'سجل التدقيق',
        icon: 'bi-journal-text',
        path: '/audit-logs',
        permissions: ['audit.view'],
        order: 3,
      },
    ],
  },
];