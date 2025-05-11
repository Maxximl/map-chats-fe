import { reactify, YMap, YMapDefaultFeaturesLayer, YMapDefaultSchemeLayer } from '@shared/lib/ymaps'
import { YMapLocationRequest } from 'ymaps3'
import { FC } from 'react'

export type MapViewProps = {
  location: YMapLocationRequest
  children: React.ReactNode
}

export const MapView: FC<MapViewProps> = (props) => {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      <YMap location={reactify.useDefault(props.location)}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        {props.children}
      </YMap>
    </div>
  )
}
