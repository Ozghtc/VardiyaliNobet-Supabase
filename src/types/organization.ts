export interface Department {
  id: number;
  name: string;
  hospitalId: number;
}

export interface Section {
  id: number;
  name: string;
  departmentId: number;
}

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface OrganizationUnit {
  id: number;
  name: string;
  type: 'hospital' | 'department' | 'section';
  parentId: number | null;
}