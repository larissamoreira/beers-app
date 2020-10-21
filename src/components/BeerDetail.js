import React from 'react'
import { useParams } from "react-router";

const BeerDetail = () => {
  const { id } = useParams();

  return (
    <div>
      Beer Detail {id}
    </div>
  )
}

export default BeerDetail
