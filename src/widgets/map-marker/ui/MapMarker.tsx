import { YMapMarker } from '@shared/lib/ymaps'
import { ReactNode } from 'react'
import { YMapMarkerProps } from 'ymaps3'
import styles from './MapMarker.module.css'
import clsx from 'clsx'

type MapMarkerProps = {
  content: ReactNode
  markerProps: YMapMarkerProps
  selected?: boolean
  raw?: boolean
}

export const MapMarker = ({ content, markerProps, selected, raw }: MapMarkerProps) => {
  return (
    <YMapMarker {...markerProps}>
      <section>
        <div className={clsx(!raw && styles.container, selected && styles.selected)}>{content}</div>
      </section>
    </YMapMarker>
  )
}
