import React, { useState } from 'react'
import { useHistory } from 'react-router'
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { arrowBack, server } from 'ionicons/icons'

import './CreateClient.scss'
import { getAuth, updateProfile } from '@firebase/auth'
import { doc, collection, setDoc, serverTimestamp } from '@firebase/firestore'
import { db } from '../../services/firebaseConfig'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import schema from './clientSchema'

const axios = require('axios')

const Client: React.FC = () => {
  const auth: any = getAuth()
  const history = useHistory()
  const usersCollectionRef = collection(db, 'users')
  const [chooseType, setChooseType] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [newStoreName, setNewStoreName] = useState('')
  const [newCnpj, setNewCnpj] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newType, setNewType] = useState('')
  const [newImg, setNewImg] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)

  const getPlace = async (ev: any, setFieldValue: any) => {
    const request = {
      method: 'get',
      url: `https://cors-anywere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${ev.target.value}&key=AIzaSyCNnkyQyi1Im0cwqEHZb80KNoQXUF1un4k`,
      header: {},
    }

    await axios(request)
      .then(function (response: any) {
        const weekday_text = response.data.result.opening_hours.weekday_text
        setFieldValue('name', response.data.result.name)
        setFieldValue('url', response.data.result.url)
        setFieldValue('formatted_address', response.data.result.formatted_address)
        setFieldValue(
          'formatted_phone_number',
          response.data.result.formatted_phone_number
        )
        setFieldValue('weekday_text.segunda', weekday_text[0])
        setFieldValue('weekday_text.terça', weekday_text[1])
        setFieldValue('weekday_text.quarta', weekday_text[2])
        setFieldValue('weekday_text.quinta', weekday_text[3])
        setFieldValue('weekday_text.sexta', weekday_text[4])
        setFieldValue('weekday_text.sabado', weekday_text[5])
        setFieldValue('weekday_text.domingo', weekday_text[6])

        console.log(response.data.result)
      })
      .catch(function (error: any) {
        console.log(error)
      })
  }

  const onSubmit = async (values: any, actions: any) => {
    console.log(values)
    try {
      const data = values
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        place_id: data.place_id,
        name: data.name,
        cnpj: data.cnpj,
        formatted_address: data.formatted_address,
        description: data.description,
        tag: data.tag,
        url: data.url,
        img: data.img,
        formatted_phone_number: data.formatted_phone_number,
        weekday_text: {
          segunda: data.weekday_text.segunda,
          terça: data.weekday_text.terça,
          quarta: data.weekday_text.quarta,
          quinta: data.weekday_text.quinta,
          sexta: data.weekday_text.sexta,
          sabado: data.weekday_text.sabado,
          domingo: data.weekday_text.domingo,
        },
        timestamp: serverTimestamp(),
      })
      setShowAlert(true)
      console.log('Update success')
    } catch (error: any) {
      console.log(error.message)
    }
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
          <h4> Cadastre seu comércio! </h4>
          <p> Anuncie conosco e mostre seu comércio para o mundo! </p>
        </div>
        <Formik
          validateOnMount
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{
            place_id: '',
            name: '',
            cnpj: '',
            formatted_address: '',
            description: '',
            tag: '',
            url: '',
            img: '',
            formatted_phone_number: '',
            weekday_text: {
              segunda: '',
              terça: '',
              quarta: '',
              quinta: '',
              sexta: '',
              sabado: '',
              domingo: '',
            },
          }}
        >
          {({ values, setFieldValue, handleReset }) => (
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
                <IonTitle className='labels'>Cnpj:</IonTitle>
                <Field name='cnpj' className='primary-input' type='text' />
                <ErrorMessage component='span' className='errors' name='cnpj' />
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
                <IonTitle className='labels'>Telefone para contato:</IonTitle>
                <Field
                  name='formatted_phone_number'
                  className='primary-input'
                  as='input'
                />
                <ErrorMessage
                  component='span'
                  className='errors'
                  name='formatted_phone_number'
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
                  <option value='Comércio'>Comércio</option>
                  <option value='Hospedagem'>Hospedagem</option>
                  <option value='Lazer'>Lazer</option>
                  <option value='Restaurante'>Restaurante</option>
                </Field>
                <ErrorMessage component='span' className='errors' name='tag' />
              </div>

              <div>
                <IonTitle className='labels'>Horário de funcionamento:</IonTitle>
                <Field
                  name='weekday_text.segunda'
                  className='primary-input'
                  type='text'
                />
                <Field name='weekday_text.terça' className='primary-input' type='text' />
                <Field name='weekday_text.quarta' className='primary-input' type='text' />
                <Field name='weekday_text.quinta' className='primary-input' type='text' />
                <Field name='weekday_text.sexta' className='primary-input' type='text' />
                <Field name='weekday_text.sabado' className='primary-input' type='text' />
                <Field
                  name='weekday_text.domingo'
                  className='primary-input'
                  type='text'
                />

                <ErrorMessage component='span' className='errors' name='weekday_text' />
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
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => history.push('/')}
        header={'Sucesso!'}
        subHeader={'Dados cadastrados com sucesso.'}
        buttons={['OK']}
      />
    </IonPage>
  )
}

export default Client
