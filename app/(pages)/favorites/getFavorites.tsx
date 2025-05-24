import favoriteService from './favoriteService'

export default async function getUserFavorites(userId: string) {
  return await favoriteService.getFavorites(userId)
}
