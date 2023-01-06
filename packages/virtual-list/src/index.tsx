import React, { useEffect, useMemo, useState, useCallback, FC } from 'react'
import styles from './index.less'

interface IVirtualListProps {
  dataList: any[]
  itemHeight?: number
  containerHeight?: number
  containerWidth?: number
}

const VirtualList: FC<IVirtualListProps> = props => {
  const {
    dataList = [],
    itemHeight = 100,
    containerHeight = 400,
    containerWidth = 400
  } = props
  const [startIndex, setStartIndex] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)

  //列表实际总高度
  const totalListHeight = useMemo(() => dataList.length * itemHeight, [
    itemHeight,
    dataList
  ])
  //容器可视区域一屏所容纳的列表项数量
  const visibleCount = useMemo(() => Math.ceil(containerHeight / itemHeight), [
    itemHeight,
    containerHeight
  ])
  // 容器可视区域内所展示的数据
  const visibleListData = useMemo(
    () => dataList.slice(startIndex, startIndex + visibleCount),
    [startIndex, visibleCount]
  )
  //容器滚动事件监听
  const onScroll = useCallback(
    e => {
      const scrollTop = e.target.scrollTop
      setScrollTop(scrollTop)
      setStartIndex(Math.floor(scrollTop / itemHeight))
    },
    [itemHeight]
  )

  return (
    <div
      className={styles.container}
      style={{ height: `${containerHeight}px`, width: `${containerWidth}px` }}
      onScroll={onScroll}
    >
      <div
        className={styles.phantom}
        style={{ height: `${totalListHeight}px` }}
      ></div>
      <div
        className={styles.listBox}
        style={{ transform: `translateY(${scrollTop}px)` }}
      >
        {visibleListData.map(item => (
          <div
            key={item.id}
            className={styles.listItem}
            style={{ height: `${itemHeight}px` }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VirtualList
