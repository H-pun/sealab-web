// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Spinner,
  Button
} from "reactstrap"

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable, { createTheme } from 'react-data-table-component'
import moment from 'moment/moment'
import Filter, { baseColumns, FilterToggle, RefreshButton, DownloadButton, DownloadProgress } from '@custom-components/filter'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAnswerList, downloadSubmission } from '@store/api/homeAssignmentAnswer'
import { useSkin } from "@hooks/useSkin"
import { NavLink } from 'react-router-dom'

createTheme('dark', {
  background: {
    default: 'transparent'
  }
})

const HASubmissionList = () => {
  // ** state
  const dispatch = useDispatch()
  const { skin } = useSkin()
  const { answers, isLoading, isDownloadLoading } = useSelector(state => state.homeAssignmentAnswer)
  const [filteredData, setFilteredData] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState({})

  useEffect(() => {
    dispatch(getAnswerList())
  }, [])

  const basicColumns = [
    ...baseColumns,
    {
      name: "Submit Time",
      sortable: true,
      wrap: true,
      minWidth: '11rem',
      selector: (row) => row.submitTime,
      format: (row) => moment(row.submitTime).utc().format("ddd DD MMM YYYY HH:mm A")
    },
    {
      name: "Link",
      button: true,
      minWidth: '9rem',
      selector: (row) => (
        <NavLink to={row.filePath} target="_blank">
          <Button.Ripple
            color='primary'
            disabled={isLoading}
          >
            Link
          </Button.Ripple>
        </NavLink>
      )
    }
  ]

  return (
    <Fragment>
      <Breadcrumbs title='Home Assignment' data={[{ title: 'Submission' }]} />
      <Card className='overflow-hidden'>
        <CardHeader className='gap-1'>
          <CardTitle tag='h4'>Home Assignment Submission</CardTitle>
          <div className='d-flex gap-1'>
            <RefreshButton disabled={isLoading || isDownloadLoading} onClickHandler={getAnswerList} />
            <DownloadButton disabled={isLoading || isDownloadLoading} onClickHandler={downloadSubmission} onDownload={setDownloadProgress} />
            <FilterToggle value={isFilterOpen} onToggle={setIsFilterOpen} />
          </div>
        </CardHeader>
        <CardBody>
          <Filter data={answers} onFilterChange={setFilteredData} isOpen={isFilterOpen} />
          <DownloadProgress progress={downloadProgress} />
          <div className='react-dataTable'>
            <DataTable
              noHeader
              pagination
              data={filteredData}
              columns={basicColumns}
              progressPending={isLoading}
              theme={skin}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              progressComponent={
                <div className='d-flex justify-content-center my-1'>
                  <Spinner color='primary' />
                </div>
              }
            />
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default HASubmissionList
