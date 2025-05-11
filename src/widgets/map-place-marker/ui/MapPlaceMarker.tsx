import { YMapMarker } from '@shared/lib/ymaps'
import clsx from 'clsx'
import { YMapMarkerProps } from 'ymaps3'
import styles from './MapPlaceMarker.module.css'

type ContentProps = {
  imgSrc: string
  title: string
  caption?: string
}

type MapPlaceMarkerProps = {
  markerProps: YMapMarkerProps
  selected?: boolean
  contentProps: ContentProps
}

export const MapPlaceMarker = ({ markerProps, selected, contentProps }: MapPlaceMarkerProps) => {
  return (
    <YMapMarker {...markerProps}>
      <section>
        <div className={clsx(styles.container, selected && styles.selected)}>
          <div className={styles.content}>
            <div className={styles.imageContainer}>
              <img width={56} height={32} src={contentProps.imgSrc} />
            </div>
            <div className={styles.info}>
              <h4 className={styles.title}>{contentProps.title}</h4>
              <div className={styles.caption}>{contentProps.caption}</div>
            </div>
          </div>
        </div>
      </section>
    </YMapMarker>
  )
}
