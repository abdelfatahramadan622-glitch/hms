# HMS — نظام إدارة المستشفى

نظام إدارة مستشفى متكامل مبني بـ **Angular 19** باستخدام **Clean Architecture** و **NgRx Signal Store**.

## المتطلبات

- Node.js 18.19+ أو 20.9+
- npm 10+

## التشغيل

```bash
npm install
npm start
```

التطبيق هيشتغل على `http://localhost:4200`

## البناء للإنتاج

```bash
npm run build
```

## البنية المعمارية

المشروع مبني على **Clean Architecture** لكل feature:

```
feature/
├── domain/           # Models, Entities, Repository Interfaces (لا تعتمد على أي حاجة تانية)
├── infrastructure/   # API Services, DTOs, Mappers, Repository Implementations
├── application/      # Services, Facades, State (NgRx Signal Store)
└── presentation/      # Components, Pages
```

## الـ Features المتاحة

| Feature | الوصف |
|---|---|
| Authentication | تسجيل دخول، استرداد كلمة مرور |
| Dashboard | لوحة تحكم بالإحصائيات الرئيسية |
| Patients | إدارة المرضى |
| Doctors | إدارة الأطباء وجداولهم |
| Appointments | المواعيد والتقويم |
| Emergency Cases | حالات الطوارئ ولوحة Triage |
| Medical Records | السجلات الطبية |
| Lab Results | نتائج المختبر |
| Prescriptions | الوصفات الطبية |
| Billing | الفواتير والمدفوعات |
| Staff Management | إدارة الموظفين |
| Analytics | التحليلات والتقارير |
| Calendar | التقويم العام |
| Role Management | إدارة الأدوار |
| Authorization | الصلاحيات |
| Audit Logs | سجل التدقيق |
| Notifications | الإشعارات |
| Real-time Updates | التحديثات الفورية |

## التقنيات المستخدمة

- **Angular 19** (Standalone Components, Signals)
- **NgRx Signal Store** لإدارة الحالة
- **Bootstrap 5 RTL** للتصميم
- **Bootstrap Icons**
- **RxJS** للتعامل مع العمليات غير المتزامنة

## ملاحظات الإعداد

- عدّل `src/environments/environment.development.ts` لضبط رابط الـ API
- نظام الـ Auth بيستخدم JWT مخزّن في `localStorage` (مشفّر base64 بشكل أساسي — استبدله بتشفير حقيقي قبل الإنتاج)