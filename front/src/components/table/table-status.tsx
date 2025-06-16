/* eslint-disable no-plusplus */
import React, { FC } from 'react';
import { Tag, TagSeverityType } from 'primereact/tag';
import { OffsetStatus } from '@variables/offset-status-enum';

interface IProps {
  status: string;
}

type StatusType = {
  name: string;
  severity: TagSeverityType | undefined;
};

const STATUSES: StatusType[] = [
  {
    name: OffsetStatus.Pending,
    severity: 'warning',
  },
  {
    name: OffsetStatus.Accepted,
    severity: 'success',
  },
  {
    name: OffsetStatus.Rejected,
    severity: 'danger',
  },
  {
    name: OffsetStatus.NotListed,
    severity: 'info',
  },
  {
    name: OffsetStatus.Marketplace,
    severity: 'info',
  },
  {
    name: OffsetStatus.SoldOut,
    severity: 'info',
  },
  {
    name: OffsetStatus.MyOffer,
    severity: 'success',
  },
  {
    name: OffsetStatus.Retired,
    severity: 'warning',
  },
];

export const OffSetListStatus: FC<IProps> = ({ status }) => {
  const [newStatus] = STATUSES.filter((el) => el.name === status);
  return <Tag value={newStatus.name} severity={newStatus.severity} style={{ height: '23px' }} />;
};
