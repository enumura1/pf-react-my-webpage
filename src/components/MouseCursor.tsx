// インターフェース
interface PointerProps {
  name: string;
  position: {
    x: number;
    y: number;
  };
}

const Pointer: React.FC<PointerProps> = ({ name, position }) => (
  <div
    className={`${name}`}
    style={{
      transform: `translate(${position.x}px, ${position.y}px)`,
    }}
  ></div>
);

export default Pointer;
