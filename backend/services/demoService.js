import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demoDataPath = path.join(__dirname, 'demoData.json');

let demoData = null;

const loadDemoData = () => {
  if (!demoData) {
    const rawData = fs.readFileSync(demoDataPath, 'utf8');
    demoData = JSON.parse(rawData);
  }
  return demoData;
};

export const getDemoUser = (email) => {
  const data = loadDemoData();
  return data.users.find(u => u.email === email) || null;
};

export const getDemoUsers = () => {
  const data = loadDemoData();
  return data.users || [];
};

export const getDemoEmployees = (filter = {}) => {
  const data = loadDemoData();
  let employees = data.employees || [];
  
  if (filter.department) {
    employees = employees.filter(e => e.department === filter.department);
  }
  if (filter.position) {
    employees = employees.filter(e => e.position === filter.position);
  }
  
  return employees;
};

export const getDemoEmployee = (id) => {
  const data = loadDemoData();
  return data.employees.find(e => e._id === id || e.employeeId === id) || null;
};

export const getDemoAssessments = (filter = {}) => {
  const data = loadDemoData();
  let assessments = data.assessments || [];
  
  if (filter.employeeId) {
    assessments = assessments.filter(a => a.employeeId === filter.employeeId);
  }
  
  return assessments;
};

export const getDemoTrainingFlags = (filter = {}) => {
  const data = loadDemoData();
  let flags = data.trainingFlags || [];
  
  if (filter.employeeId) {
    flags = flags.filter(f => f.employeeId === filter.employeeId);
  }
  if (filter.status) {
    flags = flags.filter(f => f.status === filter.status);
  }
  
  return flags;
};

export const getDemoDepartments = () => {
  const data = loadDemoData();
  return data.departments || [];
};

export const getDemoDashboardStats = () => {
  const data = loadDemoData();
  const employees = data.employees || [];
  
  return {
    totalEmployees: employees.length,
    averageEngagement: (employees.reduce((sum, e) => sum + e.engagementScore, 0) / employees.length).toFixed(1),
    promotionReady: employees.filter(e => e.promotionReadiness > 80).length,
    skillGaps: data.trainingFlags.length,
    departments: data.departments.length
  };
};

export default {
  getDemoUser,
  getDemoUsers,
  getDemoEmployees,
  getDemoEmployee,
  getDemoAssessments,
  getDemoTrainingFlags,
  getDemoDepartments,
  getDemoDashboardStats,
  loadDemoData
};
