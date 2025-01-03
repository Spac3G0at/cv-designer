import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import { useCV } from "../../CVContext";

const DragBlocks = ({ items, main, onReorder }) => {
  const { editable } = useCV();

  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      onReorder((prevItems) => arrayMove(prevItems, oldIndex, newIndex));
    }
    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <>
      {editable ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <Content $shadow={isDragging && main}>
              {items.map((item) => (
                <SortableItem
                  editable={editable}
                  key={item.id}
                  id={item.id}
                  height={item.height}
                >
                  {item.content}
                </SortableItem>
              ))}
            </Content>
          </SortableContext>
        </DndContext>
      ) : (
        <Content $shadow={isDragging && main}>
          {items.map((item) => (
            <SortableItem
              editable={editable}
              key={item.id}
              id={item.id}
              height={item.height}
            >
              {item.content}
            </SortableItem>
          ))}
        </Content>
      )}
    </>
  );
};

const SortableItem = ({ id, height, children, editable }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(
      transform ? { ...transform, scaleY: 1 } : null
    ),
    transition,
    height: `${height}px`,
    zIndex: isDragging ? 2 : 1, // Set zIndex for the active item
    ...(isDragging ? { boxShadow: "0 4px 8px rgba(0,0,0,0.2)" } : {}), // Optional: Add a shadow for visual feedback
  };

  return (
    <ItemRoot
      $editable={editable}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {/* Prevent drag propagation on button clicks */}
      <div
        onPointerDown={(e) => {
          if (e.target.tagName === "BUTTON") e.stopPropagation();
        }}
      >
        {children}
      </div>
    </ItemRoot>
  );
};

export default DragBlocks;

const ItemRoot = styled.div`
  position: relative;
  /* margin-bottom: 10px; */
  /* background-color: white; */
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  touch-action: none;
  cursor: ${({ $editable }) => ($editable ? "grab" : "auto")};
  &:hover {
    background: ${({ $editable }) =>
      $editable ? "rgba(0, 0, 0, 0.05)" : "none"};
  }
`;

const Content = styled.div`
  box-shadow: ${({ $shadow }) =>
    $shadow ? "0 4px 8px rgba(0,0,0,0.2)" : "none"};
`;
