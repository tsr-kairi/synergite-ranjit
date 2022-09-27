import { createStyles, Grid } from '@mantine/core'
import Personal from './personal'

const useStyles = createStyles((theme) => ({
  candidateDetails: {
    // display: 'flex',
    paddingLeft: '20px',
    paddingRight: '20px',
    // gap: '20px',
    width: '100%',
    // placeItems: 'center',
  },
  candidateProProfile: {
    // display: 'flex',
    // height: '88.5vh',
    width: '100%',
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.55)',
    borderRadius: '10px',
    padding: '20px',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
}))

export const CandidateDetails = () => {
  const { classes } = useStyles()

  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <div className={classes.candidateDetails}>
            <div className={classes.candidateProProfile}>
              <Personal />
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={8}></Grid.Col>
      </Grid>
    </>
  )
}

export default CandidateDetails
