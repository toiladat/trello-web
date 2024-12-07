import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Columns/Columns'
import Card from './ListColumns/Columns/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN:'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD:'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {
  //ActivationConstraint Require the mouse to move by 10 pixels before activating
  // Fix click event
  //Nếu dùng pointerSensor thì phải kết hợp thuộc tính CSS touch-action: none ở những phẩn tử kéo thả nhưng còn bug nên ưu tiên  mouse và touch
  // const pointerSensor = useSensor (PointerSensor, { activationConstraint :{ distance:10 } })

  // Hỗ trợ cho mobile khi không dùng point mà dùng chuột cảm ứng và chạm
  const mouseSensor = useSensor (MouseSensor, { activationConstraint :{ distance:10 } })
  // Nhấn giữ 250ms và độ chênh của cảm ứng ( dễ hiểu là di chuyển/ chênh lệch 500px) thì mới kích hoạt event
  const touchSensor = useSensor (TouchSensor, { activationConstraint :{ delay:250, tolerance: 400 } })

  //Ưu tiên kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile là tốit nhất, k bị bug
  // khii kết hợp cả 2 thì k cần truyền pointerSensor cũng được
  const sensors = useSensors( mouseSensor, touchSensor) //pointerSensor cung duoc

  //Render lại BoardContent khi Drag-Drop
  const [orderedColumns, setOrderedColumns] = useState([])

  // 1 Thời điểm chỉ có 1 card / column drag
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)


  useEffect(( ) => {
    setOrderedColumns( mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //Trigger drag
  const handleDragStart= (event) => {
    console.log('handleDragStart: ', event);

    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)


  }
  // Trigger drop
  const handelDragEnd = (event) => {
    // console.log('handelDragEnd: ', event);
    const { active, over } = event

    // Ktra nếu không tồn tại over ( kéo lnh tinh ra ngoài thì return luôn tránh over == null)
    if (!over) return

    // Nếu kéo -> thả vào đối tượng hợp lệ thì xử lý
    if (active.id != over.id) {
      // lay vi tri cu tu column keo
      const oldIndex =orderedColumns.findIndex(c => c._id ===active.id )

      // lay vi tri moi tu column chon de tha
      const newIndex =orderedColumns.findIndex(c => c._id ===over.id )

      // arrayMove 1 fuction dnd-Kit dung sap xep mang theo yeu cau
      //https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      // luu csdl
      // const dndOrderedColumnsIds=dndOrderedColumns.map( c => c._id)

      // cập nhật component
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
  }
  //Drop animation
  const customDropAnimation ={
    sideEffects: defaultDropAnimationSideEffects({
      style: { active:{ opacity:'0.5' } }
    })
  }
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handelDragEnd}
      sensors={sensors} >
      <Box sx={{
        bgcolor:( theme ) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width:'100%',
        height:( theme ) => theme.trello.boardContentHeight,
        p:'10px 0'
      }}>
        {/* Box cover box columns */}
        <ListColumns columns={orderedColumns}/>

        {/* Giữ chỗ khi drag */}
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN)
            && <Column column={activeDragItemData}/>
          }
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD)
            && <Card card={activeDragItemData}/>
          }
        </DragOverlay>
      </Box>
    </DndContext>

  )
}

export default BoardContent
