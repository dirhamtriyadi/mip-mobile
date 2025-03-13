export type SurveiFormData = {
  name: string;
  address: string;
  number_ktp: string;
  address_status: string;
  phone_number: string;
  npwp: string;
  company_name: string;
  employee_tenure: string;
  job_level: string;
  employee_status: string;
  job_type: string;
  salary: number;
  other_business: number;
  monthly_living_expenses: number;
  children: string;
  wife: string;
  couple_jobs: string;
  couple_business: string;
  couple_income: number;
  bank_debt: number;
  cooperative_debt: number;
  personal_debt: number;
  online_debt: number;
  customer_character_analysis: string;
  financial_report_analysis: string;
  slik_result: string;
  info_provider_name: string;
  info_provider_position: string;
  workplace_condition: string;
  employee_count: string;
  business_duration: string;
  office_address: string;
  office_phone: string;
  loan_application: number;
  recommendation_from_vendors: string;
  recommendation_from_treasurer: string;
  recommendation_from_other: string;
  source_1_full_name: string;
  source_1_gender: string;
  source_1_source_relationship: string;
  source_1_source_character: string;
  source_1_knows_prospect_customer: string;
  source_1_prospect_lives_at_address: string;
  source_1_length_of_residence: string;
  source_1_house_ownership_status: string;
  source_1_prospect_status: string;
  source_1_number_of_dependents: string;
  source_1_prospect_character: string;
  source_2_full_name: string;
  source_2_gender: string;
  source_2_source_relationship: string;
  source_2_source_character: string;
  source_2_knows_prospect_customer: string;
  source_2_prospect_lives_at_address: string;
  source_2_length_of_residence: string;
  source_2_house_ownership_status: string;
  source_2_prospect_status: string;
  source_2_number_of_dependents: string;
  source_2_prospect_character: string;
  recommendation_pt: string;
  descriptionSurvey: string;
  locationSurvey: string;
  dateSurvey: Dayjs;
  latitude: number;
  longitude: number;
  locationString: string;
  signature_officer: string | null;
  signature_customer: string | null;
  signature_couple: string | null;
  workplace_image1: {uri: string} | null;
  workplace_image2: {uri: string} | null;
  customer_image: {uri: string} | null;
  ktp_image: {uri: string} | null;
  loan_guarantee_image1: {uri: string} | null;
  loan_guarantee_image2: {uri: string} | null;
  kk_image: {uri: string} | null;
  id_card_image: {uri: string} | null;
  salary_slip_image1: {uri: string} | null;
  salary_slip_image2: {uri: string} | null;
};
