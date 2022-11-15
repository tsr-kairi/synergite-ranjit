import { ListViewLayout } from '@/components/layout/list-view.layout'
import { Button, createStyles, Table } from '@mantine/core'
import { Th } from '../employee/employee-list'
import React, { useState } from 'react'
import TimesheetInputTile from './timesheet-input-tile'
import TimesheetOverviewTile from './timesheet-overview-tile'

interface WeeklyData {
  key: string
  project: string
  billable: boolean
  total_hours: number
  project_update: string
}

const CreateTimeSheet: React.FC<{ week: string; onBackClick?: () => void }> = ({
  week,
  onBackClick,
}) => {
  const [fields, setFields] = useState<{ [key: string]: WeeklyData[] }>({})

  const { classes } = useStyles()

  const splitWeek = week?.trim()?.split(' - ')
  const weekDay = splitWeek[0].split('/')[0]
  const startWeekDay = splitWeek[0].split('/')[0]
  const endWeekDay = splitWeek[1].split('/')[0]
  const weekFirstDay = +splitWeek[0].split('/')[1]
  const weekLastDay = +splitWeek[1].split('/')[1]

  const timesheetInputTileList = []
  for (
    let startWeekDay = weekFirstDay;
    startWeekDay <= weekLastDay;
    startWeekDay++
  ) {
    const timesheetInputTile = (
      <TimesheetInputTile
        week={`${weekDay}/${startWeekDay}`}
        onDataChange={(data) => {
          setFields((prevState) => ({
            ...prevState,
            [startWeekDay]: data,
          }))
        }}
      />
    )
    timesheetInputTileList.push(timesheetInputTile)
  }

  const onSubmitHandler = () => {
    // Send HTTP Request
    const allWeeklyDataList = []
    for (const weeklyDataList of Object.values(fields || {})) {
      allWeeklyDataList.push(...weeklyDataList)
    }

    console.log('allWeeklyDataList =', allWeeklyDataList)
  } // End of onSubmitHandler

  const calculateTotalHours = () => {
    let totalHours = 0
    let totalBillableHours = 0
    let totalNonBillableHours = 0
    for (const weeklyDataList of Object.values(fields || {})) {
      for (const weeklyData of weeklyDataList) {
        totalHours += weeklyData.total_hours

        if (weeklyData.billable) {
          totalBillableHours += weeklyData.total_hours
        } else {
          totalNonBillableHours += weeklyData.total_hours
        }
      }
    }
    return { totalHours, totalBillableHours, totalNonBillableHours }
  } // End of calculateTotalBillableHours

  const { totalBillableHours, totalNonBillableHours } = calculateTotalHours()

  return (
    <div className={classes.main}>
      <TimesheetOverviewTile onBackClick={onBackClick} />
      <div className={classes.timesheet}>
        <ListViewLayout
          title="Create Timesheets"
          hideActionButton
          hideColumnButton
          isError={false}
          isLoading={false}
        >
          <Table horizontalSpacing="md" verticalSpacing="xs">
            <thead className={classes.thead}>
              <tr className={classes.tr}>
                <th className={classes.th}>Date</th>
                <th className={classes.th}>Project</th>
                <th className={classes.th}>Billable/Non-billable</th>
                <th className={classes.th}>Total Hours</th>
                <th className={classes.th}>Project Updates</th>
                <th className={classes.th}>Action</th>
              </tr>
            </thead>

            <tbody>{timesheetInputTileList}</tbody>
          </Table>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ marginRight: '24px' }}>
              Total Billable Hours: {totalBillableHours.toString() + '.00'}
            </p>
            <p>
              Total Non Billable Hours:{' '}
              {totalNonBillableHours.toString() + '.00'}
            </p>
            <Button ml={80} onClick={onSubmitHandler}>
              Submit
            </Button>
          </div>
        </ListViewLayout>
      </div>
    </div>
  )
}

export default CreateTimeSheet

const useStyles = createStyles((theme) => ({
  thead: {
    paddingLeft: '20px !important',
    borderBottom: `1px solid ${theme?.colors?.gray?.[3]} !important`,
  },
  th: {
    border: 'none !important',
    // fontSize: '14px !important',
  },
  td: {
    padding: '20px !important',
  },
  tr: {
    border: 'none !important',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  timesheet: {
    // marginTop: '20px',
  },
}))
