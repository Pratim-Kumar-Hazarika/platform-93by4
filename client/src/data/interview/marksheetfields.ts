import { AllFieldsType } from './allFields'

export const marksheetFields: Array<AllFieldsType> = [
  {
    title: 'Live Coding',
    rows: [
      [
        {
          placeHolder: '/15',
          name: 'Input',
          type: 'text',
          label: 'Input',
          isRequired: true,
        },
        {
          placeHolder: '/25',
          name: 'Processing',
          type: 'text',
          label: 'Processing',
          isRequired: true,
        },
        {
          placeHolder: '/10',
          name: 'Output',
          type: 'text',
          label: 'Output',
          isRequired: true,
        },
      ],
      [
        {
          placeHolder: '/10',
          name: 'Conceptual-Questions',
          type: 'text',
          label: 'Conceptual Questions',
          isRequired: true,
        },
        {
          placeHolder: '/10',
          name: 'During-live-coding',
          type: 'text',
          label: 'During live Coding',
          isRequired: true,
        },
        {
          placeHolder: '/10',
          name: 'Communication',
          type: 'text',
          label: 'Comunication',
          isRequired: true,
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'captain-check',
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
