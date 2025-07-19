interface IParams {
  name: string
}
export default function runClI(params?: IParams) {
  console.log('你好', params)
}
