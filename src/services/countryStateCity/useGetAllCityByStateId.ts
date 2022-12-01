import { cityQueryKeys } from '@/react-query/queryKeys'
import { TCityFindById } from '@/types/countryStateCityType/city-type'
import { useQuery } from 'react-query'
import axiosLocation from '../axiosLocation'

const findAllCityById = async (iso2: string) => {
  const response = await axiosLocation.get<TCityFindById>(
    `/countries/us/states/${iso2}/cities`
  )
  console.log('responseCity', response)
  return response.data
}

const useGetAllCityById = (iso2: string) => {
  return useQuery<TCityFindById, Error>(
    [cityQueryKeys.allCity, iso2],
    async () => await findAllCityById(iso2),
    {
      onSuccess: () => console.log('GetAllCityById On Success Called'),
    }
  )
}

export default useGetAllCityById
