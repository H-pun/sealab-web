import React, { useState, useEffect } from "react" // Import React
import { Card, CardHeader, CardTitle, Button, Spinner } from "reactstrap"
import PreTestOverlay from "./PreTestOverlay"
import { useDispatch, useSelector } from "react-redux"
import { getPRTSubmissions } from "@store/api/module"
import { Lock } from "react-feather"

export default function PreTest() {
  const [isOpenClicked, setIsOpenClicked] = useState(null)
  const handleOpenClick = (moduleId) => {
    setIsOpenClicked(moduleId)
  }

  const dispatch = useDispatch()
  const {isLoading, modules} = useSelector((state) => state.module)

  useEffect(() => {
    dispatch(getPRTSubmissions())
  }, [])

  return (
    <div>
      <Card className="card-overlay-jurnal">
        {/* INFO */}
        <h1>Tes Awal</h1>
        <ol type="1">
          <li>
            Setiap mahasiswa diharapkan hadir <b> tepat waktu </b> sesuai jadwal
            tes awal.
          </li>
          <li>
            Tes Awal diberikan sebelum pelaksanaan praktikum dimulai dan
            dilaksanakan maksimal selama <b>20 menit.</b>
          </li>
          <li>
            Jumlah soal yang dikerjakan praktikan sebanyak 10 butir soal dengan
            tipe soal adalah Multiple choice (Pilihan Ganda) soal acak
          </li>
          <li>
            Apabila praktikan datang pada saat tes awal sedang berlangsung, maka
            praktikan diperbolehkan mengikuti tes awal{" "}
            <b>tanpa ada tambahan waktu.</b>
          </li>
          <li>
            Mahasiswa diharapkan mematuhi semua instruksi yang diberikan oleh
            asisten praktikum
          </li>
          <li>
            <b>Dilarang</b> berbicara atau berkomunikasi dengan mahasiswa lain
            selama tes berlangsung.
          </li>
          <li>
            Tes awal bersifat <b>close all</b>, praktikan <b>dilarang</b>{" "}
            menggunakan bahan referensi atau sumber lain selama mengerjakan
            kuis.
          </li>
          <li>
            Praktikan diwajibkan <b>menjaga etika</b> yang baik selama tes
            berlangsung.
          </li>
          <li>
            <b>Dilarang</b> mencoba melakukan tindakan curang, menyalin jawaban
            mahasiswa lain, atau menggunakan perangkat lain selain komputer yang
            telah disediakan.
          </li>
          <li>
            Apabila praktikan <b>terbukti</b> melakukan tindak kecurangan
            pengerjaan tes awal dalam bentuk apapun, maka <b>nilai TA = 0</b>
          </li>
        </ol>
      </Card>
      {
        isLoading ? <div className='d-flex justify-content-center my-3'>
          <Spinner color='primary' />
        </div> : modules.map((item, index) => (
          <div key={item.id}>
            {isOpenClicked === item.id && (
              <PreTestOverlay
                moduleTitle={item.name}
                moduleNumber={index + 1}
                item={item}
              />
            )}

            {isOpenClicked !== item.id && (
              <Card className="card-student">
                <CardHeader>
                  <CardTitle>
                    Modul {index + 1} - {item.name}
                  </CardTitle>
                  {item.isOpen && !item.isSubmitted ? (
                    <Button
                      color="relief-primary"
                      onClick={() => handleOpenClick(item.id)}
                    >
                      Open
                    </Button>
                  ) : (
                    <Button
                      color="flat-dark"
                      disabled={true}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Lock size={13} style={{ marginRight: "5px" }} />  {item.isSubmitted ? "Submitted" : "Closed"}
                    </Button>
                  )}
                </CardHeader>
              </Card>
            )}
          </div>
        ))}
    </div>
  )
}
