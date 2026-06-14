import  prisma from '../config/db.js';
import { CreateProjectDTO } from '../dtos/projectComission/createProjectCommission.js';   
import { UpdateProjectDTO } from '../dtos/projectComission/updateProjectComission.js';   
import  ProjectFilters  from '../types/filters.js';

export const getAllProjectComission = async () => {
    return await prisma.projects_commissions.findMany({
        where: {
            active: true
        },
        include: {
            type_initiative: true,
            classification_management_area: true,
            clasification_meta_population: true,
            person_in_charge: true,
            university_body: true,
            user: true,
            projects_commissions_region: {
                include: {
                    region: true
                }
            },
            projects_commissions_university: {
                include: {
                    university: true
                }
            }
        }

    });
}


export const getProjectComissionById = async (id: number) => {
    return await prisma.projects_commissions.findUnique({
        where: {
            id: id
        },
        include: {
            type_initiative: true,
            classification_management_area: true,
            clasification_meta_population: true,
            person_in_charge: true,
            university_body: true,
            user: true,
            projects_commissions_region: {
                include: {
                    region: true
                }
            },
            projects_commissions_university: {
                include: {
                    university: true
                }
            }
        }
    });
}


export const getProjectComissionByFilters = async (
  filters: ProjectFilters
) => {

  const where: any = {
    active: true
  };

  if (filters.id_type_initiative?.length) {
    where.id_type_initiative = {
      in: filters.id_type_initiative
    };
  }

  if (filters.id_classification_management_area?.length) {
    where.id_classification_management_area = {
      in: filters.id_classification_management_area
    };
  }

  if (filters.id_clasification_meta_population?.length) {
    where.id_clasification_meta_population = {
      in: filters.id_clasification_meta_population
    };
  }

  if (filters.id_person_in_charge?.length) {
    where.id_person_in_charge = {
      in: filters.id_person_in_charge
    };
  }

  if (filters.id_university_body?.length) {
    where.id_university_body = {
      in: filters.id_university_body
    };
  }

  if (filters.id_user?.length) {
    where.id_user = {
      in: filters.id_user
    };
  }

  if (filters.id_region?.length) {
    where.projects_commissions_region = {
      some: {
        id_region: {
          in: filters.id_region
        }
      }
    };
  }

  if (filters.id_university?.length) {
    where.projects_commissions_university = {
      some: {
        id_university: {
          in: filters.id_university
        }
      }
    };
  }

  return await prisma.projects_commissions.findMany({
    where,

    include: {
      type_initiative: true,
      classification_management_area: true,
      clasification_meta_population: true,
      person_in_charge: true,
      university_body: true,
      user: true,

      projects_commissions_region: {
        include: {
          region: true
        }
      },

      projects_commissions_university: {
        include: {
          university: true
        }
      }
    }
  });

};


export const createProjectComission = async (
  CreateProjectData: CreateProjectDTO
) => {

  return await prisma.projects_commissions.create({

    data: {
      name: CreateProjectData.name,
      general_objective:
        CreateProjectData.general_objective,
      id_type_initiative:
        CreateProjectData.id_type_initiative,
      id_classification_management_area:
        CreateProjectData.id_classification_management_area,
      id_clasification_meta_population:
        CreateProjectData.id_clasification_meta_population,
      id_person_in_charge:
        CreateProjectData.id_person_in_charge,
      id_university_body:
        CreateProjectData.id_university_body,
      id_user:
        CreateProjectData.id_user,

      projects_commissions_region: {
        create: CreateProjectData.regions.map(
          regionId => ({
            id_region: regionId
          })
        )
      },

      projects_commissions_university: {
        create: CreateProjectData.universities.map(
          universityId => ({
            id_university: universityId
          })
        )
      }
    },

    include: {
      type_initiative: true,
      university_body: true,
      person_in_charge: true,
      classification_management_area: true,
      clasification_meta_population: true,

      projects_commissions_region: {
        include: {
          region: true
        }
      },

      projects_commissions_university: {
        include: {
          university: true
        }
      }
    }

  });

};


export const updateProjectComission = async (
  id: number,
  updateProjectData: UpdateProjectDTO
) => {

  return await prisma.projects_commissions.update({
    where: {
      id
    },

    data: {
      name: updateProjectData.name,
      general_objective:
        updateProjectData.general_objective,
      id_type_initiative:
        updateProjectData.id_type_initiative,
      id_classification_management_area:
        updateProjectData.id_classification_management_area,
      id_clasification_meta_population:
        updateProjectData.id_clasification_meta_population,
      id_person_in_charge:
        updateProjectData.id_person_in_charge,
      id_university_body:
        updateProjectData.id_university_body,
      id_user:
        updateProjectData.id_user,
      active:
        updateProjectData.active,

      ...(updateProjectData.regions && {
        projects_commissions_region: {
          deleteMany: {},
          create: updateProjectData.regions.map(
            regionId => ({
              id_region: regionId
            })
          )
        }
      }),

      ...(updateProjectData.universities && {
        projects_commissions_university: {
          deleteMany: {},
          create: updateProjectData.universities.map(
            universityId => ({
              id_university: universityId
            })
          )
        }
      })
    },

    include: {
      projects_commissions_region: {
        include: {
          region: true
        }
      },
      projects_commissions_university: {
        include: {
          university: true
        }
      }
    }
  });

};


export const deleteProjectComission = async (id: number) => {
  return await prisma.projects_commissions.update({
    where: {
        id: id
    },
    data: {
        active: false
    }
  });
}


