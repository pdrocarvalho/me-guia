import {
  IonButton,
  IonBackButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSearchbar,
  IonTextarea,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonTitle,
  IonAlert,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getAuth } from '@firebase/auth'
import { collection, getDocs, updateDoc, doc } from '@firebase/firestore'
import { db } from '../../../services/firebaseConfig'
import { arrowBack, closeOutline } from 'ionicons/icons'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import schema from './pointSchema'

import './EditPoint.scss'

const EditPoints: React.FC = () => {
  const history = useHistory()

  const pointsCollectionRef = collection(db, 'points')
  /*State Searchbar */
  const [searchText, setSearchText] = useState('')
  /*State dos Pontos Turísticos */
  const [points, setPoints] = useState<any>([])
  /*State Modal */
  const [showSpecs, setShowSpecs] = useState(false)
  const [placeSelected, setPlaceSelected] = useState<any>([])

  /*State Alert */
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const getPoints = async () => {
      const data = await getDocs(pointsCollectionRef) // Faz req ao Firestore
      setPoints(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPoints()
  }, [])

  const showDetail = async (id: string) => {
    const place = await points.find((place: any) => place.id === id) // Acha o card selecionado dentro do array
    setPlaceSelected(place)
    setShowSpecs(true)
  }

  const getPlace = (setFieldValue: any) => {
    const response = placeSelected
    setFieldValue('name', response.name)
    setFieldValue('url', response.url)
    setFieldValue('formatted_address', response.formatted_address)
    setFieldValue('img', response.img)
    setFieldValue('description', response.description)
    setFieldValue('tag', response.tag)
    setFieldValue('isCovered', response.isCovered)
    setFieldValue('place_id', response.place_id)
  }

  const onSubmit = async (values: any) => {
    const id = placeSelected.id
    const docRef = doc(db, 'points', id)
    const newData = {
      place_id: values.place_id,
      name: values.name,
      url: values.url,
      formatted_address: values.formatted_address,
      img: values.img,
      description: values.description,
      tag: values.tag,
      isCovered: values.isCovered,
    }
    await updateDoc(docRef, newData)
    setShowAlert(true)
  }

  return (
    <IonPage>
      <IonContent>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => history.push('/admin/adminPanel')}
          header={'Sucesso!'}
          message={'O ponto foi autalizado com sucesso.'}
          buttons={[
            {
              text: 'Ok',
              handler: () => {
                setShowAlert(false)
              },
            },
          ]}
        />
        <IonToolbar>
          <IonFab vertical='top' horizontal='start'>
            <IonFabButton size='small' onClick={() => history.push('/')}>
              <IonIcon icon={closeOutline} />
            </IonFabButton>
          </IonFab>
          <IonButtons slot='start'>
            <IonBackButton
              defaultHref='/'
              color='primary'
              icon={arrowBack}
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <div className='titlepage'>
          <IonLabel>Escolha um ponto turístico para editar:</IonLabel>
        </div>
        <div className='searchPoint'>
          <IonSearchbar
            inputmode='search'
            animated={true}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder='Pesquise aqui!'
          ></IonSearchbar>
        </div>
        <IonList>
          {points
            .filter((places: any) => {
              if (searchText === '') {
                return places
              } else if (places.name.toLowerCase().includes(searchText.toLowerCase())) {
                return places
              }
            })
            .map((point: any, index: any) => {
              return (
                <IonItem key={index} onClick={(e) => showDetail(point.id)}>
                  <h2>{point.name}</h2>
                </IonItem>
              )
            })}
        </IonList>
        <IonModal isOpen={showSpecs} cssClass='edit-modal'>
          <IonContent className='ion-padding'>
            <div className='header-modal'>
              <IonFab vertical='top' horizontal='end'>
                <IonFabButton size='small' onClick={() => setShowSpecs(false)}>
                  <IonIcon icon={closeOutline} />
                </IonFabButton>
              </IonFab>
              <a className='info'>Atualize as informações do ponto turístico aqui:</a>
            </div>
            <div className='formulario'>
              <Formik
                validateOnMount
                validationSchema={schema}
                onSubmit={onSubmit}
                initialValues={{
                  place_id: '',
                  name: '',
                  formatted_address: '',
                  description: '',
                  tag: '',
                  url: '',
                  img: '',
                  isCovered: '',
                }}
              >
                {({ values, errors, touched, setFieldValue, handleReset }) => (
                  <Form>
                    <IonButton onClick={() => getPlace(setFieldValue)}>
                      Carregar Informações
                    </IonButton>
                    <div>
                      <IonTitle className='labels'>Place id:</IonTitle>
                      <Field name='place_id' type='text' className='primary-input' />
                    </div>

                    <div>
                      <IonTitle className='labels'>Nome do ponto:</IonTitle>
                      <Field name='name' className='primary-input' type='text' />
                      <ErrorMessage component='span' className='errors' name='name' />
                    </div>

                    <div>
                      <IonTitle className='labels'>Url do google Maps:</IonTitle>
                      <Field name='url' className='primary-input' type='text' />
                      <ErrorMessage component='span' className='errors' name='url' />
                    </div>

                    <div>
                      <IonTitle className='labels'>Endereço:</IonTitle>
                      <Field
                        name='formatted_address'
                        className='primary-input'
                        type='text'
                      />
                      <ErrorMessage
                        component='span'
                        className='errors'
                        name='formatted_address'
                      />
                    </div>

                    <div>
                      <IonTitle className='labels'>Url da imagem:</IonTitle>
                      <Field name='img' className='primary-input' type='text' />
                      <ErrorMessage component='span' className='errors' name='img' />
                    </div>

                    <div>
                      <IonTitle className='labels'>Descrição:</IonTitle>
                      <Field name='description' className='primary-input' as='textarea' />
                      <ErrorMessage
                        component='span'
                        className='errors'
                        name='description'
                      />
                    </div>

                    <div>
                      <IonTitle className='labels'>Tipo de ponto:</IonTitle>
                      <Field
                        name='tag'
                        component='select'
                        className='primary-input'
                        type='text'
                      >
                        <option value=''>Selecione um tipo:</option>
                        <option value='Atrativo Natural'>
                          Atrativo Natural: praias e ilhas
                        </option>
                        <option value='Atrativo Cultural'>
                          Atrativo Cultural: monumentos históricos
                        </option>
                        <option value='Ecoturismo'>
                          Ecoturismo: Trilhas e Paisagens
                        </option>
                        <option value='Esporte'>Esporte</option>
                      </Field>
                      <ErrorMessage component='span' className='errors' name='tag' />
                    </div>

                    <div>
                      <IonTitle className='labels'>O local é coberto?</IonTitle>
                      <Field
                        name='isCovered'
                        component='select'
                        className='primary-input'
                        type='text'
                      >
                        <option value=''>Selecione uma opção</option>
                        <option value='true'>Sim</option>
                        <option value='false'>Não</option>
                      </Field>
                      <ErrorMessage
                        component='span'
                        className='errors'
                        name='isCovered'
                      />
                    </div>
                    <IonButton
                      expand='block'
                      className='ion-margin-top button'
                      type='submit'
                      onClick={handleReset}
                    >
                      Enviar
                    </IonButton>
                  </Form>
                )}
              </Formik>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}

export default EditPoints
