import React, { useEffect, useState } from 'react'
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
} from '@ionic/react'
import { onSnapshot, orderBy, query } from '@firebase/firestore'
import { collection } from '@firebase/firestore'
import { db } from '../../../services/firebaseConfig'
import './ReportView.scss'
import { arrowBack } from 'ionicons/icons'

const ReportAdm: React.FC = () => {
  const usersCollectionRef = collection(db, 'reports')
  const [reports, setReports] = useState<any>([])
  const [showReport, setShowReport] = useState(false)
  const [reportSelected, setReportSelected] = useState<any>([])

  useEffect(() => {
    const q = query(usersCollectionRef, orderBy('timestamp', 'desc')) // Cria uma query ordenando os documentos pelo timestamp

    const getReports = onSnapshot(q, (data) =>
      setReports(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })))
    )
    return getReports
  }, [])

  const showDetail = async (id: string) => {
    const report = await reports.find((report: any) => report.id === id)
    setReportSelected(report)
    console.log(reportSelected.name)
    await setShowReport(true)
  }
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <IonFab vertical='top' horizontal='start' slot='fixed'>
          <IonFabButton size='small' routerLink='/admin/panel'>
            <IonIcon icon={arrowBack} />
          </IonFabButton>
        </IonFab>
        <div className='list-report'>
          <h1>Reports</h1>
          {reports.map((reports: any, index: any) => {
            return (
              <IonList>
                <IonItem
                  key={index}
                  button={true}
                  onClick={(e) => showDetail(`${reports.id}`)}
                >
                  <IonLabel>
                    <h2>{reports.name}</h2>
                    <p>{reports.email}</p>
                    <p>{reports.date}</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            )
          })}
        </div>
        <IonModal isOpen={showReport} cssClass='report-modal'>
          <IonContent className='content-report' fullscreen={true}>
            <IonFab vertical='top' horizontal='start' slot='fixed'>
              <IonFabButton size='small' onClick={() => setShowReport(false)}>
                <IonIcon icon={arrowBack} />
              </IonFabButton>
            </IonFab>
            <div className='header'>
              <h1>{reportSelected.name}</h1>
              <h3>{reportSelected.email}</h3>
              <p>{reportSelected.date}</p>
            </div>
            <div className='report'>
              <h2>Report:</h2>
              <p>{reportSelected.description}</p>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}
export default ReportAdm
