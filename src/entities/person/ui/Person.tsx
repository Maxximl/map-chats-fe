import { FC } from 'react'

interface PersonProps {
  avatar: string
}

export const Person: FC<PersonProps> = (props) => {
  return (
    <div>
      <img width={30} height={30} src={props.avatar} />
    </div>
  )
}
