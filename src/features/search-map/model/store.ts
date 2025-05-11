import { Chat } from '@shared/types/chat'
import { YMapLocationRequest } from 'ymaps3'
import { create } from 'zustand'

const DEFAULT_LOCATION: YMapLocationRequest = {
  center: [37.588144, 55.733842],
  zoom: 9,
}

export enum MapMode {
  Show = 'showing',
  Add = 'add',
}

type MapStore = {
  location: YMapLocationRequest
  hiddenMarkers?: boolean
  mode: MapMode
  coordinates: [number, number]
  coordinatesSelecting: boolean
  setMarkersVisibility: (value: boolean) => void
  setMapMode: (value: MapMode) => void
  setCoordinates: (coords: [number, number]) => void
  selectedChat: Chat | null
  setSelectedChat: (chat: Chat | null) => void
  setCoordinatesSelecting: (flag: boolean) => void
}

export const useMapStore = create<MapStore>((set) => ({
  location: DEFAULT_LOCATION,
  hiddenMarkers: false,
  mode: MapMode.Show,
  coordinates: [0, 0],
  coordinatesSelecting: false,
  setCoordinates: (coords: [number, number]) => set({ coordinates: coords }),
  setMarkersVisibility: (value: boolean) => set({ hiddenMarkers: value }),
  setMapMode: (value: MapMode) => set({ mode: value }),
  selectedChat: null,
  setSelectedChat: (chat: Chat | null) => set({ selectedChat: chat }),
  setCoordinatesSelecting: (flag: boolean) => set({coordinatesSelecting: flag})
}))
