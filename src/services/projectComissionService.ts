import prisma from '../config/db.js';
import { Prisma } from '@prisma/client';
import { CreateProjectDTO } from '../dtos/projectComission/createProjectCommission.js';
import { UpdateProjectDTO } from '../dtos/projectComission/updateProjectComission.js';
import ProjectFilters from '../types/filters.js';

const userSelect = {
  select: {
    id: true,
    name: true,
    email: true,
    active: true,
    id_role: true,
    role: true,
  },
} as const;

const projectIncludes = Prisma.validator<Prisma.projects_commissionsDefaultArgs>()({
  include: {
    type_initiative: true,
    classification_management_area: true,
    clasification_meta_population: true,
    person_in_charge: true,
    university_body: true,
    user: userSelect,
    projects_commissions_region: {
      include: { region: true },
    },
    projects_commissions_university: {
      include: { university: true },
    },
  },
});

export const getAllProjectComission = async (page?: number, limit?: number) => {
  if (page && limit) {
    const [data, total] = await Promise.all([
      prisma.projects_commissions.findMany({
        where: { active: true },
        ...projectIncludes,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      prisma.projects_commissions.count({ where: { active: true } }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  return await prisma.projects_commissions.findMany({
    where: { active: true },
    ...projectIncludes,
  });
};

export const getProjectComissionById = async (id: number) => {
  return await prisma.projects_commissions.findUnique({
    where: { id },
    ...projectIncludes,
  });
};

export const getProjectComissionByFilters = async (filters: ProjectFilters) => {
  const where: Prisma.projects_commissionsWhereInput = { active: true };

  if (filters.id_type_initiative?.length) {
    where.id_type_initiative = { in: filters.id_type_initiative };
  }
  if (filters.id_classification_management_area?.length) {
    where.id_classification_management_area = { in: filters.id_classification_management_area };
  }
  if (filters.id_clasification_meta_population?.length) {
    where.id_clasification_meta_population = { in: filters.id_clasification_meta_population };
  }
  if (filters.id_person_in_charge?.length) {
    where.id_person_in_charge = { in: filters.id_person_in_charge };
  }
  if (filters.id_university_body?.length) {
    where.id_university_body = { in: filters.id_university_body };
  }
  if (filters.id_user?.length) {
    where.id_user = { in: filters.id_user };
  }
  if (filters.id_region?.length) {
    where.projects_commissions_region = {
      some: { id_region: { in: filters.id_region } },
    };
  }
  if (filters.id_university?.length) {
    where.projects_commissions_university = {
      some: { id_university: { in: filters.id_university } },
    };
  }

  return await prisma.projects_commissions.findMany({
    where,
    ...projectIncludes,
  });
};

export const createProjectComission = async (data: CreateProjectDTO) => {
  return await prisma.projects_commissions.create({
    data: {
      name: data.name,
      general_objective: data.general_objective,
      id_type_initiative: data.id_type_initiative,
      id_classification_management_area: data.id_classification_management_area,
      id_clasification_meta_population: data.id_clasification_meta_population,
      id_person_in_charge: data.id_person_in_charge,
      id_university_body: data.id_university_body,
      id_user: data.id_user,
      codigo: data.codigo,
      fecha_inicio: data.fecha_inicio ? new Date(data.fecha_inicio) : undefined,
      fecha_fin: data.fecha_fin ? new Date(data.fecha_fin) : undefined,
      projects_commissions_region: {
        create: data.regions.map(regionId => ({ id_region: regionId })),
      },
      projects_commissions_university: {
        create: data.universities.map(universityId => ({ id_university: universityId })),
      },
    },
    ...projectIncludes,
  });
};

export const updateProjectComission = async (id: number, data: UpdateProjectDTO) => {
  return await prisma.$transaction(async (tx) => {
    await tx.projects_commissions.update({
      where: { id },
      data: {
        name: data.name,
        general_objective: data.general_objective,
        id_type_initiative: data.id_type_initiative,
        id_classification_management_area: data.id_classification_management_area,
        id_clasification_meta_population: data.id_clasification_meta_population,
        id_person_in_charge: data.id_person_in_charge,
        id_university_body: data.id_university_body,
        id_user: data.id_user,
        active: data.active,
        codigo: data.codigo,
        fecha_inicio: data.fecha_inicio ? new Date(data.fecha_inicio) : undefined,
        fecha_fin: data.fecha_fin ? new Date(data.fecha_fin) : undefined,
        ...(data.regions && {
          projects_commissions_region: {
            deleteMany: {},
            create: data.regions.map(regionId => ({ id_region: regionId })),
          },
        }),
        ...(data.universities && {
          projects_commissions_university: {
            deleteMany: {},
            create: data.universities.map(universityId => ({ id_university: universityId })),
          },
        }),
      },
    });

    return await tx.projects_commissions.findUnique({
      where: { id },
      ...projectIncludes,
    });
  });
};

export const deleteProjectComission = async (id: number) => {
  return await prisma.projects_commissions.update({
    where: { id },
    data: { active: false },
  });
};