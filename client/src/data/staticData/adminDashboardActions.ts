import { v4 as uuid } from 'uuid'

export const adminDashboardActions = [
  {
    id: uuid(),
    title: 'Check the review guide.',
    link: '/dashboard/review-portfolios',
  },
  {
    id: uuid(),
    title: 'Proceed to review more portfolios.',
    link: '/admin/review-portfolios',
  },
]
