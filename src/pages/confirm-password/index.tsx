import {
  Paper,
  createStyles,
  PasswordInput,
  Button,
  Title,
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
    marginTop: '155px',
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
            Confirm your <span className={classes.password}>Password</span>
          </Title>
          <PasswordInput
            label="Password"
            placeholder="★★★★★★★★"
            mt="md"
            size="md"
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="★★★★★★★★"
            mt="md"
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
                Confirm
              </Button>
            </MantineProvider>
          </Group>
        </Paper>
      </Paper>

      <Paper className={classes.loginImg} radius={0}>
        <Image
          src="https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg?w=826&t=st=1660660487~exp=1660661087~hmac=25452a9c404715893a9a1fcb9a5cfc8056a60a06dae96319cdd8cca781672bbb"
          alt="Login_Img"
          height="100vh"
          width="100%"
        />
      </Paper>
    </div>
  )
}

export default Login
