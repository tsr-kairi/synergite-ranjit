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
} from '@mantine/core'

import SynergiteLogo from '@/assets/images/Synergite-Logo-With-Tagline.png'

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
    // fontFamily: `Greycliff CF`,
    fontSize: '1rem',
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
        <Image src={SynergiteLogo} alt="SynergiteLogo" width={200} />
        <Paper className={classes.formInner} radius={10}>
          <Title
            order={6}
            className={classes.title}
            align="left"
            mt="md"
            mb={50}
          >
            Login with Email and Password
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
          <Checkbox label="Keep me logged in" mt="xl" size="sm" />
          <Button className={classes.btn} fullWidth mt="xl" size="md">
            Login
          </Button>

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
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000"
          alt="Login_Img"
        />
      </Paper>
    </div>
  )
}

export default Login
