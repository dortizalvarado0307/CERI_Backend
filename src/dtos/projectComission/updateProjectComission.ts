export interface UpdateProjectDTO {
  name?: string;
  general_objective?: string;
  id_type_initiative?: number;
  id_classification_management_area?: number;
  id_clasification_meta_population?: number;
  id_person_in_charge?: number;
  id_university_body?: number;
  id_user?: number;
  active?: boolean;

  regions?: number[];
  universities?: number[];
}