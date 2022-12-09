import { Button, createStyles, ScrollArea, Table } from '@mantine/core'
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

  const { classes, cx } = useStyles()

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
        <ScrollArea
          // scroll area style
          style={{ height: 660 }}
          type="always"
          offsetScrollbars
          scrollbarSize={5}
          styles={(theme) => ({
            scrollbar: {
              zIndex: 1000,
              '&, &:hover': {
                background:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },

              '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                backgroundColor: theme.colors.blue[5],
              },

              '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
                backgroundColor: theme.colors.blue[6],
              },
            },

            corner: {
              opacity: 1,
              background:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            className={classes.childTable}
          >
            <thead className={cx(classes.header)}>
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
        </ScrollArea>
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
            Total Non Billable Hours: {totalNonBillableHours.toString() + '.00'}
          </p>
          <Button ml={80} onClick={onSubmitHandler}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateTimeSheet

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme?.colors?.gray?.[3]} !important`,
    },
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
  childTable: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.35)',
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: '3px',
    // minWidth: '197vw',
  },
}))
