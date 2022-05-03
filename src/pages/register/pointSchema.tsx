import * as Yup from 'yup'

export default Yup.object().shape({
  place_id: Yup.string(),
  name: Yup.string().required(),
  formatted_address: Yup.string().required(),
  description: Yup.string().required(),
  tag: Yup.string().required(),
  url: Yup.string().url().required(),
  img: Yup.string().url().required(),
  isCovered: Yup.string().required(),
})
