export interface JobOpening {
  JobOpeningMasterId: number;
  UniqueKey: string;

  DepartmentMasterId: number;
  JobRoleMasterId: number;

  DepartmentName: string;
  JobRoleName: string;

  JobDescription: string;
  JobResponsibilities: string;
  JobRequirement: string;
  JobQualification: string;
  JobSkills: string;

  WorkMode: string;

  ExperienceYears: number;
  ExperienceMonths: number;

  NumberOfOpenings: number;

  WorkLocation: string;
  EmploymentType: string;

  JobRoleStatus: boolean;
  IsActive: boolean;

  CreatedById: number;
  CreatedBy: string;
  CreatedDate: string;

  ModifiedById: number;
  ModifiedBy: string;
  ModifiedDate: string | null;

  DeletedById: number;
  DeletedDate: string | null;

  IsDeleted: boolean;

  ClientRegistrationId: number;
}

export interface ApplicationFormSubmitResponse {
    
}

export type JobOpeningResponse = JobOpening[];
