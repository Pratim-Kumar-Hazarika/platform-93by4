export const uploadDocumentsData = {
  heading: 'Upload your documents',
  documentRevisionHeading:'Your Application needs revision',
}

export const uploadDocumentsAllFields = [
  {
    rows: [
      [
        {
          name: 'provide-document-financial-aid',
          type: 'checkbox',
          label:
            'I agree to provide these documents for Financial Aid Scholarship.',
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'terms-for-financial-aid',
          type: 'checkbox',
          label:
            'I have read all the terms related to Financial Aid Scholarship.',
          isRequired: true,
        },
      ],
    ],
  },
  {
    rows: [
      [
        {
          name: 'company-can-use-documents',
          type: 'checkbox',
          label:
            'I understand that these documents will be used by the Company for the same.',
          isRequired: true,
        },
      ],
    ],
  },
]
