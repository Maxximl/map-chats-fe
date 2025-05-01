import { YMapMarker } from '@shared/lib/ymaps'
import { ReactNode } from 'react'
import { YMapMarkerProps } from 'ymaps3'

type MapMarkerProps = {
  content: ReactNode
  markerProps: YMapMarkerProps
  selected?: boolean
}

export const MapMarker = ({ content, markerProps }: MapMarkerProps) => {
  return (
    <YMapMarker {...markerProps}>
      <section>
        <div>{content}</div>
      </section>
    </YMapMarker>
  )
}
