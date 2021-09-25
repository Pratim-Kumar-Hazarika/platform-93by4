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
          name: 'Conceptual_Questions',
          type: 'text',
          label: 'Conceptual Questions',
          isRequired: true,
        },
        {
          placeHolder: '/10',
          name: 'During_live_coding',
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
          name: 'captain_check',
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
          name: 'financial_aid_check',
          type: 'checkbox',
          label: 'Applicable for financial Aid',
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'feedback_box',
          type: 'textarea',
          label: 'Feedbacks',
          placeHolder:"Feedbacks"
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'Passing_status',
          type: 'select',
          placeHolder: 'Passing Status',
          options: [
            {
              value: 'Please Select the Passing Status',
              name: 'Please Select the  Passing Status',
            },
            {
              value: 'Parked',
              name: 'Parked',
            },
            {
              value: 'Passed',
              name: 'Passed',
            },
            {
              value: 'Rejected',
              name: 'Rejected',
            },
          ],
          isRequired: true,
        },
      ],
    ],
  },
]
