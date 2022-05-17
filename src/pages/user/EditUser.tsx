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
import {
  doc,
  collection,
  setDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
} from '@firebase/firestore'
import { db } from '../../services/firebaseConfig'
import { arrowBack, closeOutline } from 'ionicons/icons'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import schema from './clientSchema'

const EditUser: React.FC = () => {
  const history = useHistory()
  const auth: any = getAuth()

  /*State dos usuário */
  const [user, setUser] = useState<any>([])

  /*State Alert */
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    //const storeUser = async () =>
    auth.onAuthStateChanged(async function (user: any) {
      //const user = auth.currentUser

      if (user) {
        const userUid = user.uid
        const userRef = doc(db, 'users', userUid)

        const docSnap = await getDoc(userRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          setUser(data)
          console.log(data)
          console.log('user logged in')
        } else {
          console.log('User with no data')
        }
      } else {
        console.log('user NOT logged in')
      }
    })
    //storeUser()
  }, [])

  //auth.onAuthStateChanged(async function (user: any) {  }, [])

  const getPlace = (setFieldValue: any) => {
    const response = user
    const weekday_text = response.weekday_text
    setFieldValue('name', response.name)
    setFieldValue('url', response.url)
    setFieldValue('formatted_address', response.formatted_address)
    setFieldValue('img', response.img)
    setFieldValue('description', response.description)
    setFieldValue('tag', response.tag)
    setFieldValue('cnpj', response.cnpj)
    setFieldValue('place_id', response.place_id)
    setFieldValue('formatted_phone_number', response.formatted_phone_number)
    setFieldValue('weekday_text.segunda', weekday_text.segunda)
    setFieldValue('weekday_text.terça', weekday_text.terça)
    setFieldValue('weekday_text.quarta', weekday_text.quarta)
    setFieldValue('weekday_text.quinta', weekday_text.quinta)
    setFieldValue('weekday_text.sexta', weekday_text.sexta)
    setFieldValue('weekday_text.sabado', weekday_text.sabado)
    setFieldValue('weekday_text.domingo', weekday_text.domingo)
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
      <IonContent>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => history.push('/')}
          header={'Sucesso!'}
          message={'Os dados foram autalizados com sucesso.'}
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

        <div className='header-modal'>
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
                <IonButton onClick={() => getPlace(setFieldValue)}>
                  Carregar Informações
                </IonButton>
                <div>
                  <IonTitle className='labels'>Place id:</IonTitle>
                  <Field
                    name='place_id'
                    type='text'
                    className='primary-input'
                    //onBlur={(ev: any) => getPlace(setFieldValue)}
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
                  <Field
                    name='weekday_text.terça'
                    className='primary-input'
                    type='text'
                  />
                  <Field
                    name='weekday_text.quarta'
                    className='primary-input'
                    type='text'
                  />
                  <Field
                    name='weekday_text.quinta'
                    className='primary-input'
                    type='text'
                  />
                  <Field
                    name='weekday_text.sexta'
                    className='primary-input'
                    type='text'
                  />
                  <Field
                    name='weekday_text.sabado'
                    className='primary-input'
                    type='text'
                  />
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
        </div>
      </IonContent>
    </IonPage>
  )
}

export default EditUser
