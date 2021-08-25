export interface CheckBoxField {
  name: string
  type: 'checkbox'
  label: string
}

export interface TextField {
  name: string
  type: 'text' | 'email' | 'textarea'
  placeHolder: string
  editable?: boolean
  label?: string
}

export interface OptionField {
  value: string
  name: string
}

export interface SelectField {
  name: string
  placeHolder: string
  type: 'select'
  options: Array<OptionField>
}

export interface AllFieldsType {
  title?: string
  rows: Array<Array<TextField | SelectField | CheckBoxField>>
}

export const allFields: Array<AllFieldsType> = [
  {
    title: 'Personal Details',
    rows: [
      [
        {
          placeHolder: 'Ramesh',
          name: 'parent-name',
          type: 'text',
          label: 'Parent / Guardian Name*',
        },
        {
          placeHolder: 'Phone Number*',
          name: 'phone',
          type: 'text',
          label: 'Phone Number*',
        },
        {
          placeHolder: 'Country of Residence*',
          name: 'country',
          type: 'text',
          label: 'Country of Residence*',
        },
      ],
      [
        {
          placeHolder: 'Son/Daughter',
          name: 'parent-relation',
          type: 'text',
          label: "Parent / Guardian's Relation*",
        },
        {
          label: 'State of Residence*',
          name: 'state',
          type: 'text',
          placeHolder: 'Maharashtra',
        },
        {
          placeHolder: 'Mumbai',
          name: 'city',
          type: 'text',
          label: 'City of Residence*',
        },
      ],
    ],
  },
  {
    title: 'Social Details',
    rows: [
      [
        {
          name: 'discord-id',
          type: 'text',
          placeHolder: 'Adarsh#1010',
          label: 'Discord ID*',
        },
        {
          name: 'twitter-url',
          type: 'text',
          placeHolder: 'https://twitter.com/adarsh101',
          label: 'Twitter URL*',
        },
      ],
      [
        {
          name: 'telegram-id',
          type: 'text',
          placeHolder: '123456',
          label: 'Telegram ID*',
        },
        {
          name: 'linkedin-url',
          type: 'text',
          placeHolder: 'https://www.linkedin.com/in/adarshbalika/',
          label: 'LinkedIn URL*',
        },
      ],
    ],
  },
  {
    title: 'Educational Background',
    rows: [
      [
        {
          name: 'educational-status',
          type: 'select',
          placeHolder: 'Educational Status*',
          options: [
            {
              value: 'graduated',
              name: 'Graduated',
            },
            {
              value: 'undergraduate',
              name: 'Undergraduate',
            },
            {
              value: 'postgraduate',
              name: 'Postgraduate',
            },
          ],
        },
      ],
      [
        {
          name: 'have-cs-background',
          type: 'select',
          placeHolder: 'Are you from a CS Background*',
          options: [
            {
              value: 'yes',
              name: 'Yes',
            },
            {
              value: 'no',
              name: 'No',
            },
          ],
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'education-status-brief',
          type: 'textarea',
          placeHolder: 'Hey, i am adarsh a BTech Student....',
          label: 'Tell us about your educational background or latest degree*',
        },
      ],
    ],
  },
  {
    title: '',
    rows: [
      [
        {
          name: 'selection-reason',
          type: 'textarea',
          placeHolder: 'I have done levelZero ...',
          label: 'Why should I get in levelOne?*',
        },
      ],
    ],
  },
  {
    title: 'Additional Information',
    rows: [
      [
        {
          name: 'reason-for-joining',
          type: 'select',
          placeHolder: 'Reason to join the Camp*',
          options: [
            {
              value: 'graduated',
              name: 'Graduated',
            },
            {
              value: 'undergraduate',
              name: 'Undergraduate',
            },
            {
              value: 'postgraduate',
              name: 'Postgraduate',
            },
          ],
        },
        {
          name: 'mode-of-payment',
          type: 'select',
          placeHolder: 'Mode of Payment*',
          options: [
            {
              value: 'graduated',
              name: 'Graduated',
            },
            {
              value: 'undergraduate',
              name: 'Undergraduate',
            },
            {
              value: 'postgraduate',
              name: 'Postgraduate',
            },
          ],
        },
      ],
      [
        {
          name: 'year-of-graduation',
          type: 'select',
          placeHolder: 'Year of Graduation*',
          options: [
            {
              value: 'graduated',
              name: 'Graduated',
            },
            {
              value: 'undergraduate',
              name: 'Undergraduate',
            },
            {
              value: 'postgraduate',
              name: 'Postgraduate',
            },
          ],
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'financial-aid',
          type: 'checkbox',
          label:
            'I confirm that I will graduate by June 2022 and my family income is less than 50,000 rupees per month and i am ready to provide documents to support the same once selected.',
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'financial-aid',
          type: 'checkbox',
          label:
            'I confirm that I will graduate by June 2022 and my family income is less than 50,000 rupees per month and i am ready to provide documents to support the same once selected.',
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'financial-aid',
          type: 'checkbox',
          label:
            'I confirm that I will graduate by June 2022 and my family income is less than 50,000 rupees per month and i am ready to provide documents to support the same once selected.',
        },
      ],
    ],
  },
]
