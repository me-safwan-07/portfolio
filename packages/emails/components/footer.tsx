import { Column, Hr, Img, Link, Row, Section, Text } from '@react-email/components'

const Footer = () => {
  return (
    <>
      <Hr className='mb-3 mt-6' />
      <Section>
        <Row className='mt-4' align='left' width='auto'>
          <Column className='pr-6 align-middle'>
            <Link href='https://x.com/me_safwan_07' className='text-xl text-black'>
              <Img src='/images/email/x.png' alt='X' width={22} height={22} />
            </Link>
          </Column>
          <Column className='align-middle'>
            <Link href='https://github.com/me-safwan-07/portfolio' className='text-xl text-black'>
              <Img
                src='/github.png'
                alt='GitHub'
                width={22}
                height={22}
              />
            </Link>
          </Column>
        </Row>
      </Section>
      <Text className='mx-0 mb-0 mt-6 p-0 text-xs font-normal text-gray-500'>
        © {new Date().getFullYear()} Nelson Lai. All rights reserved.
      </Text>
    </>
  )
}

export default Footer
