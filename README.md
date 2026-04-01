# CureX — AI-Powered Healthcare Companion

CureX is a modernized, premium healthcare platform designed to provide instant medical guidance, find local healthcare providers, and manage your health journey with AI-driven insights.

## ✨ Premium Features
- **NVIDIA-Powered AI**: High-fidelity medical guidance using Llama-3.1-8b-instruct.
- **Master Physician AI Persona**: Upgraded "CureX Mastery" prompt with human-like empathy, emotional support, and clinical authority.
- **Personalized AI Core**: Integrated patient health context (Allergies, Conditions) directly into AI responses for safer, tailored guidance.
- **Medical Profile Management**: Secure storage for Blood Type, Allergies, Medications, and Chronic Conditions.
- **Smart Chat History**: Persists every consultation for clinical continuity and personal health tracking.
- **Health Dashboard**: A data-rich hub showing consultation activity and daily AI health tips.
- **Provider Locator**: Real-time geolocation for Doctors and Hospitals with 1-click Google Maps navigation.
- **Strict Authentication**: All core features are gated by session-based authentication for privacy.

---

## 🚀 Site Endpoints & Navigation
The following routes define the CureX ecosystem:

### 🌐 User-Facing Routes
| Page | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **Landing** | `/` | Public | Marketing entry point & value proposition. |
| **Clinical Chat** | `/app/` | Login Req. | Core AI healthcare interface. |
| **Health Profile** | `/users/profile/` | Login Req. | View consultations and wellness logs. |
| **Medical History** | `/users/profile/edit/` | Login Req. | Manage Blood Type, Allergies, and Conditions. |
| **Doctor Discovery**| `/location/doctors-page/` | Login Req. | Map-based provider search. |
| **Hospital Discovery**| `/location/hospitals-page/`| Login Req. | Locate nearby medical facilities. |
| **Login / Join** | `/users/login/` / `/users/register/` | Public | Secure authentication portal. |

### 🛠️ Administration & Management
| Page | Endpoint | Description |
| :--- | :--- | :--- |
| **Django Hub** | `/admin/` | Standard Django admin for accounts and sessions. |
| **CureX Dashboard**| `/admin-panel/` | Entry point for custom clinical management. |
| **Knowledge Base** | `/admin-panel/manage-qa/` | Maintain the static Q&A healthcare database. |
| **User Oversight** | `/admin-panel/users/` | Audit active accounts and chat history. |

---

## 🔑 Secure Administration
To manage the platform's medical knowledge and users, use the default admin credentials:

- **Admin Link**: [https://curex.up.railway.app/admin/](https://curex.up.railway.app/admin/)
- **Username**: `admin`
- **Password**: `password123` *(Please change after first login)*

### Custom Admin Features:
- **Add/Edit Q&A**: Fine-tune the healthbot's responses for specific symptoms.
- **Consultation View**: See what users are asking the AI for better training.
- **User Activity**: Track registration trends and active sessions.

---

## 🛠️ Deployment & Troubleshooting
If you encounter `OperationalError: no such table: auth_user` on Railway:

1. **Automatic Migration**: The `Procfile` has been updated to automatically run migrations on startup (`python manage.py migrate`).
2. **Persistent Storage**: Note that this app currently uses **SQLite**. In Railway, a new deployment wipes the database unless you use a persistent volume.
3. **Database Migration to PostgreSQL**: For production durability, add a **PostgreSQL** service in Railway. The app will automatically switch from SQLite to PostgreSQL using the `DATABASE_URL` environment variable.

---
*Disclaimer: CureX is an AI-powered educational tool. For emergencies, please contact your local medical services.*
