import { useContext } from 'react'

import DataContext from 'Contexts/Data/Data'

const useData = () => useContext(DataContext)

export default useData
