import { ListViewLayout } from '@/components/layout/list-view.layout'
import { Group, Table, Text, Tooltip } from '@mantine/core'
import { Th } from '../employee/employee-list'
import { useState } from 'react'
import { SheetData } from './data'
import CreateTimeSheet from './createTimeSheet'
import { Badge } from '@mantine/core'
const Timesheet = () => {
  const [createSheet, setCreateSheet] = useState<boolean>(false)
  const [selectedTimesheet, setSelectedTimesheet] = useState('')

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
              <thead>
                <tr>
                  <Th onSort={() => null}>
                    <b>Name</b>
                  </Th>
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
                    <tr key={sheetValue.Name}>
                      <td>{sheetValue.Name}</td>
                      <td>
                        <Tooltip
                          label="Click to view"
                          color="blue"
                          withArrow
                          transition="pop-top-right"
                          transitionDuration={300}
                        >
                          <Group spacing="sm">
                            <Text size="sm" weight={500}>
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
                        <Badge
                          // color={sheetValue.color.background}
                          style={{
                            border: `0.5px solid grey`,
                          }}
                        >
                          <td>{sheetValue.Status}</td>
                        </Badge>
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
