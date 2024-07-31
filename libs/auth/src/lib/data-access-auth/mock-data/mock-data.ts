export const TaskData = [
  {
    id: 1,
    name: 'Develop Authentication Module',
    description: 'Implement login and registration functionalities using JWT.',
    status: 'todo',
    assignedTo: 'employee@example.com',
    dueDate: '2024-08-15T22:00:00.000Z',
    comments: [
      {
        id: 1,
        text: 'Initial setup for authentication started.',
        author: 'Alice',
        timestamp: new Date('2024-07-10T10:00:00'),
      },
      {
        id: 2,
        text: 'Reviewed the design document.',
        author: 'Bob',
        timestamp: new Date('2024-07-12T12:00:00'),
      },
    ],
    attachments: [
      {
        id: 1,
        fileName: 'auth_module_design.pdf',
        fileUrl: 'https://example.com/auth_module_design.pdf',
      },
      {
        id: 2,
        fileName: 'auth_flow_chart.png',
        fileUrl: 'https://example.com/auth_flow_chart.png',
      },
    ],
  },
  {
    id: 2,
    name: 'Create User Dashboard',
    description: 'Design and implement the user dashboard with necessary widgets.',
    status: 'inProgress',
    assignedTo: 'employee2@example.com',
    dueDate: '2024-08-10T22:00:00.000Z',
    comments: [
      {
        id: 1,
        text: 'Dashboard layout has been finalized.',
        author: 'Charlie',
        timestamp: new Date('2024-07-15T09:00:00'),
      },
      {
        id: 2,
        text: 'Started integrating API endpoints.',
        author: 'Charlie',
        timestamp: new Date('2024-07-20T14:00:00'),
      },
    ],
    attachments: [
      {
        id: 1,
        fileName: 'dashboard_wireframe.jpg',
        fileUrl: 'https://example.com/dashboard_wireframe.jpg',
      },
    ],
  },
  {
    id: 3,
    name: 'Write Unit Tests for Task Service',
    description: 'Ensure 100% code coverage for the Task Service module.',
    status: 'done',
    dueDate: '2024-07-30T22:00:00.000Z',
    assignedTo: 'employee@example.com',
    comments: [
      {
        id: 1,
        text: 'Initial tests written for CRUD operations.',
        author: 'Dave',
        timestamp: new Date('2024-07-18T11:00:00'),
      },
      {
        id: 2,
        text: 'Completed tests for edge cases.',
        author: 'Dave',
        timestamp: new Date('2024-07-25T16:00:00'),
      },
    ],
    attachments: [
      {
        id: 1,
        fileName: 'task_service_tests.pdf',
        fileUrl: 'https://example.com/task_service_tests.pdf',
      },
    ],
  },
  {
    id: 4,
    name: 'Optimize Database Queries',
    description: 'Improve the performance of database queries for the reporting module.',
    status: 'todo',
    assignedTo: 'admin@example.com',
    dueDate: '2024-09-01T22:00:00.000Z',
    comments: [
      {
        id: 1,
        text: 'Identified slow queries.',
        author: 'Alice',
        timestamp: new Date('2024-07-28T10:00:00'),
      },
    ],
    attachments: [
      {
        id: 1,
        fileName: 'query_performance_report.pdf',
        fileUrl: 'https://example.com/query_performance_report.pdf',
      },
    ],
  },
  {
    id: 5,
    name: 'Implement Notification System',
    description: 'Develop a real-time notification system for task updates.',
    status: 'inProgress',
    assignedTo: 'employee2@example.com',
    dueDate: '2024-08-20T22:00:00.000Z',
    comments: [
      {
        id: 1,
        text: 'WebSocket integration started.',
        author: 'Charlie',
        timestamp: new Date('2024-07-22T09:00:00'),
      },
      {
        id: 2,
        text: 'Basic notification UI designed.',
        author: 'Charlie',
        timestamp: new Date('2024-07-27T14:00:00'),
      },
    ],
    attachments: [
      {
        id: 1,
        fileName: 'notification_system_design.pdf',
        fileUrl: 'https://example.com/notification_system_design.pdf',
      },
    ],
  },
];

export const MockUsers = [
  {
    username: 'admin@example.com',
    password: 'admin123',
    token: 'admin-token-12345',
    displayName: 'Admin User',
    role: 'admin',
    isSuccessful: true,
  },
  {
    username: 'employee@example.com',
    password: 'employee123',
    token: 'employee-token-12345',
    displayName: 'Employee User',
    role: 'employee',
    isSuccessful: true,
  },
  {
    username: 'employee2@example.com',
    password: 'employee123',
    token: 'employee-token-12345',
    displayName: 'Employee User',
    role: 'employee',
    isSuccessful: true,
  },
];
