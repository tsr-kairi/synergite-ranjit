import { stateQueryKeys } from '@/react-query/queryKeys'
import { TStateFindById } from '@/types/countryStateCityType/state-type'
import { useQuery } from 'react-query'
import axiosLocation from '../axiosLocation'

const findAllStateById = async () => {
  const response = await axiosLocation.get<TStateFindById>(
    `/countries/us/states`
  )
  //   console.log('responseSate', response)
  return response.data
}

const useGetAllStateById = () => {
  return useQuery<TStateFindById, Error>(
    [stateQueryKeys.allState],
    async () => await findAllStateById(),
    {
      onSuccess: () => console.log('GetAllStateById On Success Called'),
    }
  )
}

export default useGetAllStateById
