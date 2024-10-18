import { alovaInst } from './'

export const analyzing = (url: string) =>
  alovaInst.Post('/parse', {
    url,
  })
export const savaRes = (url: string) =>
  alovaInst.Post('/index.php?s=/api/video/getInfo', {
    url,
    token: '36b9e262bb7d7426b4addafdb70fb040',
    wxapp_id: '10001',
  })
