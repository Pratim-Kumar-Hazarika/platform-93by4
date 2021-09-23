import { AllFieldsType } from './allFields'

export const marksheetFields: Array<AllFieldsType> = [
  {
    title: 'Live Coding',
    rows: [
      [
        {
          placeHolder: 'Ramesh',
          name: 'parent-name',
          type: 'text',
          label: 'Parent / Guardian Name',
          isRequired: true,
        },
        {
          placeHolder: '9999999999',
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          isRequired: true,
        },
        {
          placeHolder: 'India',
          name: 'country',
          type: 'text',
          label: 'Country of Residence',
          isRequired: true,
        },
      ],
      [
        {
          placeHolder: 'Ramesh',
          name: 'parent-name',
          type: 'text',
          label: 'Parent / Guardian Name',
          isRequired: true,
        },
        {
          placeHolder: '9999999999',
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          isRequired: true,
        },
        {
          placeHolder: 'India',
          name: 'country',
          type: 'text',
          label: 'Country of Residence',
          isRequired: true,
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'financial-aid-check',
          type: 'checkbox',
          label: 'Can be a captain',
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'financial-aid-check',
          type: 'checkbox',
          label: 'Applicable for financial Aid',
        },
      ],
    ],
  },
]
