export type CityProp = {
      cityName: string,
      country: string,
      emoji: string,
      date: string,
      notes: string,
      position: {
        lat: number,
        lng: number
      },
      id: 73930385
}

export type CityListProp = {
    cities: CityProp[] | null,
    isLoading: boolean
}