/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: companies
 * Interface for Companies
 */
export interface Companies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  companyLogo?: string;
  /** @wixFieldType text */
  companyDescription?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType text */
  industry?: string;
  /** @wixFieldType text */
  headquartersLocation?: string;
}


/**
 * Collection ID: jobapplications
 * Interface for JobApplications
 */
export interface JobApplications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  candidateName?: string;
  /** @wixFieldType text */
  candidateEmail?: string;
  /** @wixFieldType text */
  candidatePhone?: string;
  /** @wixFieldType url */
  resumeFile?: string;
  /** @wixFieldType text */
  appliedJobTitle?: string;
}


/**
 * Collection ID: joblistings
 * Interface for ListagemdeVagas
 */
export interface ListagemdeVagas {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  jobDescription?: string;
  /** @wixFieldType text */
  requirements?: string;
  /** @wixFieldType text */
  jobLocation?: string;
  /** @wixFieldType text */
  salaryRange?: string;
  /** @wixFieldType text */
  jobCategory?: string;
  /** @wixFieldType text */
  employmentType?: string;
  /** @wixFieldType date */
  datePosted?: Date | string;
}
