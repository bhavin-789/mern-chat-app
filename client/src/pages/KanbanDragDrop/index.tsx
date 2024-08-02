import KanBanBoard from "@/components/KanBanDragDrop/KanBanBoard";
import { useRef } from "react";

const KanbanDragDrop = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      // Scroll horizontally based on vertical wheel delta
      containerRef.current.scrollLeft += event.deltaY;
    }
  };
  return (
    <div>
      <KanBanBoard />
       <div style={{ padding: "20px" }}>
    <h1>Horizontal Scroll Example</h1>
       <div
      ref={containerRef}
      onWheel={handleWheel}
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        height: "200px", // Adjust height as needed
        border: "1px solid #ccc"
      }}
      >
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightblue" }}>Item 1</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightcoral" }}>Item 2</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightgreen" }}>Item 3</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightgoldenrodyellow" }}>Item 4</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 5</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightblue" }}>Item 6</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightcoral" }}>Item 7</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightgreen" }}>Item 8</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightgoldenrodyellow" }}>Item 9</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 10</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightblue" }}>Item 11</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightcoral" }}>Item 12</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightgreen" }}>Item 13</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightgoldenrodyellow" }}>Item 14</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 15</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 16</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 17</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 18</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 19</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 20</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 21</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 22</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 23</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 24</div>
      <div style={{ display: "inline-block", width: "300px", height: "100%", backgroundColor: "lightpink" }}>Item 25</div>
    </div>
      </div>
    </div>
  )
}

export default KanbanDragDrop;
