import * as Yup from 'yup'

export default Yup.object().shape({
  place_id: Yup.string(),
  name: Yup.string().required('Nome é obrigatório'),
  cnpj: Yup.string().required('Cnpj é obrigatório.'),
  formatted_address: Yup.string().required('Endereço é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  tag: Yup.string().required('Tipo do estabelecimento é obrigatório'),
  url: Yup.string().url().required('Url de lcalização é obrigatória'),
  img: Yup.string().url().required('Url de imagem é obrigatória'),
  formatted_phone_number: Yup.string().required('Telefone para contato é obrigatório'),
  weekday_text: Yup.array()
    .of(
      Yup.object().shape({
        segunda: Yup.string().nullable(),
        terça: Yup.string(),
        quarta: Yup.string(),
        quinta: Yup.string(),
        sexta: Yup.string(),
        sabado: Yup.string(),
        domingo: Yup.string(),
      })
    )
    .nullable(),
})
