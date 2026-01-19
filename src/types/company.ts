export type CompanyUser = {
  id: number;
  name: string;
  email: string;
  role: "employer";
  is_active: number;
  suspended_at: string | null;
};

export type Company = {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  website: string | null;
  user: CompanyUser;
};
