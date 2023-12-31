// ** React Imports
import { Fragment, useEffect } from "react"

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs"

// ** Third Party Components
import { Card, CardHeader, CardTitle, CardBody, Spinner } from "reactstrap"

// ** Third Party Components
import { ChevronDown } from "react-feather"
import DataTable, { createTheme } from "react-data-table-component"

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss"
import { useDispatch, useSelector } from "react-redux"
import { getAnswerList } from "@store/api/journalAnswer"
import { useSkin } from "@hooks/useSkin"

createTheme("dark", {
  background: {
    default: "transparent"
  }
})

const FeedbackList = () => {
  const dispatch = useDispatch()
  const { skin } = useSkin()
  const { answers, isLoading } = useSelector((state) => state.journalAnswer)

  useEffect(() => {
    dispatch(getAnswerList())
  }, [])

  const basicColumns = [
    {
      name: "Name",
      // sortable: true,
      minWidth: "225px",
      selector: (row) => row.studentInfo.name
    },
    {
      name: "Day",
      sortable: true,
      selector: (row) => {
        const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
        return days[row.studentInfo.day - 1]
      }
    },
    {
      name: "Shift",
      selector: (row) => `Shift ${row.studentInfo.shift}`
    },
    {
      name: "Feedback untuk asisten",
      wrap: true,
      width: "400px",
      selector: ({ feedback: row }) => row.assistant
    },
    {
      name: "Feedback untuk praktikum",
      wrap: true,
      width: "400px",
      selector: ({ feedback: row }) => row.session
    },
    {
      name: "Feedback untuk Laboratorium",
      width: "400px",
      // wrap: true,
      selector: ({ feedback: row }) => row.laboratory
    }
  ]

  return (
    <Fragment>
      <Breadcrumbs
        title="Student"
        data={[{ title: "Datatables" }, { title: "Datatables Basic" }]}
      />
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle tag="h4">Feedback List</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="react-dataTable">
            <DataTable
              noHeader
              pagination
              data={answers}
              columns={basicColumns}
              progressPending={isLoading}
              theme={skin}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              progressComponent={
                <div className="d-flex justify-content-center my-1">
                  <Spinner color="primary" />
                </div>
              }
            />
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default FeedbackList
