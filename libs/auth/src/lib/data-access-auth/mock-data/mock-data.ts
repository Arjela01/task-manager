export const TaskData = [
  {
    id: 1,
    name: 'Task 1',
    description: 'Description 1',
    status: 'todo',
    assignedTo: 'employee@example.com',
    dueDate: '2024-07-24T22:00:00.000Z',
    comments: [
      {
        id: 1,
        text: 'Initial comment on Task 1',
        author: 'Alice',
        timestamp: new Date('2023-07-24T10:00:00'),
      },
      {
        id: 2,
        text: 'Another comment on Task 1',
        author: 'Bob',
        timestamp: new Date('2023-07-24T12:00:00'),
      },
    ],
    attachments: [
      {
        id: 1,
        fileName: 'task1_doc1.pdf',
        fileUrl: 'https://example.com/task1_doc1.pdf',
      },
      {
        id: 2,
        fileName: 'task1_doc2.png',
        fileUrl: 'https://example.com/task1_doc2.png',
      },
    ],
  },
  {
    id: 2,
    name: 'Task 2',
    description: 'Description 2',
    status: 'inProgress',
    assignedTo: 'employee@example.com',
    dueDate: '2024-07-24T22:00:00.000Z',
    comments: [
      {
        id: 1,
        text: 'Initial comment on Task 2',
        author: 'Charlie',
        timestamp: new Date('2023-07-25T09:00:00'),
      },
    ],
    attachments: [
      {
        id: 1,
        fileName: 'task2_image1.jpg',
        fileUrl: 'https://example.com/task2_image1.jpg',
      },
    ],
  },
  {
    id: 3,
    name: 'Task 3',
    description: 'Description 3',
    status: 'done',
    dueDate: '2024-07-24T22:00:00.000Z',
    assignedTo: 'employee@example.com',
    comments: [
      {
        id: 1,
        text: 'Initial comment on Task 3',
        author: 'Dave',
        timestamp: new Date('2023-07-26T11:00:00'),
      },
    ],
    attachments: [
      {
        id: 1,
        fileName: 'task3_report.pdf',
        fileUrl: 'https://example.com/task3_report.pdf',
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
