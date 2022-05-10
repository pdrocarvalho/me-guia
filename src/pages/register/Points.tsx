import React, { useState } from 'react'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonToolbar,
  IonAlert,
  IonTitle,
} from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import { useHistory } from 'react-router'

import './Points.scss'
import { db } from '../../services/firebaseConfig'
import { getAuth } from '@firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import schema from './pointSchema'

const axios = require('axios')

const Points: React.FC = () => {
  const auth: any = getAuth()
  const usersCollectionRef = collection(db, 'points')

  let history = useHistory()

  const [showAlert, setShowAlert] = useState(false)

  const getPlace = async (ev: any, setFieldValue: any) => {
    const request = {
      method: 'get',
      url: `https://cors-anywere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${ev.target.value}&key=AIzaSyCNnkyQyi1Im0cwqEHZb80KNoQXUF1un4k`,
      header: {},
    }

    await axios(request)
      .then(function (response: any) {
        setFieldValue('name', response.data.result.name)
        setFieldValue('url', response.data.result.url)
        setFieldValue('formatted_address', response.data.result.formatted_address)
        setFieldValue('name', response.data.result.name)
        setFieldValue('name', response.data.result.name)
        setFieldValue('name', response.data.result.name)
        setFieldValue('name', response.data.result.name)
        console.log(response.data.result)
      })
      .catch(function (error: any) {
        console.log(error)
      })
  }

  const onSubmit = async (values: any, actions: any) => {
    console.log(values)
    const data = values
    await addDoc(usersCollectionRef, {
      place_id: data.place_id,
      name: data.name,
      url: data.url,
      formatted_address: data.formatted_address,
      img: data.img,
      description: data.description,
      tag: data.tag,
      isCovered: data.isCovered,
    })
    setShowAlert(true)
  }

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton
              defaultHref='/'
              color='primary'
              icon={arrowBack}
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => history.push('/admin/panel')}
          header={'Sucesso!'}
          message={'O ponto foi cadastrado com sucesso.'}
          buttons={[
            {
              text: 'Ok',
              handler: () => {
                setShowAlert(false)
              },
            },
          ]}
        />
        <div className='ion-text-center titleSignup'>
          <h4> Cadastre seu ponto turístico! </h4>
          <p>
            {' '}
            Preencha todas as informações disponíveis sobre o novo ponto turístico. Tente
            conseguir o máximo de informações.{' '}
            <span>
              Preencher o Place id não é necessário mas te ajudará no processo.
            </span>{' '}
          </p>
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
                <div>
                  <IonTitle className='labels'>Place id:</IonTitle>
                  <Field
                    name='place_id'
                    type='text'
                    className='primary-input'
                    onBlur={(ev: any) => getPlace(ev, setFieldValue)}
                  />
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
                  <Field name='formatted_address' className='primary-input' type='text' />
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
                  <ErrorMessage component='span' className='errors' name='description' />
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
                    <option value='Ecoturismo'>Ecoturismo: Trilhas e Paisagens</option>
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
                  <ErrorMessage component='span' className='errors' name='isCovered' />
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
    </IonPage>
  )
}

export default Points
