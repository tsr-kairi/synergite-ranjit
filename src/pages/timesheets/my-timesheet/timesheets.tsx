import { ListViewLayout } from '@/components/layout/list-view.layout'
import { createStyles, Group, Table, Text, Tooltip } from '@mantine/core'
import { Th } from '../../employee/employee-list'
import { useState } from 'react'
import { SheetData } from './data'
import CreateTimeSheet from './createTimeSheet'
import { Badge } from '@mantine/core'

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
}))
const Timesheet = () => {
  const [createSheet, setCreateSheet] = useState<boolean>(false)
  const [selectedTimesheet, setSelectedTimesheet] = useState('')
  const { classes, cx } = useStyles()

  return (
    <>
      {createSheet && (
        <CreateTimeSheet
          week={selectedTimesheet}
          onBackClick={() => setCreateSheet(false)}
        />
      )}
      {!createSheet && (
        <>
          <ListViewLayout
            title="Timesheets"
            hideActionButton
            hideColumnButton
            isError={false}
            isLoading={false}
          >
            <Table horizontalSpacing="md" verticalSpacing="xs">
              <thead className={cx(classes.header)}>
                <tr>
                  {/* <Th onSort={() => null}>
                    <b>Name</b>
                  </Th> */}
                  <Th onSort={() => null}>
                    <b>Week</b>
                  </Th>
                  <Th onSort={() => null}>
                    <b>Billable</b>
                  </Th>
                  <Th onSort={() => null}>
                    <b>Non-Billable</b>
                  </Th>
                  <Th onSort={() => null}>
                    <b>Total Hours</b>
                  </Th>
                  <Th onSort={() => null}>
                    <b>Status</b>
                  </Th>
                </tr>
              </thead>
              <tbody>
                {SheetData.map((sheetValue) => {
                  return (
                    <tr key={sheetValue.Week}>
                      {/* <td>{sheetValue.Week}</td> */}
                      <td>
                        <Tooltip
                          label="Click to view"
                          color="blue"
                          withArrow
                          transition="pop-top-right"
                          transitionDuration={300}
                        >
                          <Group spacing="sm">
                            <Text size="sm" weight={500} color="blue">
                              <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setCreateSheet(!createSheet)
                                  setSelectedTimesheet(sheetValue.Week)
                                }}
                              >
                                {sheetValue.Week}
                              </div>
                            </Text>
                          </Group>
                        </Tooltip>
                      </td>
                      <td>{'40' || sheetValue.Billable}</td>
                      <td>{'40' || sheetValue.Billable}</td>
                      <td>{sheetValue.TotalHrs}</td>
                      <td>
                        {sheetValue.Status === 'New' ? (
                          <Badge
                            style={{
                              border: `1px solid blue`,
                              minWidth: '89px',
                            }}
                            color="skyBlue"
                          >
                            New
                          </Badge>
                        ) : sheetValue.Status === 'Submitted' ? (
                          <Badge
                            style={{
                              border: `1px solid orange`,
                              minWidth: '89px',
                            }}
                            color="yellow"
                          >
                            Submitted
                          </Badge>
                        ) : sheetValue.Status === 'Approved' ? (
                          <Badge
                            style={{
                              border: `1px solid green`,
                              minWidth: '89px',
                            }}
                            color="green"
                          >
                            Approved
                          </Badge>
                        ) : sheetValue.Status === 'Rejected' ? (
                          <Badge
                            style={{
                              border: `1px solid red`,
                              minWidth: '89px',
                            }}
                            color="red"
                          >
                            Rejected
                          </Badge>
                        ) : null}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </ListViewLayout>
        </>
      )}
    </>
  )
}

export default Timesheet
