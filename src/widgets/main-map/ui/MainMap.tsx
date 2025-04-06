import { FC } from 'react'
import { reactify, YMap, YMapDefaultFeaturesLayer, YMapDefaultSchemeLayer } from '@shared/lib/ymaps'
import { YMapLocationRequest } from 'ymaps3'
import { MapPlaceMarker } from '@entities/map-place-marker'
import { MapMarker } from '@entities/map-marker'
import { Person } from '@entities/person'

const LOCATION: YMapLocationRequest = {
  center: [37.588144, 55.733842],
  zoom: 9,
}

export type MainMapProps = {
  width?: string
  height?: string
}

export const MainMap: FC<MainMapProps> = () => {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <YMap location={reactify.useDefault(LOCATION)}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <MapMarker
          markerProps={{ coordinates: reactify.useDefault([37.588144, 55.733842]), draggable: true }}
          content={<Person avatar={'/images/person_avatar1.png'} />}
          selected
        />
        <MapMarker
          markerProps={{ coordinates: reactify.useDefault([37.588144, 55.743842]), draggable: true }}
          content={<Person avatar={'/images/person_avatar2.png'} />}
        />
        <MapMarker
          markerProps={{ coordinates: reactify.useDefault([37.588144, 55.753842]), draggable: true }}
          content={<Person avatar={'/images/person_avatar3.png'} />}
        />
        <MapPlaceMarker
          markerProps={{ coordinates: reactify.useDefault([37.658144, 55.853842]), draggable: true }}
          contentProps={{
            imgSrc: 'https://images.a-a-ah.ru/uploads/items/7056/21359/large_565c2f7b9ada6040850209.jpg',
            title: 'Каток на площади',
            caption: '23 февраля 2025',
          }}
        />
      </YMap>
    </div>
  )
}
