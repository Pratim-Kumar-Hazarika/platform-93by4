export interface CheckBoxField {
  name: string
  type: 'checkbox'
  label: string
  isRequired?: boolean
  note?: string
}

export interface TextField {
  name: string
  type: 'text' | 'email' | 'textarea' | 'number'
  placeHolder: string
  editable?: boolean
  label?: string
  isRequired?: boolean
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
  isRequired?: boolean
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
<<<<<<< HEAD
          placeHolder: 'Son',
          name: 'parent-relation',
          type: 'text',
          label: "Parent / Guardian's Gender",
          isRequired: true,
        },
        {
          label: 'State of Residence',
=======
          placeHolder: 'Son/Daughter',
          name: 'parent-relation',
          type: 'text',
          label: "Parent / Guardian's Relation*",
        },
        {
          label: 'State of Residence*',
>>>>>>> fdce0e268a518ce239b85eb241b22b76682e1d5a
          name: 'state',
          type: 'text',
          placeHolder: 'Maharashtra',
          isRequired: true,
        },
        {
          placeHolder: 'Mumbai',
          name: 'city',
          type: 'text',
          label: 'City of Residence',
          isRequired: true,
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
          label: 'Discord ID',
          isRequired: true,
        },
        {
          name: 'twitter-url',
          type: 'text',
          placeHolder: 'https://twitter.com/adarsh101',
          label: 'Twitter URL',
        },
      ],
      [
        {
          name: 'telegram-id',
          type: 'text',
          placeHolder: '123456',
          label: 'Telegram ID',
        },
        {
          name: 'linkedin-url',
          type: 'text',
          placeHolder: 'https://www.linkedin.com/in/adarshbalika/',
          label: 'LinkedIn URL',
          isRequired: true,
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
          placeHolder: 'Educational Status',
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
          isRequired: true,
        },
      ],
      [
        {
          name: 'have-cs-background',
          type: 'select',
          placeHolder: 'Are you from a CS Background',
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
          isRequired: true,
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
          label: 'Tell us about your educational background or latest degree',
          isRequired: true,
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
          label: 'Why should I get in levelOne?',
          isRequired: true,
        },
      ],
    ],
  },
  {
    title: '',
    rows: [
      [
        {
          name: 'how-you-get-to-know-about-neog',
          type: 'textarea',
          placeHolder: 'One of my friend is a neograd ...',
          label: 'Where did you get to know about neoG Camp?',
          isRequired: true,
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
          placeHolder: 'Reason to join the Camp',
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
          isRequired: true,
        },
        {
          name: 'mode-of-payment',
          type: 'select',
          placeHolder: 'Mode of Payment',
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
          isRequired: true,
        },
      ],
      [
        {
          name: 'year-of-graduation',
          type: 'number',
          label: 'Year of Graduation',
          placeHolder: 'Year of Graduation',
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
          label:
            'I confirm that I will graduate by June 2022 and my family income is less than 50,000 rupees per month and i am ready to provide documents to support the same once selected.',
          note: 'Note: Only students graduating till next year are eligible.',
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'correct-info-check',
          type: 'checkbox',
          label:
            'I confirm and agree that all data, informatiom (including supplemental information,if any) provided by me in the application or the platform is true and that I am the person submitting this application.',
          isRequired: true,
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'agree-policy-check',
          type: 'checkbox',
          label:
            'I confirm and agree I have read all the policies including Privacy policy and Terms and Conditions on the website before submitting this application.',
          isRequired: true,
        },
      ],
    ],
  },
]
