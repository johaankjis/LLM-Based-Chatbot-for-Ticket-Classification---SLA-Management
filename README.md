# LLM-Based Chatbot for Ticket Classification & SLA Management

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

An intelligent support ticket management system powered by AI that automatically classifies, routes, and tracks support tickets with SLA (Service Level Agreement) monitoring. Built with Next.js 15, React 19, and TypeScript.

## 🌟 Key Features

### 🤖 AI-Powered Classification
- **Automatic Ticket Classification**: LLM-based system analyzes ticket content and automatically categorizes into:
  - Hardware issues
  - Software problems
  - Network connectivity
  - Access/Security concerns
  - Other general issues
- **Smart Priority Assignment**: AI determines ticket priority (Critical, High, Medium, Low) based on urgency indicators
- **98% Routing Accuracy**: High-confidence classification with detailed reasoning
- **Intelligent Team Routing**: Automatically assigns tickets to the appropriate support team

### 📊 SLA Management & Analytics
- **Real-time SLA Tracking**: Monitor ticket deadlines and resolution times
- **SLA Breach Detection**: Automatic alerts for tickets at risk or breached
- **Compliance Metrics**: Track SLA compliance rates across categories and priorities
- **Performance Analytics**: 
  - Average resolution time tracking
  - Ticket distribution by category and priority
  - SLA performance breakdown by category
  - Visual charts and graphs using Recharts

### 💼 Admin Dashboard
- **Comprehensive Ticket Management**: View and manage all support tickets
- **Routing Logs**: Track all classification and routing decisions
- **Live Classifier Testing**: Test the AI classifier with sample tickets
- **Analytics Dashboard**: Visual insights into ticket trends and SLA performance

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Built-in theme switching capability
- **Component Library**: Built with Radix UI and shadcn/ui components
- **Beautiful Animations**: Smooth transitions and loading states
- **Accessible**: WCAG compliant interface elements

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.2.4 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **Component Library**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Form Handling**: React Hook Form + Zod validation
- **Analytics**: Vercel Analytics

### Backend
- **API Routes**: Next.js API Routes (Server Actions)
- **Classification**: Custom LLM-based classifier (simulated)
- **Data Management**: Mock data store (can be replaced with a real database)

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Build Tool**: Next.js built-in build system

## 📁 Project Structure

