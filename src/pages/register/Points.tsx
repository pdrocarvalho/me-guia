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
} from '@ionic/react'
import { arrowBack } from 'ionicons/icons'

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
        setFieldValue(
          'formatted_address',
          response.data.result.formatted_address
        )
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
        <div className='ion-text-center titleSignup'>
          <h4> Cadastre seu ponto turístico! </h4>
          <p>
            {' '}
            Preencha todas as informações disponíveis sobre o novo ponto
            turístico. Tente conseguir o máximo de informações.{' '}
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
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <div>
                  <IonLabel>Place id</IonLabel>
                  <Field
                    name='place_id'
                    className='primary-input'
                    type='text'
                    onBlur={(ev: any) => getPlace(ev, setFieldValue)}
                  />
                </div>

                <div>
                  <IonLabel>Nome do ponto</IonLabel>
                  <Field name='name' className='primary-input' type='text' />
                  <ErrorMessage name='name' />
                </div>

                <div>
                  <IonLabel>Url do google Maps</IonLabel>
                  <Field name='url' className='primary-input' type='text' />
                  <ErrorMessage name='url' />
                </div>

                <div>
                  <IonLabel>Endereço</IonLabel>
                  <Field
                    name='formatted_address'
                    className='primary-input'
                    type='text'
                  />
                  <ErrorMessage name='formatted_address' />
                </div>

                <div>
                  <IonLabel>Url de imagem</IonLabel>
                  <Field name='img' className='primary-input' type='text' />
                  <ErrorMessage name='img' />
                </div>

                <div>
                  <IonLabel>Descrição</IonLabel>
                  <Field
                    name='description'
                    className='primary-input'
                    type='text'
                  />
                  <ErrorMessage name='description' />
                </div>

                <div>
                  <IonLabel>Tipo de ponto:</IonLabel>
                  <Field
                    name='tag'
                    component='select'
                    className='primary-input'
                    type='text'
                  >
                    <option value=''>Selecione um tipo</option>
                    <option value='praia'>Praia</option>
                    <option value='turistico'>Ponto Turístico</option>
                    <option value='historico'>Ponto Histórico</option>
                  </Field>
                  <ErrorMessage name='tag' />
                </div>

                <div>
                  <IonLabel>O local é coberto?</IonLabel>
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
                  <ErrorMessage name='isCovered' />
                </div>
                <IonButton
                  expand='block'
                  className='ion-margin-top button'
                  type='submit'
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
