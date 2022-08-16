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
}))

export function Login() {
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30} px={80}>
        <Image src={SynergiteLogo} alt="SynergiteLogo" width={200} />
        <Paper className={classes.formInner} radius={10}>
          <Title
            order={1}
            className={classes.title}
            align="left"
            mt="md"
            mb={10}
          >
            Forgot your Password
          </Title>
          <Text align="left" mb={40}>
            Please enter your email to get a reset link.
          </Text>

          <TextInput
            label="Email address"
            placeholder="randome@gmail.com"
            size="xl"
            mb={10}
          />
          <Group grow>
            <Anchor<'a'>
              href="#login"
              weight={700}
              onClick={(event) => event.preventDefault()}
              mt={20}
            >
              Back to login page
            </Anchor>
            <Button className={classes.btn} mt="xl" size="md">
              Reset Password
            </Button>
          </Group>
        </Paper>
      </Paper>

      <Paper className={classes.loginImg} radius={0}>
        <Image
          src="https://www.paymentsjournal.com/wp-content/uploads/2020/09/forgot-password-concept-illustration_114360-1123.jpg"
          alt="Login_Img"
        />
      </Paper>
    </div>
  )
}

export default Login
