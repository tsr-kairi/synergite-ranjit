import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Image,
  MantineProvider,
  Group,
} from '@mantine/core'

import SynergiteLogo from '@/assets/images/Synergite-Logo-With-Tagline.png'
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
    minHeight: 900,
    width: `40%`,
    backgroundColor: theme.colors.blue[9],
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  formInner: {
    width: '100%',
    margin: '0 auto',
    padding: 80,
    // backgroundColor: 'rgba(103, 169, 241, 0.17)',
    backgroundColor: theme.colors.white,
    marginTop: '140px',
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
  emailInput: {
    // backgroundColor: theme.colors.blue[9],
    '::-ms-input-placeholder': {
      backgroundColor: theme.colors.blue[9],
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
            order={6}
            className={classes.title}
            align="left"
            mt="md"
            mb={50}
          >
            Login with <span className={classes.password}>Email</span> and{' '}
            <span className={classes.password}>Password</span>
          </Title>

          <TextInput
            className={classes.emailInput}
            label="Email address"
            placeholder="randome@gmail.com"
            size="md"
          />
          <PasswordInput
            label="Password"
            placeholder="★★★★★★★★"
            mt="md"
            size="md"
          />

          <Group grow mt={20} position="center">
            <Checkbox label="Keep me logged in" size="sm" />
            <Anchor<'a'>
              href="#login"
              weight={700}
              onClick={(event) => event.preventDefault()}
              align="right"
            >
              Forgot Password
            </Anchor>
          </Group>
          <MantineProvider
            inherit
            theme={{
              defaultGradient: {
                from: 'orange',
                to: 'red',
                deg: 45,
              },
            }}
          >
            <Button variant="gradient" size="md" fullWidth mt="xl">
              login
            </Button>
          </MantineProvider>

          <Text align="center" mt="md">
            Don&apos;t have an account?{' '}
            <Anchor<'a'>
              href="#"
              weight={700}
              onClick={(event) => event.preventDefault()}
            >
              Register
            </Anchor>
          </Text>
        </Paper>
      </Paper>

      <Paper className={classes.loginImg} radius={0}>
        <Image
          src="https://www.allen.ac.in/apps2223/assets/images/login.jpg"
          alt="Login_Img"
          height="100vh"
          width="100%"
        />
      </Paper>
    </div>
  )
}

export default Login
