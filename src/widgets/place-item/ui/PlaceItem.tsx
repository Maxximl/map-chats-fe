import styles from './PlaceItem.module.css'

type PlaceItemProps = {
  imgSrc: string
}

export const PlaceItem = ({ }: PlaceItemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>{/* <Image src={imgSrc} size={80} widthSize={'100%'} /> */}</div>
      <div className={styles.content}>
        <div className="title">{/* <Subhead weight="1">Title 3</Subhead> */}</div>
        <div className="description">{/* <Paragraph weight="3">cxcsd</Paragraph> */}</div>
        <div className="caption">{/* <Caption level="1">12 Apr 2025</Caption> */}</div>
      </div>
    </div>
  )
}
