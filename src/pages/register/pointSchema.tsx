import * as Yup from 'yup'

export default Yup.object().shape({
  place_id: Yup.string(),
  name: Yup.string().required('Nome é obrigatório'),
  formatted_address: Yup.string().required('Endereço é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  tag: Yup.string().required('Tipo do ponto é obrigatório'),
  url: Yup.string().url().required('Url de lcalização é obrigatória'),
  img: Yup.string().url().required('Url de imagem é obrigatória'),
  isCovered: Yup.string().required('Dado obrigatório'),
})
