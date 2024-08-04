import React from 'react'
import LabelText from '../typography/labelText'

export default function NoResultFound() {
  return (
    <div className="flex justify-center">
    <LabelText text="NO RESULT FOUND!" textColor="text-white" fontWeight="text-bold" fontSize="lg:text-2xl text-lg"/>
    </div>
  )
}
