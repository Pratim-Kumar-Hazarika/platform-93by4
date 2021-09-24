import { Breadcrumbs, Layout, TableCard } from '../../components'
import { useAuth } from '../../context/AuthContext'
import { usePayment } from '../../context/PaymentContext/PaymentContext'
import withAuth from '../../context/WithAuth'
import { roundOff } from '../../utils/roundOff'

function Payment(): JSX.Element {
  const payAmount = 100
  const CGST = 0.09
  const SGST = 0.09
  const IGST = 0.18

  const breadcrumbsLinks = [
    { breadcrumbName: 'Dashboard', breadcrumbLink: '/dashboard' },
    {
      breadcrumbName: 'Payment',
      breadcrumbLink: '/interviewee/payment',
    },
  ]

  const { authState } = useAuth()
  const { openRazorpay } = usePayment()
  const tableProperties = [
    {
      label: 'Name',
      value: `${authState?.user?.firstName} ${authState?.user?.lastName}`,
    },
    { label: 'Email', value: authState?.user?.email || '' },
    { label: 'Phone', value: authState?.user?.phone || '' },
    { label: 'State', value: authState?.user?.state || '' },
    { label: 'Fee', value: `₹ ${payAmount.toFixed(2)}` },
    { label: 'Total', value: `₹ ${payAmount.toFixed(2)}` },
  ]
  if (authState?.user?.state?.toLocaleLowerCase().trim() === 'jharkhand') {
    tableProperties.push({
      label: 'CGST (9%)',
      value: `₹ ${roundOff(payAmount * CGST, 2).toFixed(2)}`,
    })
    tableProperties.push({
      label: 'SGST (9%)',
      value: `₹ ${roundOff(payAmount * SGST, 2).toFixed(2)}`,
    })
    tableProperties.push({
      label: 'Total',
      value: `₹ ${roundOff(payAmount * (1 + (CGST + SGST)), 2).toFixed(2)}`,
    })
  } else {
    tableProperties.push({
      label: 'IGST (18%)',
      value: `₹ ${roundOff(payAmount * IGST, 2).toFixed(2)}`,
    })
    tableProperties.push({
      label: 'Total',
      value: `₹ ${roundOff(payAmount * (1 + IGST), 2).toFixed(2)}`,
    })
  }

  async function onClickHandler(): Promise<void> {
    const updateOptions = {
      name: 'NEOG',
      description: 'Payment for interview',
    }
    await openRazorpay(
      payAmount * (1 + IGST),
      'INR',
      'interview',
      updateOptions
    )
  }

  return (
    <Layout title="payment">
      <Breadcrumbs breadcrumbProp={breadcrumbsLinks} />
      <TableCard
        title="Interview Fee"
        key="table-card-fee-payment"
        btnText="Pay now"
        onClickHandler={onClickHandler}
        properties={tableProperties}
      />
    </Layout>
  )
}

export default withAuth(Payment)
