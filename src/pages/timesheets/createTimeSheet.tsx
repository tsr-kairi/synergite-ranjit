import { ListViewLayout } from '@/components/layout/list-view.layout'
import {
  ActionIcon,
  Button,
  Card,
  Checkbox,
  createStyles,
  Select,
  Table,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { Th } from '../employee/employee-list'
import React, { useState } from 'react'
import { IconPlus, IconSubmarine, IconTrash } from '@tabler/icons'
import { randomId } from '@mantine/hooks'
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
    <>
      <Card mb={16}>
        <TimesheetOverviewTile onBackClick={onBackClick} />
      </Card>

      <Card>
        <Table horizontalSpacing="md" verticalSpacing="xs">
          <thead>
            <tr className={classes.tr}>
              <th className={classes.th}>Date</th>
              <th className={classes.th}>Project</th>
              <th className={classes.th}>Billable/Not</th>
              <th className={classes.th}>Total Hrs</th>
              <th className={classes.th}>Project Updates</th>
              <th className={classes.th}></th>
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
          <div>
            <p>Total Billable Time: {totalBillableHours.toString() + '.00'}</p>
            <p>
              Total Non Billable Time:{' '}
              {totalNonBillableHours.toString() + '.00'}
            </p>
          </div>
          <Button ml={80} onClick={onSubmitHandler}>
            Submit
          </Button>
        </div>
      </Card>
    </>
  )
}

export default CreateTimeSheet

const useStyles = createStyles((theme) => ({
  thead: {
    paddingLeft: '20px !important',
  },
  th: {
    border: 'none !important',
  },
  td: {
    padding: '20px !important',
  },
  tr: {
    border: 'none !important',
    // display: 'flex',
    // flexDirection: 'row',
    // gap: '130px',
    // marginLeft: '72px',
  },
  tbody: {
    // gap: '120px',
    // flexDirection: 'row',
    // marginLeft: '60px',
  },
  buttonContainer: {
    position: 'absolute',
    top: '180px',
    right: '180px',
  },
  iconContainer: {
    position: 'absolute',
    top: '180px',
    right: '150px',
  },
}))
