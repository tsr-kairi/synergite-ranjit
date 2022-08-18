import {
  Paper,
  createStyles,
  TextInput,
  Button,
  Title,
  Text,
  Anchor,
  Image,
  Group,
  MantineProvider,
} from '@mantine/core'

import Logo from '@/components/logo'

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
    backgroundColor: theme.colors.blue[9],
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
    color: theme.colors.accent[9],
    fontWeight: 700,
  },
  loginImg: {
    width: '60%',
    height: '100vh',
  },
  btn: {
    backgroundColor: theme.colors.accent[9],
    ':hover': {
      backgroundColor: theme.colors.accent[8],
      transition: 'all 0.6s ease-in-out',
    },
  },
}))

export function Login() {
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30} px={80}>
        <Logo />
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
            placeholder="randome@gmail.com"
            size="md"
            mb={10}
          />
          <Group grow mt={20} position="apart">
            <Anchor<'a'>
              href="#login"
              weight={700}
              onClick={(event) => event.preventDefault()}
              // mt={20}
            >
              Back to login page
            </Anchor>
            <MantineProvider
              theme={{
                defaultGradient: {
                  from: 'orange',
                  to: 'red',
                  deg: 45,
                },
              }}
            >
              <Button variant="gradient" size="md">
                Reset Password
              </Button>
            </MantineProvider>
          </Group>
        </Paper>
      </Paper>

      <Paper className={classes.loginImg} radius={0}>
        <Image
          src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?w=826&t=st=1660660363~exp=1660660963~hmac=a28395f313fa9a6cdea1d4136512a85c35e1c45ba624ff177be76e735b858dd8"
          alt="Login_Img"
          height="100vh"
          width="100%"
        />
      </Paper>
    </div>
  )
}

export default Login
