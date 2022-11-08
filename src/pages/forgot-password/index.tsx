import {
  Paper,
  createStyles,
  TextInput,
  Button,
  Title,
  Text,
  Image,
  Group,
  MantineProvider,
  Loader,
} from '@mantine/core'

import Logo from '@/components/logo'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '@mantine/form'
import axiosPublic from '@/services/axiosPublic'
import { useState } from 'react'

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    minHeight: 900,
    width: `40%`,
    backgroundColor: '#04334c',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  formInner: {
    width: '100%',
    // maxWidth: `90%`,
    margin: '0 auto',
    padding: 80,
    backgroundColor: theme.colors.white,
    marginTop: '190px',
  },

  title: {
    color: theme.black,
    fontFamily: theme.fontFamily,
    fontSize: '1.4rem',
  },
  password: {
    color: 'rgba(252,185,0,1)',
    fontWeight: 700,
  },
  forgotImg: {
    width: '100%',
    maxWidth: '50%',
    height: '100vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  btn: {
    backgroundColor: theme.colors.accent[9],
    ':hover': {
      backgroundColor: theme.colors.accent[8],
      transition: 'all 0.6s ease-in-out',
    },
  },
  backPage: {
    textDecoration: 'none',
    color: '#04334c',
  },
}))
type IForgotRequest = {
  email: string
}
export function ForgotPassword() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { classes } = useStyles()

  const form = useForm<IForgotRequest>({
    initialValues: {
      email: '',
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  const handleSubmit = (values: IForgotRequest) => {
    console.log({ values })

    try {
      // Hitting Forgot Password endpoint
      void axiosPublic.post(`/user/forgotpassword?email=${values.email}`)
      setTimeout(() => {
        navigate('/forgotPasswordSuccess')
      }, 2000)
    } catch (error) {
      // TODO - Need to show an Error Alert
      navigate('/server-error')
    }
    setIsSubmitting(true)
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30} px={80}>
        <Link to={'/'}>
          <Logo />
        </Link>
        <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="on">
          <Paper className={classes.formInner} radius={10}>
            <Title
              order={1}
              className={classes.title}
              align="left"
              mt="md"
              mb={10}
            >
              Forgot your <span className={classes.password}>Password</span>
            </Title>
            <Text align="left" mb={40} color={'grey'}>
              Please enter your email to get a reset link.
            </Text>

            <TextInput
              label="Email address"
              placeholder="random@gmail.com"
              size="md"
              mb={10}
              required
              type="email"
              {...form.getInputProps('email')}
            />
            <Group grow mt={20} position="apart">
              <Link className={classes.backPage} to={'/login'}>
                Back to login page
              </Link>
              <MantineProvider
                theme={{
                  defaultGradient: {
                    from: 'rgba(252,185,0,1)',
                    to: 'rgba(252,185,0,1)',
                    deg: 45,
                  },
                }}
              >
                <Button variant="gradient" type="submit" size="md">
                  {!isSubmitting && 'Reset Password'}
                  {isSubmitting && (
                    <Text>
                      Resetting{''}
                      <Loader variant="dots" color={'white'} size="sm" />
                    </Text>
                  )}
                </Button>
              </MantineProvider>
            </Group>
          </Paper>
        </form>
      </Paper>

      <Paper className={classes.forgotImg} radius={0}>
        <Image
          src="/src/assets/images/forgot.png"
          alt="Forgot_Img"
          // height="100vh"
          // width="100%"
        />
      </Paper>
    </div>
  )
}

export default ForgotPassword

//  old forgot img link : https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?w=826&t=st=1660660363~exp=1660660963~hmac=a28395f313fa9a6cdea1d4136512a85c35e1c45ba624ff177be76e735b858dd8
