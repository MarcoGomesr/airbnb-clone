import HomeDetailsService from './homeDetailService'

export async function getHomeDetail(id: string) {
  return await HomeDetailsService.getHome(id)
}