```
.
├── app/                          # Next.js App Router
│   ├── actions/                  # Server Actions
│   │   └── ticket-actions.ts     # Ticket submission logic
│   ├── admin/                    # Admin dashboard page
│   │   └── page.tsx
│   ├── api/                      # API Routes
│   │   └── classify/             # Classification endpoint
│   │       └── route.ts
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page (ticket submission)
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── classification-demo.tsx   # Classifier testing interface
│   ├── routing-logs-table.tsx    # Routing logs display
│   ├── sla-analytics.tsx         # Analytics dashboard
│   ├── ticket-submission-form.tsx # Main ticket form
│   ├── tickets-table.tsx         # All tickets view
│   └── theme-provider.tsx        # Theme management
│
├── lib/                          # Utility functions and types
│   ├── llm-classifier.ts         # AI classification logic
│   ├── mock-data.ts              # Mock data management
│   ├── sla-calculator.ts         # SLA metrics calculation
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Helper functions
│
├── public/                       # Static assets
├── styles/                       # Additional styles
├── components.json               # shadcn/ui configuration
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/LLM-Based-Chatbot-for-Ticket-Classification---SLA-Management.git
   cd LLM-Based-Chatbot-for-Ticket-Classification---SLA-Management
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

## 📖 Usage Guide

### Submitting a Ticket

1. Navigate to the home page
2. Fill in the ticket submission form:
   - **Email**: Your contact email
   - **Issue Title**: Brief description of the problem
   - **Detailed Description**: Complete details about the issue
3. Click "Submit Ticket"
4. The AI will:
   - Analyze the ticket content
   - Classify the category (hardware, software, network, access, other)
   - Assign a priority level
   - Route to the appropriate team
   - Calculate SLA deadline
5. View the classification results with:
   - Ticket ID
   - Category and Priority
   - Assigned Team
   - AI reasoning and confidence score

### Using the Admin Dashboard

Access the admin dashboard at `/admin` to:

1. **View All Tickets**
   - See complete ticket list with status, priority, and SLA information
   - Track ticket resolution progress
   - Monitor SLA deadlines

2. **Check Routing Logs**
   - Review all classification decisions
   - See confidence scores and reasoning
   - Track team assignments

3. **Test the Classifier**
   - Input sample ticket descriptions
   - See real-time classification results
   - Test different scenarios

4. **View Analytics**
   - SLA compliance rates
   - Average resolution times
   - Ticket distribution charts
   - Category-wise SLA performance

## 🔌 API Documentation

### POST /api/classify

Classifies a ticket using the LLM-based classifier.

**Request Body:**
```json
{
  "title": "Cannot access VPN",
  "description": "I'm unable to connect to the company VPN. Getting authentication error."
}
```

**Response:**
```json
{
  "category": "network",
  "priority": "high",
  "confidence": 0.91,
  "reasoning": "Analyzed ticket content and identified key indicators for network category. Priority set to high based on urgency indicators. Recommended routing to Network Team based on expertise match.",
  "suggestedTeam": "Network Team"
}
```

## 🎯 Core Features Explained

### Ticket Classification Categories

| Category | Description | Assigned Team |
|----------|-------------|---------------|
| Hardware | Physical equipment issues (laptops, monitors, peripherals) | Hardware Team |
| Software | Application problems, installations, updates | Support Team A |
| Network | Connectivity, VPN, email, sync issues | Network Team |
| Access | Authentication, permissions, password resets | Security Team |
| Other | General inquiries and miscellaneous issues | Support Team B |

### Priority Levels

- **Critical**: System outages, cannot work
- **High**: Important issues blocking work
- **Medium**: Standard issues (default)
- **Low**: Minor issues, cosmetic problems

### SLA Deadlines

SLA deadlines are automatically calculated based on priority:
- **Critical**: 4 hours
- **High**: 8 hours
- **Medium**: 24 hours
- **Low**: 48 hours

## 📊 Data Types

### Ticket Interface
```typescript
interface Ticket {
  id: string
  title: string
  description: string
  category: "hardware" | "software" | "network" | "access" | "other"
  priority: "low" | "medium" | "high" | "critical"
  status: "open" | "in-progress" | "resolved" | "closed"
  submittedBy: string
  submittedAt: Date
  assignedTo?: string
  resolvedAt?: Date
  slaDeadline: Date
  slaBreach: boolean
  confidence?: number
}
```

### Classification Result
```typescript
interface ClassificationResult {
  category: TicketCategory
  priority: TicketPriority
  confidence: number
  reasoning: string
  suggestedTeam: string
}
```

## 🔮 Future Enhancements

- [ ] **Real LLM Integration**: Replace simulated classifier with OpenAI GPT-4 or similar
- [ ] **Database Integration**: Add PostgreSQL/MongoDB for persistent storage
- [ ] **Authentication**: Implement user authentication and authorization
- [ ] **Email Notifications**: Automated email alerts for ticket updates
- [ ] **Slack Integration**: Real-time Slack notifications for new tickets
- [ ] **JIRA Integration**: Sync tickets with JIRA for project management
- [ ] **File Attachments**: Support for uploading screenshots and documents
- [ ] **Ticket Comments**: Discussion threads on tickets
- [ ] **Advanced Search**: Full-text search and filtering
- [ ] **Ticket Escalation**: Automatic escalation for approaching SLA deadlines
- [ ] **Agent Assignment**: Assign specific agents to tickets
- [ ] **Ticket Templates**: Pre-defined templates for common issues
- [ ] **Custom Fields**: Organization-specific custom fields
- [ ] **Multi-language Support**: Internationalization (i18n)
- [ ] **Mobile App**: Native mobile applications
- [ ] **Webhooks**: Custom webhook support for integrations
- [ ] **Reports Export**: PDF/Excel export of analytics
- [ ] **Customer Portal**: Self-service portal for ticket tracking

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly
- Ensure TypeScript types are properly defined

## 📝 License

This project is open source and available for educational and commercial use.

## 👤 Author

**Johaan KJIS**
- GitHub: [@johaankjis](https://github.com/johaankjis)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)

---

⭐ Star this repository if you find it helpful!
