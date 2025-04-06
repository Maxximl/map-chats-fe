import { YMapMarker } from '@shared/lib/ymaps'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { YMapMarkerProps } from 'ymaps3'
import styles from './MapMarker.module.css'

type MapMarkerProps = {
  content: ReactNode
  markerProps: YMapMarkerProps
  selected?: boolean
}

export const MapMarker = ({ content, markerProps, selected }: MapMarkerProps) => {
  return (
    <YMapMarker {...markerProps}>
      <section>
        <div className={clsx(styles.container, selected && styles.selected)}>{content}</div>
      </section>
    </YMapMarker>
  )
}
