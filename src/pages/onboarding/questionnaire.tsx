import {
  Button,
  Container,
  createStyles,
  Divider,
  Group,
  TextInput,
  Text,
} from '@mantine/core'
import { IconChevronsRight } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  main: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyItems: 'center',
    minHeight: '65vh',
  },
  successCmp: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    marginTop: '200px',
    border: `1px solid ${theme.colors.grey[6]}`,
  },
  text: {
    fontSize: '28px',
    // color: theme.colors.blue[4],
  },
  logo: {
    color: theme.colors.cyan,
    height: '50px',
  },
}))
const Questionnaire = () => {
  const { classes } = useStyles()

  return (
    <>
      <div className={classes.main}>
        <Container>
          <div className={classes.successCmp}>
            {/* <Image src={SuccessfullyDone} alt="SuccessfullyDone" width={250} /> */}
            <Text
              className={classes.text}
              weight="500"
              style={{
                textAlign: 'center',
                fontFamily: '-moz-initial',
              }}
            >
              Questionnaire
            </Text>
            <form>
              <div
                style={{
                  width: '100%',
                  maxWidth: '70%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <TextInput variant="unstyled" radius="xs" px="sm" />
                <Divider mb="5px" size="sm" />
                <TextInput variant="unstyled" radius="xs" px="sm" />
                <Divider mb="5px" size="sm" />
                <TextInput variant="unstyled" radius="xs" px="sm" />
                <Divider mb="5px" size="sm" />
              </div>
              <Group position="apart" mt="xl" align={'center'} px="md">
                <IconChevronsRight color="grey" />
                <Button variant="outline" color={'grey'}>
                  Proceed to Onboarding
                </Button>
              </Group>
            </form>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Questionnaire
