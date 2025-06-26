'use client'

import { FC, useRef } from "react"



export const Carousel = ({items,  itemWidth = 240 }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const labels = ['Museums', 'Salon', 'Restaurant', 'Bars', 'Spa'];
    // 각 요소에 키를 부여하여 JSX 배열 생성
    const cards = labels.map((label) => (
      <div key={label} className="p-4 bg-white rounded-lg shadow">
        {label}
      </div>
    ));

return(
    <div
    className="overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 px-8 hide-scrollbar"
    
    >
        <div
        ref={containerRef}
        className="flex snap-x snap-mandatory">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="snap-center flex-shrink-0"
            style={{ width: itemWidth }}
          >
            {item}
          </div>
        ))}
      </div>


    </div>



)


}