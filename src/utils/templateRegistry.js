
import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3';
import Template4 from '../components/templates/Template4';
import Template5 from '../components/templates/Template5';
import Template6 from '../components/templates/Template6';
import Template7 from '../components/templates/Template7';
import Template8 from '../components/templates/Template8';
import Template9 from '../components/templates/Template9';
import Receipt1 from '../components/templates/Receipt1';
import Receipt2 from '../components/templates/Receipt2';
import Receipt3 from '../components/templates/Receipt3';
import Receipt4 from '../components/templates/Receipt4';

export const templates = [
  { name: 'Template 1', component: Template1 },
  { name: 'Template 2', component: Template2 },
  { name: 'Template 3', component: Template3 },
  { name: 'Template 4', component: Template4 },
  { name: 'Template 5', component: Template5 },
  { name: 'Template 6', component: Template6 },
  { name: 'Template 7', component: Template7 },
  { name: 'Template 8', component: Template8 },
  { name: 'Template 9', component: Template9 },
];

export const receiptTemplates = [
  { name: 'Receipt 1', component: Receipt1 },
  { name: 'Receipt 2', component: Receipt2 },
  { name: 'Receipt 3', component: Receipt3 },
  { name: 'Receipt 4', component: Receipt4 },
];

export const getTemplate = (templateNumber) => {
  return templates[templateNumber - 1]?.component || templates[0].component;
};

export const getReceiptTemplate = (templateNumber) => {
  return receiptTemplates[templateNumber - 1]?.component || receiptTemplates[0].component;
};
