
import React from 'react';
import { getReceiptTemplate } from '../utils/templateRegistry';

const ReceiptTemplate = ({ data, templateNumber, isPrint = false }) => {
  const Template = getReceiptTemplate(templateNumber);
  return <Template data={data} isPrint={isPrint} />;
};

export default ReceiptTemplate;
