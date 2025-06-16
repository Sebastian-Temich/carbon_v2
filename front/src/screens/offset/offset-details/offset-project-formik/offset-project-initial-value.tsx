import { OffsetFormikTypes } from '@custom-types/offset-types';
import { ResponseOffset } from '@custom-types/offsets-types';

export function useInitialValue(offsetDetails: ResponseOffset | null) {
  const formatDateCalendar = (formatingDate: string | number | Date) =>
    new Date(formatingDate) as unknown as string;
  const initialValue: OffsetFormikTypes = {
    projectId: offsetDetails?.project.id,
    shortDescription: offsetDetails?.shortDescription,
    unitCreationYear:
      offsetDetails?.unitCreationYear && formatDateCalendar(offsetDetails?.unitCreationYear),
    unitCount: offsetDetails?.unitCount,
    unitPrice: offsetDetails?.unitPrice,
    currencyId: offsetDetails?.currency.id,
    unitType: offsetDetails?.unitType.id,
    auditUnit: offsetDetails?.auditUnit.id,
    statusId: offsetDetails?.offsetStatus.id,
    name: offsetDetails?.project.name,
    description: offsetDetails?.project.description,
    address: offsetDetails?.project.address,
    countryId: offsetDetails?.project.country.id,
    sustainableDevelopmentGoalIds: offsetDetails?.project?.sustainableDevelopmentGoals.map(
      (elem) => elem.id,
    ),
    projectStandard: offsetDetails?.project.projectStandard.id,
    startDate:
      offsetDetails?.project.startDate && formatDateCalendar(offsetDetails?.project.startDate),
    expectedEndDate:
      offsetDetails?.project.expectedEndDate &&
      formatDateCalendar(offsetDetails?.project.expectedEndDate),
    unitGenerationDate: offsetDetails && [
      formatDateCalendar(offsetDetails?.project.unitGenerationStartDate),
      formatDateCalendar(offsetDetails?.project.unitGenerationEndDate),
    ],
    circularity: offsetDetails?.project.circularity,
  };
  return { initialValue };
}
