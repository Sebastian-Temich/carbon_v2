/* eslint-disable prettier/prettier */
import { ImgFileTypes } from '@custom-types/img-types';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { OffsetFormikTypes } from '@custom-types/offset-types';
import { PatchResponseOffset } from '@custom-types/offsets-types';
import { PatchProjectPayload } from '@custom-types/projects-types';
import { modalStore } from '@store/modal-store';
import { offsetDetailsStore } from '@store/offset-store';
import { ModalTypes } from '@variables/modal-variables';
import dayjs from 'dayjs';
import { FormikValues } from 'formik';

interface Props {
  offsetId: string | undefined;
  values: FormikValues;
  initialValue: OffsetFormikTypes;
  setErrors: (errors: any) => void;
  imageFile: ImgFileTypes | null;
  t: any;
}

export const offsetProjectPayload = async ({
  offsetId,
  values,
  initialValue,
  setErrors,
  imageFile,
  t,
}: Props): Promise<boolean> => {
  const { updateOffset, updateProject } = offsetDetailsStore;
  const {
    projectId,
    shortDescription,
    unitCount,
    unitCreationYear,
    unitPrice,
    unitType,
    currencyId,
    statusId,
    auditUnit,
    name,
    description,
    address,
    countryId,
    projectStandard,
    startDate,
    circularity,
    expectedEndDate,
    unitGenerationDate,
    sustainableDevelopmentGoalIds,
  } = values;
  const payloadProject: PatchProjectPayload = {
    name: initialValue.name === name ? undefined : name,
    description: initialValue.description === description ? undefined : description,
    address: initialValue.address === address ? undefined : address,
    countryId: initialValue.countryId === countryId ? undefined : countryId,
    projectStandard:
      initialValue.projectStandard === projectStandard
        ? undefined
        : {
            existingProjectStandardId: projectStandard,
          },
    startDate:
      initialValue.startDate?.toString() === startDate?.toString()
        ? undefined
        : dayjs(startDate).format(),
    expectedEndDate:
      initialValue.expectedEndDate?.toString() === expectedEndDate?.toString()
        ? undefined
        : dayjs(expectedEndDate).format(),
    unitGenerationStartDate:
      initialValue.unitGenerationDate &&
      initialValue.unitGenerationDate[0].toString() === unitGenerationDate[0].toString()
        ? undefined
        : dayjs(unitGenerationDate[0]).format(),
    unitGenerationEndDate:
      initialValue.unitGenerationDate &&
      initialValue.unitGenerationDate[1].toString() === unitGenerationDate[1].toString()
        ? undefined
        : dayjs(unitGenerationDate[1]).format(),
    circularity: initialValue.circularity === circularity ? undefined : circularity,
    sustainableDevelopmentGoalIds:
      initialValue.sustainableDevelopmentGoalIds &&
      initialValue.sustainableDevelopmentGoalIds.toString() ===
        sustainableDevelopmentGoalIds.toString()
        ? undefined
        : sustainableDevelopmentGoalIds,
    image: imageFile
      ? {
          contentAsBase64: imageFile?.contentAsBase64,
          contentType: imageFile?.contentType,
        }
      : undefined,
  };
  const payloadOffset: PatchResponseOffset = {
    shortDescription:
      initialValue.shortDescription === shortDescription ? undefined : shortDescription,
    unitCount: initialValue.unitCount === unitCount ? undefined : unitCount,
    unitCreationYear:
      initialValue.unitCreationYear?.toString() === unitCreationYear?.toString()
        ? undefined
        : dayjs(unitCreationYear).format('YYYY-MM-DD'),
    unitPrice: initialValue.unitPrice === unitPrice ? undefined : unitPrice,
    currencyId: initialValue.currencyId === currencyId ? undefined : currencyId,
    unitType:
      initialValue.unitType === unitType
        ? undefined
        : {
            existingOffsetUnitTypeId: unitType,
          },
    auditUnit:
      initialValue.auditUnit === auditUnit
        ? undefined
        : {
            existingOffsetAuditUnitId: auditUnit,
          },
    statusId: initialValue.statusId === statusId ? undefined : statusId,
  };

  const allPayloadUndefined = (payload: PatchResponseOffset | PatchProjectPayload) =>
    Object.values(payload).find((elem) => elem !== undefined);
  if (allPayloadUndefined(payloadOffset) !== undefined) {
    const response = await updateOffset(payloadOffset, offsetId);
    if (response.isUnsuccessful()) {
      if (response.isValidationError()) setErrors(response.validationErrors);
      return false;
    }

    modalStore.push({
      title: t('offer.updatedVerificationModalTitle'),
      content: t('offer.updatedVerificationModalContent'),
      type: ModalTypes.Info,
    });
  }

  if (allPayloadUndefined(payloadProject) !== undefined) {
    const response = await updateProject(payloadProject, projectId);
    if (response.isUnsuccessful()) {
      if (response.isValidationError()) setErrors(response.validationErrors);
      return false;
    }

    modalStore.push({
      title: t('project.edit.projectVerificationModalTitle'),
      content: t('project.edit.projectVerificationModalContent'),
      type: ModalTypes.Info,
    });
  }

  return true;
};
