import { Chat } from '@shared/types/chat'
import { YMapLocationRequest } from 'ymaps3'
import { create } from 'zustand'

const DEFAULT_LOCATION: YMapLocationRequest = {
  center: [37.588144, 55.733842],
  zoom: 9,
}

const DEFAULT_CHATS: Chat[] = [
  {
    id: '8',
    chatId: '-4724059214',
    title: 'Чатик',
    description: 'Чат посетителей катка',
    creatorId: '746485025',
    longitude: 37.608144,
    latitude: 55.753842,
  },
  {
    id: '9',
    chatId: '-4724059214',
    title: 'Чатик',
    description: 'Чат посетителей катка',
    creatorId: '746485025',
    longitude: 37.688144,
    latitude: 55.833842,
  },
  {
    id: '10',
    chatId: '-4724059214',
    title: 'Чатик',
    description: 'Чат посетителей катка',
    creatorId: '746485025',
    longitude: 37.488144,
    latitude: 55.533842,
  },
  {
    id: '11',
    chatId: '-4724059214',
    title: 'Чатик',
    description: 'Чат посетителей катка',
    creatorId: '746485025',
    longitude: 37.388144,
    latitude: 55.433842,
  },
  {
    id: '12',
    chatId: '-4724059214',
    title: 'Чатик',
    description: 'Чат посетителей катка',
    creatorId: '746485025',
    longitude: 37.588144,
    latitude: 55.733842,
  },
]

export enum MapMode {
  Show = 'showing',
  Add = 'add',
}

type MapStore = {
  chats: Chat[]
  location: YMapLocationRequest
  hiddenMarkers?: boolean
  mode: MapMode
  setMarkersVisibility: (value: boolean) => void
  setMapMode: (value: MapMode) => void
  setChats: (chats: Chat[]) => void
}

export const useMapStore = create<MapStore>((set) => ({
  chats: DEFAULT_CHATS,
  location: DEFAULT_LOCATION,
  hiddenMarkers: false,
  mode: MapMode.Show,
  setMarkersVisibility: (value: boolean) => set({ hiddenMarkers: value }),
  setMapMode: (value: MapMode) => set({ mode: value }),
  setChats(chats: Chat[]) {
    set({chats})
  }
}))
