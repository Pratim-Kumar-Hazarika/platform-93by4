import * as yup from 'yup'

export const ReviewSchema = yup.object({
  mark15Ready: yup
    .boolean()
    .required('Please state whether portfolio is mark15 Ready or not.'),
  reviewComment: yup
    .string()
    .required('A comment about portfolio is expected.'),
  portfolioId: yup
    .string()
    .required('Make sure to include portfolio ID in POST body.'), // for __DEV__ only

  /** These are kept here because TS Union type is not working with Yup inferType*/
  projects: yup.number().max(15).required('Project marks are expected'),
  blogs: yup.number().max(2).required('Marks for blogs are expected'),
  effort: yup.number().max(2).required('Marks for effort are expected.'),
  linkedin: yup.number().max(1).required('Marks for linked are required.'),
})

export type ReviewBody = yup.InferType<typeof ReviewSchema>
